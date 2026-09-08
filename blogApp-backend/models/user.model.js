import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "firstname cannot be empty" },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "lastname cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "email must be a valid email address" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    // forgot/reset-password flow: a hashed, single-use token with an
    // expiry. never the raw token - the raw one only ever exists in the
    // email/response sent to the user, never at rest in the database
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "createAt",
    updatedAt: "updateAt",
    // the hash and the reset-token fields must never reach a normal
    // response, so they are excluded by default and only pulled in where
    // the code explicitly asks for them
    defaultScope: {
      attributes: { exclude: ["password", "resetPasswordToken", "resetPasswordExpires"] },
    },
    scopes: {
      withPassword: { attributes: { include: ["password"] } },
      withResetToken: { attributes: { include: ["resetPasswordToken", "resetPasswordExpires"] } },
    },
  }
);

export default User;
