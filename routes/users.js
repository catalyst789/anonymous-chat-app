const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// mongoose.connect('mongodb://localhost/gfaadbook');
// 'mongodb+srv://jkthecoder:jkTheCoder@cluster0.va5hj.mongodb.net/chatapp?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://jkthecoder:jkTheCoder@cluster0.va5hj.mongodb.net/chatapp?retryWrites=true&w=majority', {
  useNewUrlParser:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then( () => console.log('Database Configured!'))
.catch( err => console.log(err));

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  profilePic: {
    type: String,
    default: '/images/user-avaatar.png'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }],
  email: String,
  about: String,
  city: String,
  resetToken: String,
  resetTime: String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);