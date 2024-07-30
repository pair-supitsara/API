import connectmysql from '../../helper/connectmysql.js'
import bcrypt from 'bcrypt'
import validator from '../../helper/validator.js'
const { prepare } = validator

const database = {
    fnInsertNewProduct: async function (name, detail, imageurl) {
        try {
            const query = ` 
                            INSERT INTO products(
                                name,
                                detail,
                                createdate,
                                image_url,
                                isactive
                            )
                            VALUES(
                                ${prepare(name)},
                                ${prepare(detail)},
                                now(),
                                ${prepare(imageurl)},
                                1
                            )
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnDeleteProduct: async function (product_id) {
        try {
            const query = ` 
                            UPDATE
                                products
                            SET
                                isactive = 0
                            WHERE
                                product_id = ${prepare(product_id)}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnUpdateProductById: async function (product_id, name, detail, filename) {
        try {
            const query = ` 
                            UPDATE
                                products
                            SET
                                name = ${prepare(name)},
                                detail = ${prepare(detail)},
                                ${filename ? `image_url = CONCAT('/uploads/',${prepare(filename)}),` : ''}
                                updatedate = now()
                            WHERE
                                product_id = ${prepare(product_id)}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database