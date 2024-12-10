const statusCodes = {
  SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
  OK: 200,
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const xtest = {
  x: 1,
  y: 2,
};

if (xtest.y == 2) {
  console.log("something");
} else if (xtest.x == 1) {
  console.log("nothing");
} else {
  console.log("what");
}

module.exports = {
  statusCodes,
  xtest,
  cookieOptions,
};
