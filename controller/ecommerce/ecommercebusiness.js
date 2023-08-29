const database = require('./ecommercedatabase.js')

const business = {
  fnSearchProduct: async function (req, res) {
    try {
      return { data: "fnSearchProduct" }
    } catch (err) {
      throw err
    }
  },
  fnGetPopularTag: async function (req, res) {
    try {

      return { populartag: ["1","2"] }
    } catch (err) {
      throw err
    }
  }
}

module.exports = business