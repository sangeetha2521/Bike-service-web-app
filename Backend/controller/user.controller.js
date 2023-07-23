const userService = require("../service/user.service");

const signUp = async (req, res) => {
  const token = await userService.signUp(req.body);
  // Check if sign-up was successful or not
  if (token.meta != 403) {
    // Set the access_token cookie and respond with success message
    return res
      .cookie("access_token", token.data, {
        httpOnly: false,
        expires: new Date(Date.now() + 30 * 24 * 3600000),
        secure: false,
        samesite: "none",
      })
      .status(200)
      .json({ message: "sucess" });
  } else {
    // Respond with failed message if sign-up failed
    return res.status(token.meta).json({ message: "failed" });
  }
};
const signIn = async (req, res) => {
  const data = await userService.signIn(req.body.email, req.body.password);
  if (data.meta !== 200) {
    return res.status(data.meta).json({ message: "Incorrect Email or Password" });
  }
  return res
    .cookie("access_token", data.data, {
      httpOnly: false,
      expires: new Date(Date.now() + 30 * 24 * 3600000),
      secure: false,
      samesite: "none",
    })
    .status(200)
    .json({ message: "sucess" });
};
// Function to get current user information (based on the access token)
const currentUser = async (req, res) => {
  return res.status(200).send({ userId: req.userId, role: req.userRole });
};
const getAUser = async (req, res) => {
  const user = await userService.getAUser(req.body);
  return res.send(user);
};
const logout = async (req, res) => {
  // Clear the access_token cookie and respond with success message
  return res.clearCookie("access_token").status(200).json({ message: "Successfully logged out 😏" });
};

module.exports = {
  signUp,
  logout,
  signIn,
  currentUser,
  getAUser,
};
