Authenticate Using Google in Node.js with passport-google-oauth20

1. Install Required Packages

Navigate to your project directory and run the following command:

npm install express passport passport-google-oauth20 dotenv express-session cors

📌 Documentation: passport-google-oauth20 - https://www.npmjs.com/package/passport-google-oauth20?activeTab=readme

2. Configure Environmental Variables

Create a .env file in your project root and define important variables:

GOOGLE_CLIENT_ID="your_google_client_id_goes_here"
GOOGLE_CLIENT_SECRET="your_client_secret_goes_here"
SESSION_SECRET="your_generated_session_secret"

Generate SESSION_SECRET

Run the following command to generate a secure session secret:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

3. Import Required Packages

In server/index.js, import the necessary modules:

import express from "express";
import passport from "passport"; // Authentication middleware
import session from "express-session"; // Session management
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

4. Configure Express and Sessions

Initialize the Express app and set up session handling:

const app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

5. Configure Passport Google OAuth 2.0 Strategy

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

6. Set Up Authentication Routes

Login Route (Redirects to Google)

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Google OAuth Callback Route

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

Logout Route

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

7. Protect Routes

Create middleware to protect private routes:

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

app.get("/dashboard", isLoggedIn, (req, res) => {
  res.send(`Hello, ${req.user.displayName}`);
});

8. Frontend: Google Sign-In Button

In the frontend, use the following button to start authentication:

<a href="/auth/google">
  <button>Sign in with Google</button>
</a>

9. Start the Server

Run the following command to start the Node.js server:

node index.js

