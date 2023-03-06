// trebuie sters. Am modificat user Document ca sa includa un isAdmin setat default ca "false"
// trebuie updatat in asa fel incat sa pot schimba valoarea din false in true pentru noi administratori

const User = require("../models/user");

const updateIsAdmin = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      throw new Error("User not found.");
    }
    if (user.isAdmin === true) {
      throw new Error("User is already an admin.");
    }
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $set: { isAdmin: true } }
    );
    res.json({ message: "User granted admin access." });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = updateIsAdmin;
