const connectmysql = require('../../connectmysql.js')
const bcrypt = require('bcrypt')

const database = {
    fnFindUserByEmail: async function (email) {
        email = email ? ` '${email}' ` : null

        const query = ` select user_id, email, salt
                        from users
                        where email = ${email}
                    `
        const result = await connectmysql.fnExecuteQuery(query)
        return result
    },
    fnCheckEmailAndHashPassword: async function (email, password, salt) {
        
        const hashPassword = await bcrypt.hash(password, salt)
        const query = ` select user_id, email, username
                        from users
                        where email = '${email}'
                        and hashpassword = '${hashPassword}'
                    `
        const result = await connectmysql.fnExecuteQuery(query)
        return result
    },
    fnAddUserAccount: async function (email, username, password) {
        const randomsalt = bcrypt.genSaltSync(10)
        const hashpassword = await bcrypt.hash(password, randomsalt)

        const query = ` insert users (email, username, hashpassword, salt, register_date)
                        values ('${email}', '${username}', '${hashpassword}', '${randomsalt}', now())
                    `
        const result = await connectmysql.fnExecuteQuery(query)
        let isSuccess = false
        if (result.affectedRows >= 1) {
            isSuccess = true
        }
        return result
    }
}

module.exports = database