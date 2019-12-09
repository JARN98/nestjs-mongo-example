import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  roles: { type: [String], default: ['user'] }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('pass')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.pass, salt, function (err, hash) {
      if (err) return next(err);
      user.pass = hash;
      next();
    });
  });
});