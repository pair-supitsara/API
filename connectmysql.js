var mysql = require('mysql')

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE,
});

const connectmysql = {
    async fnExecuteQuery(Query){
        try {   
            connection.connect(function (err) {
                if (err) { 
                    throw err
                }
            });
            const response = await this.fnQuery(Query)
            connection.end();
            
            return response
        } catch (err) {
            console.log(err)
            connection.end();
        }
    },
    async fnQuery(Query){
        try {
            return await new Promise((resolve, reject)=>{ 
                connection.query(Query, function (error, results) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }
                });
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = connectmysql