const mongoose = require("mongoose");

let MONGO_URI = "mongodb://localhost:27017/Health"

let connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await console.log("offline db connected successfully");
    // createShipRocket_Token2()
  } catch (err) {
    await console.log(err.message);
  }
};
connect();
