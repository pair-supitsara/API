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
                            FROM 
                                products
                            WHERE 
                                isactive = 1
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnSelectProductById: async function (product_id) {
        try {
            const query = ` 
                            SELECT 
                                product_id,
                                name,
                                detail,
                                createdate,
                                CONCAT('http://localhost:8080', image_url) AS url
                            FROM 
                                products
                            WHERE 
                                product_id = ${product_id}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database