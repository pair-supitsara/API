import connectmysql from '../../helper/connectmysql.js'
import bcrypt from 'bcrypt'
import validator from '../../helper/validator.js'
const { prepare } = validator

const database = {
    fnSelectProducts: async function () {
        try {
            const query = ` 
                            SELECT 
                            product_id,
                            name,
                            detail,
                            createdate,
                            CONCAT('http://localhost:8080', image_url) AS url
                            FROM products
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database