import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("workout.db");

export const init = () => {
  const promiseDB = new Promise((resolve, reject) => {
    db.transaction(
            function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS user (userID INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, createdOn INTEGER)");
                tx.executeSql("INSERT INTO user (username, password, createdOn) VALUES ('bnaughton', 'pass', 1234);");
                tx.executeSql("CREATE TABLE IF NOT EXISTS routine (routineID INTEGER PRIMARY KEY NOT NULL, routine TEXT NOT NULL, userID INTEGER NOT NULL, createdOn INTEGER, FOREIGN KEY (userID) REFERENCES users (userID))");
                tx.executeSql("CREATE TABLE IF NOT EXISTS workout (workoutID INTEGER PRIMARY KEY NOT NULL, workout TEXT NOT NULL, routineID INTEGER NOT NULL, exerciseGroupID INTEGER NOT NULL, createdOn INTEGER, FOREIGN KEY (routineID) REFERENCES routine (routineID))");
                tx.executeSql("CREATE TABLE IF NOT EXISTS category (categoryID INTEGER PRIMARY KEY NOT NULL, category TEXT NOT NULL)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS exerciseGroup (exerciseGroupID INTEGER PRIMARY KEY NOT NULL, exerciseGroup TEXT NOT NULL, workoutID INTEGER NOT NULL, sets INTEGER, categoryID INTEGER, FOREIGN KEY (workoutID) REFERENCES workout (workoutID), FOREIGN KEY (categoryID) REFERENCES category (categoryID))");
                tx.executeSql("CREATE TABLE IF NOT EXISTS exercise (exerciseID INTEGER PRIMARY KEY NOT NULL, exercise TEXT NOT NULL, exerciseGroupID INTEGER NOT NULL, reps INTEGER NOT NULL, weight FLOAT NOT NULL, FOREIGN KEY (exerciseGroupID) REFERENCES exerciseGrop (exerciseGroupID))");
            },
            function (error) {
                reject(error.message);
            },
            function () {
                resolve(true);
                console.log('Created database OK');
            }
      );
  });
  return promiseDB;
};