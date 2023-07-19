var mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE,
});

const connectmysql = {
    async fnExecuteQuery(Query){
        let response
        try {   
            response = await this.fnQuery(Query)
        } catch (err) {
            throw err
        }
        return response
    },
    async fnQuery(Query){
        return await new Promise((resolve, reject)=>{ 
            pool.getConnection(function (err, connection) {
                if (err) { 
                    throw err
                }
                connection.query(Query, function (error, results) {
                    connection.release();
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }
                });
            });
        })
    }
}

module.exports = connectmysql