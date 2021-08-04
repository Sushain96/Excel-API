const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require(`${__dirname}/../models/userModel`);
const catchAsync = require(`${__dirname}/../catchAsync`);

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "Success",
    token: token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    // name: "Sushain",
    // email: "sushain@gmail.com",
    // password: "pass1234",
    // passwordConfirm: "pass1234",
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //incomplete fields
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password", 400));
  }
  // checking email validity and password
  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(password === user.password)) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  createSendToken(user, 200, res);
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  //1. Checking if the token exists.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in ", 401));
  }
  //2. Validating the tokken.(Verification)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Checking if user still exists.
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The User belonging to this token does no longer exist.",
        401
      )
    );
  }
  next();
});
