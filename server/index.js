import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport"; // Authentication middleware
import session from "express-session"; // Session management

import authRoutes from "./routes/authRoutes.js"; // Import routes
import "./config/passport.js"; // Import authentication setup

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Check if user is logged in
app.get("/auth/user", (req, res) => {
  res.json({ user: req.isAuthenticated() ? req.user : null });
});

import professionRoutes from "./routes/professionsRoutes.js";
app.use("/api", professionRoutes)


// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});


