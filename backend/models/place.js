const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Place", placeSchema);
// mongoose.model("Place", placeSchema) will return a construction function.
// 第一個參數 "Place" (慣例是首字大寫，單數形式), 將會轉成 "places" 這個 collection 名稱 (首字換小寫，字尾加複數s)
