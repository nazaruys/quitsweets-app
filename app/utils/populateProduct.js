import * as SQLite from 'expo-sqlite';
import defaultProducts from './defaultProducts.json';

const db = SQLite.openDatabaseAsync('appDatabase.db');

// Function to populate the Product table with default products
const populateProduct = () => {
  db.transaction(tx => {
    // Create the Product table if it doesn't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        sugar INTEGER NOT NULL,
        icon TEXT NOT NULL
      );`,
      [],
      () => {
        console.log('Product table checked/created.');

        // Check if the Product table is empty
        tx.executeSql(
          'SELECT COUNT(*) as count FROM Product',
          [],
          (_, { rows: { _array } }) => {
            const { count } = _array[0];

            if (count === 0) {
              console.log('Populating Product table with default items...');
              defaultProducts.forEach(product => {
                tx.executeSql(
                  'INSERT INTO Product (title, sugar, icon) VALUES (?, ?, ?)',
                  [product.title, product.sugar, product.icon],
                  (_, result) => console.log(`Inserted: ${product.title}`),
                  (_, error) => console.error('Error inserting product:', error)
                );
              });
            } else {
              console.log('Product table already populated.');
            }
          },
          (_, error) => console.error('Error checking Product count:', error)
        );
      },
      (_, error) => console.error('Error creating Product table:', error)
    );
  });
};

export default populateProduct;
