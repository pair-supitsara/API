import connection from '../../helper/connectmysql.js'
import valid from '../../helper/validator.js'
import bcrypt from 'bcrypt'

const database = {
    fnFindUserByEmail: async function (email) {
        try {
            const result = { status: 'fail', message: 'insert users fail' , data: [] }
            const query = ` select user_id, email, salt
                            from users
                            where email = ${valid.prepare(email)}
                        `
            const resultGetUser = await connection.fnExecuteQuery(query)
            if (resultGetUser.length > 0) {
                result.status = 'success'
                result.message = `found user register with this email ${email}`
                result.data = resultGetUser
            }
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnCheckEmailAndHashPassword: async function (email, password, salt) {
        try {
            const hashPassword = await bcrypt.hash(password, salt)
            const query = ` select user_id, email, username
                            from users
                            where email = '${email}'
                            and hashpassword = '${hashPassword}'
                        `
            const result = await connection.fnExecuteQuery(query)
            return result
        } catch(err) {
            throw new Error(err)
        }
    },
    fnAddUserAccount: async function (email, password) {
        try {    
            const randomsalt = bcrypt.genSaltSync(10)
            const hashpassword = await bcrypt.hash(password, randomsalt)
            const result = { status: 'fail', message: 'insert users fail' , data: [] }

            const query = ` insert users (email, hashpassword, salt, createdate, updatedate)
                            values ('${email}', '${hashpassword}', '${randomsalt}', now(), now())
                        `
            const resultInsertUsers = await connection.fnExecuteQuery(query)
            if (resultInsertUsers.affectedRows >= 1) {
                result.status = 'success'
                result.message = 'register success'
            }
            return result
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default database