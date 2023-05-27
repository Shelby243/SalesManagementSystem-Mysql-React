import db from "../config/db.js";
import Bluebird from "bluebird";

export function add(data) {
  db.query = Bluebird.promisify(db.query);
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: " + err.stack);
      return;
    }
    const { name, model, color, size, quantity, price, image } = data;
    const query = `INSERT INTO products(pname,model,color,size,price,image) VALUES('${name}','${model}','${color}',${size},${price},'${image}'); `;
    db.query(query, (err, result) => {
      if (err) {
        db.rollback(() => {
          console.error("Error inserting into parent_table: " + err.stack);
        });
        return;
      }
      const productId = result.insertId;
      const query2 = `INSERT INTO inventories(product_id,quantity) VALUES (${productId},${quantity});`;
      db.query(query2, (err) => {
        if (err) {
          db.rollback(() => {
            console.error("Error inserting into child_table: " + err.stack);
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
export function getProductsById(id, callback) {
  const query = `SELECT * FROM products WHERE product_id=${id}`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
export function deleteProductsById(id, callback) {
  const query = `DELETE FROM products WHERE product_id=${id}`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
export function updateProductById(id, details, callback) {
  //console.log(details);
  //console.log(id);
  const query = `UPDATE products SET pname='${details.name}',model='${details.model}',color='${details.color}',size=${details.size},price=${details.price} WHERE product_id=${id};`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}
export function getUsers(callback) {
  const query = `CALL getAllUsers();`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
export function getInventory(callback) {
  const query = `SELECT T.pname,T.model,T.color,T.size,S.quantity FROM products AS T,inventories AS S WHERE T.product_id=S.product_id;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

export function getAllOrders(callback) {
  const query = `CALL getAllOrders();`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
}
