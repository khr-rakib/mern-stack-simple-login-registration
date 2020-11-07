const cookieParser = require('cookie-parser');
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User')


const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"]
    }
    return token;
}

// authorization 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "KHRakib"
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err)
            return done(err)

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}))


// authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        // if something went wrong with database
        if (err)
            return done(err)

        // if no user exists
        if (!user)
            return done(null, false)

        // check the password is correct
        user.comparePassword(password, done);

    })
}))