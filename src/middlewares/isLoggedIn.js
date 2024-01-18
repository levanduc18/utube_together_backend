import httpStatus from "http-status";

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(httpStatus.UNAUTHORIZED);
};

export default isLoggedIn;
