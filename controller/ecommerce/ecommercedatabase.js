import connection from '../../connectmysql.js'

const database = {
    fnFindUserByEmail: async function (email) {
        email = email ? ` '${email}' ` : null

        const query = ` select user_id, email, salt
                        from users
                        where email = ${email}
                    `
        const result = await connection.fnExecuteQuery(query)
        return result
    }
}

export default database