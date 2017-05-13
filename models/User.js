var mongoose = require("mongoose");
const usersSchema = require("../schemas/user");

module.exports = mongoose.model("User", usersSchema);