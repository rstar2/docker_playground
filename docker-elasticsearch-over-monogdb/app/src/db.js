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
exports.getUser = async (id) => {
    return User.findById(id).exec();
};


/**
 * @param {String} uid
 * @return {Promise<{id:String,name:String}[]>}
 */
exports.getUsers = async () => {
    return User.find({}).exec();
};

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Article = mongoose.model('Article', articleSchema);

// NOTE: if the index is already created no need ot do it here
// articleSchema.index({'$**': 'text'}); // make all String fields searchable
// articleSchema.index({title: 'text', content: 'text'}); // specify the searchable fields

/**
 * @param {String} uid
 * @return {Promise<{id:String,title:String,content:String}>}
 */
exports.getArticle = async (id) => {
    return Article.findById(id).exec();
};


/**
 * @param {String} uid
 * @return {Promise<{id:String,title:String,content:String}[]>}
 */
exports.searchArticles = async (q) => {
    return Article.find({ $text: { $search: q } }).exec();
};


