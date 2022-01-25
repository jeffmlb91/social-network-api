const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("debug", true);

app.use(require("./router"));

mongoose.connect(process.env.MONGODB_URI ||
  "mongodb://localhost/social-network-app",
  {
    // userNewUrlParser: true,
    // useUnifiedTopology: true,
  });
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
