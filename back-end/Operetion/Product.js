const config = require("../db/dbConfig");
const sql = require("mssql");

const getProduct = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let product = await pool.request().query("SELECT * FROM Product");
    return res.status(200).json(product.recordset);
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const postImg = {
      img: req.file.path,
      Img_Url: "http://localhost:5000/uploadImg/" + req.file.filename,
    };

    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .query(
        `INSERT INTO Product VALUES ('${newProduct.ID}',${newProduct.Amount},'${newProduct.Product_Name}', '${newProduct.Price}', '${postImg.Img_Url}')`
      );
    return res.status(200).json("success");
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .query(`DELETE FROM Product WHERE ${req.body.column}='${req.body.row}'`);
    return res.status(200).json("delete success");
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const column = req.body.column;
    const value = req.body.value;
    const ID = req.body.ID;

    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .query(`UPDATE Product SET ${column} = '${value}' WHERE ID = '${ID}'`);
    return res.status(200).json("update success");
  } catch (err) {
    console.log(err);
  }
};

const uploadImg = (req, res) => {
  const postImg = {
    img: req.file.path,
    url: "http://localhost:5000/uploadImg/" + req.file.filename,
  };

  return res.status(200).json({
    image: postImg,
  });
};

const getOneProduct = async (req, res) => {
  try {
    const name = req.body.name;
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .query(`SELECT * FROM Product WHERE Product_Name = '${name}'`);
    return res.status(200).json(product.recordset );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImg,
  getOneProduct,
};
