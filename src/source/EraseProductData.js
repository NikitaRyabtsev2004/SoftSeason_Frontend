

function erase() {
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const dbPath1 = path.resolve('../server/ProductData.db');
const db1 = new sqlite3.Database(dbPath1, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the existing database.');
    }
  });

function generateItemsArray() {
    return new Promise((resolve, reject) => {
      db1.all(`SELECT * FROM ProductData`, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const items = rows.map(row => ({
          id: row.id,
          title: row.title,
          img: row.img,
          imgMacro: row.imgMacro,
          desc: row.desc,
          category: row.category,
          price: row.price,
          material: row.material,
          color: row.color
        }));
        resolve(items);
      });
    });
  }


    generateItemsArray()
        .then(items => {
            let content = ``
            const fs = require('fs');
            fs.writeFile('./ProductData.js', content, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File generated successfully!');
            }
            });
        })
    }
    erase()
    module.exports.erase = erase;