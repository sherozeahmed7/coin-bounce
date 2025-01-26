const Joi = require("joi");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const JWTServices = require("../services/JWTServices");
const RefreshToken = require("../models/token");

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

    let accessToken;
    let refreshToken;
    let user;
    try {
      const userToRegister = new User({
        username,
        name,
        email,
        password: hashPassword,
      });

      user = await userToRegister.save();

      accessToken = JWTServices.signAccessToken({ _id: user._id }, "30m");

      refreshToken = JWTServices.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }

    await JWTServices.storeRefreshToken(refreshToken, user._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true,
    });

    const userDto = new UserDTO(user);

    return res.status(201).json({ user: userDto, auth: true });
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

    const accessToken = JWTServices.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTServices.signRefreshToken({ _id: user._id }, "60m");
    try {
      await RefreshToken.updateOne(
        { _id: user._id },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true,
    });

    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
  async logout(req, res, next) {
    console.log(req);
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ user: null, auth: false });

  },
  async refresh(req, res, next) {
    const OrignalRefreshToken = req.cookies.refreshToken;
    try {
      id = JWTServices.verifyRefreshToken(OrignalRefreshToken)._id;
    } catch (e) 
      {
        const error = {
          status: 401,
          message: "unauthorized",
        };
        return next(error);
      }
      try {
        RefreshToken.findOne({ _id: id, token: OrignalRefreshToken });
        if (!RefreshToken) {
          const error = {
            status: 401,
            message: "unauthorized",
          };
          return next(error);
        }
      } catch (error) {
        return next(error);
      }

      try {
        const accessToken = JWTServices.signAccessToken({ _id: id }, "30m");
        const refreshToken = JWTServices.signRefreshToken({ _id: id }, "60m");
        await RefreshToken.updateOne(
          { _id: id },
          { token: refreshToken })
          res.cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
          });
          res.cookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
          });
      } catch (error) {
        return next(error);
      }
      
      
    const user = await User.findOne({ _id: id });
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  }
};

module.exports = authController;
