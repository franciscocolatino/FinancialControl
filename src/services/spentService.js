export default class SpentService {
    db = null;
    constructor(db) {
        this.db = db;
    }

    addSpent(name, total, expenseId) {
        return new Promise((resolve, reject) => {
            this.db.transaction(
                sql => {
                    sql.executeSql(`INSERT INTO spent (spentName, spentValue, expense_id) 
                values (?, ?, ?)`,
                        [name, total, expenseId],
                        (_, { insertId, rows }) => {
                            resolve(insertId)
                        }), (error) => {
                            reject(error);
                        }
                })
        });
    }

    getSpentsByExpenseId(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction((sql) => {
                sql.executeSql('SELECT * FROM spent WHERE expense_id = ?;', [id], (_, { rows }) => {
                    resolve(rows);
                }, (error) => {
                    reject(error);
                })
            })
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction(sql => {
                sql.executeSql(`DELETE FROM spent WHERE id = ?;`, [id], () => {
                    resolve();
                }), (sqlError) => {
                    reject(sqlError);
                }
            })
        });
    }
}