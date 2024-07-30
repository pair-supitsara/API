
import database from './database.js'
import valid from '../../helper/validator.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const business = {
  fnAddNewItem: async function (req, res) {
    try {
      const { name, detail, image, filename } = req.body
      
      const buffer = Buffer.from(image, 'base64');
       // You can use a different file extension based on the image type
      const filePath = path.join(process.cwd(), 'uploads', filename);
      console.log(filePath)
      fs.writeFileSync(filePath, buffer)
      await database.fnInsertNewProduct(name, detail, `/uploads/${filename}`)
      
      const result = { message: "add new product successfully!"}
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnRemoveProduct: async function (req, res) {
    try {
      const { product_id } = req.body
      await database.fnDeleteProduct(product_id)
      const result = { message: "Delete successfully" }
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  fnUpdateProduct: async function (req, res) {
    try {
      const result = {}
      const { product_id, name, detail, image } = req.body
      const { file, filename } = image
      
      if (file && filename) {
        const buffer = Buffer.from(file, 'base64');
        const filePath = path.join(process.cwd(), 'uploads', filename);
        console.log(filePath)
        fs.writeFileSync(filePath, buffer)
      }
      if (product_id) {
        result.message = await database.fnUpdateProductById(product_id, name, detail, filename)
        console.log(result.message)
      } else {
        result.message = 'product id is null'
      }

      result.message = "update successfully"
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default business