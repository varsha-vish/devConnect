import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
if (!process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('Missing environment variables. Please set SESSION_SECRET and MONGO_URI.');
  process.exit(1);
}
app.set('trust proxy', 1);

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'https://devconnect-jun25-1047am-40s-frontend-varsha-vishwakarma-beta.platform.beta.sidepro.app'
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,         // Must be true for HTTPS
      sameSite: 'none',     // Needed for cross-origin cookies
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Mongo Server running')))
  .catch((err) => console.error(err));