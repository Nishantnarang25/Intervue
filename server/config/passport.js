import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config(); // Load environment variables

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);

        if (!user) {
          user = await User.create({ //this is literally by which you are sending the dataaaaaaaa ((((((((()))))))))
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value, // Store profile picture
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const authController = {
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }

      req.session.destroy(() => { // Clears session from server
        res.clearCookie("connect.sid"); // Clears session cookie from browser
        res.redirect("http://localhost:3000"); // Redirects user to the home page (or any other page)
      });
    });
  }
};
;

export { authController };
export default passport;
