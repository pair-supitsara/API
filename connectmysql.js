var mysql = require('mysql')

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE,
});

const connectmysql = {
    async fnExecuteQuery(Query){
        return await new Promise((resolve, reject)=>{
            connection.connect();        
            connection.query("SELECT 2 AS username", function (error, results, fields) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(typeof results[0])
                    console.log(results[0])
                    console.log('The username is: ', results[0].username);
                    resolve(results[0].username)
                }
            });
            connection.end();
        })
    }
}

module.exports = connectmysql