import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
      unique: true,
    },
  },
  { timestamps: true },
);
