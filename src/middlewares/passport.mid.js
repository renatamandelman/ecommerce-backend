import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import User from "../models/user.model.js";
import { createHash, compareHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use(
  "register",
  new LocalStrategy(
    /*la configuracion de la estrategia depende de que quiero hacer */
    /*objeto con opciones de configuracion y callback con la logica de la estrategia*/
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      //la logica de la estrategia
      try {
        const one = await User.findOne({ email });
        if (one) {
          return done(null, null, {message: "invalid credential", statusCode:401}); 
        }
        //antes de crear el usuario debo proteger la contrasena
        req.body.password = createHash(password);
        const user = await User.create(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    } //callback done
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, null, {message: "invalid credential", statusCode:401}); 
        }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          const error = new Error("invalid credetials");
          error.statusCode = 401;
          throw error;
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    /* objeto de configuración de la estrategia */
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      passReqToCallback: true,
    },
    /* callback done con la logica necesaria para la estrategia */
    async (req, accesToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.id });
        if (!user) {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            avatar: profile.photos[0].value,
            password: createHash(profile.id),
          };
          user = await User.create(user);
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt-auth",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await User.findById(user_id);
        if (!user) {
          return done();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "jwt-adm",
  new JwtStrategy(
    {
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest:ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        const user = await User.findById(user_id);
        if (user.role !== "ADMIN") {
          return done();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
