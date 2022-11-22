import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    // match: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
  },
  email: {
    type: String,
    require: true,
    match: /.+\@.+\..+/,
  },

  password: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    default: 'USER',
  },
});
