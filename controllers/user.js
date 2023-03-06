const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { accessToken } = require("../middleware/JWT&Admin");

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new Error("No users found");
    } else {
      res.json(users);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
// after registering userul ar trebui sa fie redirectionat catre login page si abia dupa sa primeasca un token
const register = async (req, res) => {
  const { lastName, firstName, email, password } = req.body;

  try {
    if (!lastName || !firstName || !email || !password) {
      throw new Error("Fill in missing required fields");
    }

    const findIfUsed = await User.findOne({ email });
    if (findIfUsed) {
      throw new Error("Email already exists");
    }

    const token = uuidv4();
    const encrypted = await bcrypt.hash(password, 10);
    const user = new User({
      lastName,
      firstName,
      email,
      password: encrypted,
      verificationToken: token,
    });
    await user.save();

    //EMAIL VERIFICATION FEATURE
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    const mail = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Confirm Email",
      html: `<p>Hi ${firstName},</p><p>Please click the following link to verify your account:</p><p><a href="http://localhost:${process.env.PORT}/api/verify/${token}">Click me to verify. :)</a></p>`,
    };

    transporter.sendMail(mail, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent " + resp);
      }
    });
    // EMAIL VERIFICATION FEATURE

    // TO DO: CHANGE THE VALUE OF DEFAULT VERIFIED IN THE DB TO TRUE AFTER USER CLICKS ON VERIFIED LINK

    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// functie pentru a schimba valuarea din DB a lui verified to true

const ifVerified = async (req, res) => {
  const { token } = req.params.token;
  try {
    const user = await User.findOne({
      token,
    });
    if (!user) {
      throw new Error("Invalid token");
    }

    await User.findOneAndUpdate(
      { token },
      { $set: { verified: true, verificationToken: "" } } // sau as putea sa sterg direct field-ul verification token din document
    );
    res.json({ message: "Email verified successfully", user });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      throw new Error("Passwords do not match");
    }
    if (user.verified === false) {
      throw new Error("Verify your email address to log in.");
    }
    // user logged

    res.cookie("ert", accessToken({ userId: user._id }, "7d"), {
      httpOnly: true,
    });

    res.json({
      message: "User logged in successfully",
      // deci trimit acest access token catre client ca acesta sa il posteze in
      // authorization header ca sa imi pot folosi middleware-ul sa vad daca e bun tokenul
      accessToken: accessToken(
        { userId: user._id, isAdmin: user.isAdmin },
        "15m"
      ),
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const logout = async (_req, res) => {
  //pur si simplu voi seta refresh token-ul sa fie empty si asa voi primi o eroare cand va incerca sa
  //creeze un nou access token asa noi access tokeni nu vor mai fi creati
  // maxAge: 1 inseamna ca expira dupa o milisecunda
  res.cookie("ert", "", { maxAge: 1 });
  res.redirect("/");
};

const deleteUser = async (req, res) => {
  try {
    //user-ul va trebui sa isi scrie parola actuala ca sa poata sterge contul
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        throw new Error("Password does not match");
      } else {
        await user.delete();
        res.json({ message: "Account deleted successfully" });
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userToFind = await User.findById(req.params.id);
    if (!userToFind) {
      throw new Error("User does not exist");
    } else {
      return res.json(userToFind);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
//nu updatez email-ul userului

const updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.findById(req.params.id);
    // nu as mai cauta daca exista deja un user
    if (!user) {
      //chatGPT
      const reqWithBody = { body: req.body };
      await postNewUser(reqWithBody, res);
      return;
    } else {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        throw new Error("Invalid password");
      } else {
        await User.updateOne(
          { _id: req.params.id },
          { $set: req.body, password: newPassword }
        );
        res.json({ message: "User updated successfully" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  register,
  ifVerified,
  login,
  logout,
};
