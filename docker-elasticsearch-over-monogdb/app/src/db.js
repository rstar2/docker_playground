const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, `DB connection error ${MONGO_URL}:`));
db.once('open', console.log.bind(console, 'DB connected'));


const userSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model('User', userSchema);

/**
 * @param {String} uid
 * @return {Promise<{id:String,name:String}>}
 */
exports.getUser = async (uid) => {
    return User.findById(uid).exec();
};


/**
 * @param {String} uid
 * @return {Promise<{id:String,name:String}[]>}
 */
exports.getUsers = async () => {
    return User.find({}).exec();
};
