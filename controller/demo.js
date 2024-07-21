import connection from '../helper/connectmysql.js'

const controller = {
    fnDemo: async function (req, res) {
        try {
            const result = await connection.fnQuery('')
            console.log(result[0].email)
            
            res.status(200).json({
                data: result
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
        
    }
}

export default controller