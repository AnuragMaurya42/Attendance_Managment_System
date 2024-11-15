const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Faculty = require("../models/Faculty");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || "defaultSecret"; // Use environment variable

module.exports = (passport) => {
  passport.use(
    "faculty",
    new JwtStrategy(opts, (jwt_payload, done) => {
      Faculty.findOne({ email: jwt_payload.email })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: "User not found" });
        })
        .catch((err) => done(err, false)); // Handle errors more explicitly
    })
  );
};
