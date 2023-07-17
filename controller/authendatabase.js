const connectmysql = require('../connectmysql.js')
const bcrypt = require('bcrypt')

const database = {
    fnFindUserByEmail: async function (email) {
        const query = ` select user_id, email, salt
                        from users
                        where email = '${email}'
                    `
        const result = await connectmysql.fnExecuteQuery(query)
        console.log(result)

        return result
    },
    fnCheckEmailAndHashPassword: async function (email, password, salt) {
        const hashPassword = await bcrypt.hash(password, salt)
        const query = ` select user_id, email, username
                        from users
                        where email = '${email}'
                        and password = ${hashPassword}
                    `
        const result = await connectmysql.fnExecuteQuery(query)
        return result
    },
    fnAddUserAccount: async function (email, username, password) {
        const randomsalt = bcrypt.genSaltSync(10)
        const hashpassword = await bcrypt.hash(password, randomsalt)

        const query = ` insert users (email, username, hashpassword, salt)
                        values ('${email}', '${username}', '${hashpassword}', '${randomsalt}')
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