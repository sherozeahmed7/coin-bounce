const Joi = require("joi");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const passwordPattern =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const authController = {
  async register(req, res, next) {
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { username, name, email, password } = req.body;

    try {
      const emailInUser = await User.exists({ email });
      const usernameInUse = await User.exists({ username });

      if (emailInUser) {
        const error = {
          status: 409,
          message: "email already in use, use another email to register",
        };
        return next(error);
      }

      if (usernameInUse) {
        const error = {
          status: 409,
          message: "username not available, try another username",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userToRegister = new User({
      username,
      name,
      email,
      password: hashPassword,
    });

    const user = await userToRegister.save();

    return res.status(201).json({ user });
  },
  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, password } = req.body;

    let user;
    try {
      user = await User.findOne({ username: username });

      if (!user) {
        const error = {
          status: 401,
          message: "invalid Username",
        };
        return next(error);
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "invalid password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ user: user });
  },
};

module.exports = authController;
