import { DatabaseConnection } from "./dbinit.js";


var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        this.InitDb()
    }
    InitDb() {
        var sqlCommand = [
            `create table if not exists expense (
                id integer primary key autoincrement,
                name text,
                total real
            );`,
            `create table if not exists spent (
                id integer primary key autoincrement,
                expense_id integer,
                spentName text,
                spentValue real,
                foreign key (expense_id) references expense (id)
            );`,           
        ];

        db.transaction(
            (sql) => {
                for (var i = 0; i < sqlCommand.length; i++) {
                    console.log("execute sql : " + sqlCommand[i]);
                    sql.executeSql(sqlCommand[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}