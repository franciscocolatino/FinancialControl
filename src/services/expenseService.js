export default class ExpenseService {

    db = null;
    constructor(db) {
        this.db = db;
    }

    addExpense(name, total) {
        return new Promise((resolve, reject) => {
            this.db.transaction(
                sql => {
                    sql.executeSql(`INSERT INTO expense (name, total) 
                values (?, ?)`,
                        [name, total],
                        (_, { insertId }) => {
                            resolve(insertId)
                        }), (error) => {
                            reject(error);
                        }
                })
        });
    }

    getExpenses() {
        return new Promise((resolve, reject) => {
            this.db.transaction((sql) => {
                sql.executeSql('SELECT * FROM expense;', [], (_, { rows }) => {
                    resolve(rows);
                }, (error) => {
                    reject(error);
                })
            })
        });
    }


    updateById(id, total) {
        return new Promise((resolve, reject) => {
            this.db.transaction(sql => {
                sql.executeSql(`UPDATE expense SET total = ? WHERE id = ?;`, [total, id], () => {
                    resolve();
                }), (sqlError) => {
                    reject(sqlError);
                }
            })
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction(sql => {
                sql.executeSql(`DELETE FROM expense WHERE id = ?;`, [id], () => {
                    resolve();
                }), (sqlError) => {
                    reject(sqlError);
                }
            }, (_, error) => {
                reject(error)
            })
        })
    }
}