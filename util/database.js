const mongoose = require("mongoose");
const User = require('../models/user');

const url = "mongodb://127.0.0.1:27017/nodejsdb"

async function main() {
    const connection = await mongoose.connect(url);

    let user = { username: "justin", password: "12345" };
    let foundUser = await User.findOne({ username: user.username });
    if (!foundUser) {
        const newUser = await User.create(user);
        await newUser.save();
    }
    console.log("CONNECTED TO MONGODB")
}

module.exports = {
    mongoose, main
}