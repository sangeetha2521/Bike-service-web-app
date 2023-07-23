const UserModel = require("../model/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const userModel = require("../model/user.model");

const signUp = async ({ email, password, phoneNumber, role }) => {
  try {
    const user = new UserModel({
      email,
      password,
      phoneNumber,
      role,
    });
    const findUserByEmail = await UserModel.findOne({ email });
    if (findUserByEmail) {
      return { meta: 403 };
    }
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser.id, role: savedUser.role }, process.env.SECRET_KEY);
    return { data: token, meta: 200, user: savedUser };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const signIn = async (email, password) => {
  try {
    const findUserByEmail = await UserModel.findOne({ email });
    if (!findUserByEmail) {
      return { meta: 403 };
    }
    const checkPassword = await bcrypt.compare(password, findUserByEmail.password);
    if (!checkPassword) {
      return { meta: 401 };
    }
    const token = jwt.sign({ id: findUserByEmail.id, role: findUserByEmail.role }, process.env.SECRET_KEY);
    return { data: token, meta: 200, user: findUserByEmail };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getAUser = async (userId) => {
  let userData = await userModel.findById(userId);
  return userData;
};

module.exports = {
  signUp,
  signIn,
  getAUser,
};
