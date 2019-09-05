import * as mongoose from 'mongoose';
var RoleSchema = require('../schemas/role').schema;

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
      }
    ]
  },
  { timestamps: true },
);
