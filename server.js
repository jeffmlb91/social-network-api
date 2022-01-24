const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI) || "mongodb://localhost/social-net",
  {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
