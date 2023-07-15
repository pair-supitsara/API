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
            try {
                connection.connect(function (err) {
                    if (err) {
                        throw err
                    }
                });        
                connection.query( Query, function (error, results, fields) {
                    if (error) {
                        throw error
                    } else {
                        resolve(results)
                    }
                });
            } catch (err) {
                throw err
            }
        })
    }
}

module.exports = connectmysql