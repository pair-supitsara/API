const connectmysql = require('../connectmysql.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const business = {
  fnConnectMySql: async function (req, res) {
    try {
      
      const result = await connectmysql.fnExecuteQuery('query')

      res.status(200).json({
        result: result
      })
    } catch (err) {
        res.send(err)
    }
  },
  fnRegister: async function (req, res) {
    try {
      const { email, username, password } = req.body
      const randomsalt = bcrypt.genSaltSync(10)
      const hashpassword = await bcrypt.hash(password, randomsalt)

      let status = 'you already have an account with this email'
      const query1 = `  select * 
                        from users
                        where email = '${email}'
                    `
      const result = await connectmysql.fnExecuteQuery(query1)
        
      if (result.length == 0) { // this email has never registered.
        const query2 =  ` insert users(username, email, hashpassword, salt)
                          values('${username}', '${email}', '${hashpassword}', '${randomsalt}')
                        `
        await connectmysql.fnExecuteQuery(query2)
        status = 'register successfully'
      }

      return {
        randomsalt,
        hashpassword,
        result,
        status
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = business