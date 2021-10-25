const mongoose = require("mongoose");

const Product = require("./models/product");

const url =
  "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/products_test?retryWrites=true&w=majority";
mongoose.connect(url).then(() => {
  console.log("Connected to  database!");
}).catch(() => {
  console.log("Connection Failed!");
})

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  console.log(createdProduct.id);  // 6176fefc9901e8687df4d8ad  // id is generated before inserting into db
  const result = await createdProduct.save();
  console.log(createdProduct._id); // new ObjectId("6176fefc9901e8687df4d8ad")  // An Object which stores the object ID
  console.log(createdProduct.id);  // 6176fefc9901e8687df4d8ad  // Convert Object to String

  res.json({result});
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json({products});
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
