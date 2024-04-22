import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const postSchema = new mongoose.Schema({
  content: String,
  likes: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  posts: [postSchema],
  totalLikes: { type: Number, default: 0 },
});

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

export default User;