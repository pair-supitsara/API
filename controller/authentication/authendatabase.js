import connection from '../../connectmysql.js'
import bcrypt from 'bcrypt'

const database = {
    fnFindUserByEmail: async function (email) {
        const result = { status: 'fail', message: 'insert users fail' , data: [] }
        email = email ? ` '${email}' ` : null

        const query = ` select user_id, email, salt
                        from users
                        where email = ${email}
                      `
        const resultGetUser = await connection.fnExecuteQuery(query)
        if (resultGetUser.length > 0) {
            result.status = 'success'
            result.message = `found user register with this email ${email}`
            result.data = resultGetUser
        }
        return result
    },
    fnCheckEmailAndHashPassword: async function (email, password, salt) {
        
        const hashPassword = await bcrypt.hash(password, salt)
        const query = ` select user_id, email, username
                        from users
                        where email = '${email}'
                        and hashpassword = '${hashPassword}'
                    `
        const result = await connection.fnExecuteQuery(query)
        return result
    },
    fnAddUserAccount: async function (email, password) {
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
    }
}

export default database