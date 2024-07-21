import mysql from 'mysql'

const connectmysql = {
    async fnQuery(Query){
        const connection = mysql.createConnection({
            host     : '127.0.0.1',
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DATABASE,
        });
        
        return await new Promise((resolve, reject)=>{ 
            connection.connect();
            connection.query(Query, function (error, results, fields) {
                if (error) {
                    reject(error)
                }
                resolve(results)
            });
            connection.end()
        })
    }
}

export default connectmysql