const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'localhost';
mongoose.connect(`mongodb://${MONGODB_URL}/docker-my-cc`, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model('User', userSchema);
// this will use the 'users' collection inside the 'docker-my-cc' db

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', console.log.bind(console, 'DB connected'));


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
