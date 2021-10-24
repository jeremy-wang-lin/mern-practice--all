require("log-timestamp");

const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);
  try {
    //console.log("Connect");
    await client.connect();
    //console.log("Get DB");
    const db = client.db();
    //console.log("Start insert intoDB");
    const result = await db.collection("products").insertOne(newProduct);
    //console.log("End");
    //console.log("result: " + JSON.stringify(result));
  } catch (error) {
    return res.json({ message: "Could not store data! Error: " + error });
  }
  client.close();

  res.json({ message: "Product created", product: newProduct });
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not get data! Error: " + error });
  }
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
