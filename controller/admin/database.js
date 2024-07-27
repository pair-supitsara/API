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
                                image_url
                            )
                            VALUES(
                                ${prepare(name)},
                                ${prepare(detail)},
                                now(),
                                ${prepare(imageurl)}
                            )
                        `
            const resultGetUser = await connectmysql.fnQuery(query)
            return resultGetUser
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database