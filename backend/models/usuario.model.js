import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const userSchema = new mongoose.Schema({
  firstName:
  {
    type: String,
    required: [true, "First Name es requerido"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name es requerido"],
  },
  email: {
    type: String,
    required: [true, "Email es requerido"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password es requerido"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  posts: [postSchema],
  totalLikes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


// nunca funcionaste pues, maldito coding dojo.
/* 
userSchema.virtual('confirmPassword')
  .get(function () { return this._confirmPassword; })
  .set(function (value) { this._confirmPassword = value; });

userSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
}); 
*/


// Hash the password before saving the user model
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

export { User, Post };