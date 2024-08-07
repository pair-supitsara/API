import connectmysql from '../../helper/connectmysql.js'
import bcrypt from 'bcrypt'
import validator from '../../helper/validator.js'
const { prepare } = validator

const database = {
    fnFindUserByEmail: async function (email) {
        try {
            const query = ` select a.email, a.salt, IF(ISNULL(b.admin_id), "customer", "admin") as permission
                            from users as a
                            left join admins as b on a.user_id = b.user_id
                            where a.email = ${prepare(email)}
                        `
            const resultGetUser = await connectmysql.fnQuery(query)
            return resultGetUser
        } catch(err) {
            throw new Error(err)
        }
    },
    fnCheckEmailAndHashPassword: async function (email, password, salt) {
        try {
            const hashPassword = await bcrypt.hash(password, salt)
            console.log(hashPassword)

            const query = ` select user_id, email
                            from users
                            where email = '${email}'
                            and hashpassword = '${hashPassword}'
                        `
            const result = await connectmysql.fnQuery(query)
            console.log(result)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnAddUserAccount: async function (email, password) {
        try {    
            const randomsalt = bcrypt.genSaltSync(10)
            const hashpassword = await bcrypt.hash(password, randomsalt)

            const query = ` insert users (email, hashpassword, salt, createdate)
                            values ('${email}', '${hashpassword}', '${randomsalt}', now())
                        `

            const resultInsertUsers = await connectmysql.fnQuery(query)

            return 'register success'
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    }
}

export default database