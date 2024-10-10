const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sivaprasad:siva4683@cluster.vck6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")

    .then(() =>
         console.log("Connection successful"))
    .catch(error => 
         console.error("Connection error:", error));

module.exports = mongoose.connection;