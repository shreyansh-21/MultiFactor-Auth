import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    const user = await newUser.save();
    console.log(user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};

export const login = async (req, res) => {
  res.status(200).json({
    message: `User logged in Successfully`,
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: `User logged in Successfully`,
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized User" });
  }
  req.logout((error) => {
    if (error) return res.status(400).json({ message: "User not logged In" });
    res.status(200).json({ message: "Logout successfull" });
  });
};

export const setup2FA = async (req, res) => {
  try {
    const user = req.user;
    const secret = speakeasy.generateSecret();

    console.log("The secret object is :", secret);

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    var url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      algorithm: "sha512",
    });

    const qrImageUrl = await qrCode.toDataURL(url);

    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error Setting up 2FA", message: error });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  const verified = speakeasy.totp({
    secret: user.twoFactorSecret,
    algorithm: "sha512",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ message: "2FA successful", token: jwtToken });
  } else {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({ message: "2FA reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Error reseting 2FA", message: error });
  }
};
