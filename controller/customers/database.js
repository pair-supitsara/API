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
    },
    fnGetMyCart: async function (user_id, product_id) {
        try {
            const query = ` 
                            SELECT * 
                            FROM cart as a
                            JOIN products as b on a.product_id = b.product_id
                            WHERE b.isactive = 1
                            AND a.user_id = ${user_id} 
                            AND a.product_id = ${product_id};
                        `
            const result = await connectmysql.fnQuery(query)
            console.log(result)
            console.log(result.length)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnUpdateMyCard: async function (cart_id, user_id, product_id, quantity) {
        try {
            const query = ` 
                            UPDATE
                                cart
                            SET
                                quantity = ${quantity + 1},
                                updatedate = now()
                            WHERE	id = ${cart_id}
                                AND user_id = ${user_id}
                                AND product_id = ${product_id}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnInsertMyCard: async function (user_id, product_id) {
        try {
            const query = ` 
                            INSERT INTO cart(user_id, product_id, quantity, createdate)
                            SELECT ${user_id}, a.product_id, 1, now()
                            FROM products as a
                            WHERE a.isactive = 1
                            AND a.product_id = ${product_id}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnGetCartByUserId: async function (user_id) {
        try {
            const query = ` 
                            SELECT
                                a.id,
                                a.quantity as quantity,
                                b.product_id,
                                a.createdate,
                                a.updatedate,
                                b.name,
                                b.detail,
                                CONCAT('http://localhost:8080',b.image_url) AS image_url
                            FROM cart AS a
                            JOIN products AS b ON a.product_id = b.product_id
                            JOIN users AS c ON a.user_id = c.user_id
                            WHERE
                                b.isactive = 1
                                and c.user_id = ${user_id}
                        `
            const result = await connectmysql.fnQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database