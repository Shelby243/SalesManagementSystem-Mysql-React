import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import Bluebird from "bluebird";
export function create(data, callback) {
  const userId = uuidv4();
  const data0 = { ...data, id: userId };
  const { id, userName, fullName, email, password, phone, address } = data0;
  const query = `INSERT INTO Users(userid,pass,fname,lname,email,address,phno)
               VALUES('${id}','${password}','${userName}','${fullName}','${email}','${address}','${phone}'); `;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

export function getUserByEmail(email, callback) {
  const query = `SELECT * from Users WHERE email=?`;
  db.query(query, [email], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
export function findUserById(id, callback) {
  const query = `SELECT * from Users WHERE userid=?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}

export function getProducts(callback) {
  const query = `SELECT T.product_id,T.pname,T.model,T.color,T.price,T.size,T.image,S.quantity FROM products AS T,inventories AS S WHERE T.product_id=S.product_id;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

export function getProductsById(id, callback) {
  const query = `SELECT * FROM products WHERE product_id=${id}`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
export function createOrder(data, callback) {
  const { productId, userId, quantity, payment } = data;
  const query = `INSERT INTO orders(product_id,userid,quantity,pay_method) VALUES(${productId},'${userId}',${quantity},'${payment}')`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }
    return callback(null, results);
  });
}
export function getOrdersCountById(id, callback) {
  const query = `SELECT CountOrders('${id}') AS Total`;
  //SELECT COUNT(*) AS Total FROM orders WHERE status='pending' AND userid='${id}'
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    //console.log(results);
    return callback(null, results[0]);
  });
}
export function getOrdersById(id, callback) {
  const query = `SELECT T.pname,T.model,T.price,S.status,S.orderdatetime,S.quantity,S.userid,S.pay_method FROM products AS T JOIN orders AS S ON T.product_id = S.product_id
                  WHERE S.status = 'pending' AND userid='${id}'`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

export function changeStatus(data) {
  db.query = Bluebird.promisify(db.query);
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: " + err.stack);
      return;
    }
    const {
      status,
      time,
      userId,
      proName,
      unitPrice,
      quantity,
      method,
      model,
    } = data;
    const query = `UPDATE orders SET status='${status}' WHERE orderdatetime='${time}';`;
    db.query(query, (err) => {
      if (err) {
        db.rollback(() => {
          console.error("Error inserting updating orders table: " + err.stack);
        });
        return;
      }
      const query2 = `INSERT INTO payments(uid,productName,unitPrice,quantity,payment_method,totalPrice,model) VALUES ('${userId}','${proName}',${unitPrice},${quantity},'${method}',${
        unitPrice * quantity
      },'${model}')`;
      db.query(query2, (err) => {
        if (err) {
          db.rollback(() => {
            console.error("Error inserting into payments table: " + err.stack);
          });
          return;
        }
        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              console.error("Error committing transaction: " + err.stack);
            });
            return;
          }
          console.log("Transaction committed successfully.");
        });
      });
    });
  });
}
export function getAllOrdersById(id, callback) {
  const query = `SELECT productName,unitPrice,quantity,payment_method,totalPrice,paymentdatetime FROM payments 
                  WHERE uid='${id}'`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}
