import * as SQLite from 'expo-sqlite';

const getProducts = async () => {
    const db = await SQLite.openDatabaseAsync('appDatabase.db');
    return new Promise((resolve, reject) => {
        db.withTransactionAsync(tx => {
        // First, check if the Product table exists
        tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Product';",
            [],
            (_, { rows: { length } }) => {
            if (length === 0) {
                // If the table doesn't exist, resolve with an empty array
                console.warn('Product table does not exist.');
                resolve([]); // Return an empty array if the table doesn't exist
            } else {
                // If the table exists, fetch all products
                tx.executeSql(
                'SELECT * FROM Product;',
                [],
                (_, { rows: { _array } }) => resolve(_array), // Return the array of products
                (_, error) => {
                    console.error('Error retrieving products:', error);
                    reject(error); // Reject in case of query error
                }
                );
            }
            },
            (_, error) => {
            console.error('Error checking Product table existence:', error);
            reject(error); // Reject in case of error in the existence check
            }
        );
        });
    });
};

export default getProducts;
