'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');


require("dotenv").config();


const path = require('path');
const {startGame, checkProperty, checkItem, getMatches} = require("./controllers/games");

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());

// const delay = (req, res, next) => {
//     setTimeout(()=> {next()}, 500);
// }
// app.use(delay)


passport.use(
    new LocalStrategy((username, password, callback) => {
        User.find(username, password)
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(null, false, err);
            });
    }),
);

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
};
passport.serializeUser((user, callback) => {
    callback(null, {
        id: user.id,
        name: user.name,
        email: user.email,
    });
});
passport.deserializeUser((user, callback) => {
    callback(null, user);
});

app.use(passport.authenticate('session'));

const authenticate = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.logIn(user, err => {
            if(err){
                return next(err);
            }
            next();
        });
    })(req, res, next);
};

app.post("/session", authenticate, (req, res) =>{
    res.status(200).json({ user: req.user });
});
app.get("/session/current", isLoggedIn, (req, res) => {
    res.status(200).json({ user: req.user });
});
app.delete("/logout", (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: "logged out"});
    });
});


//api endpoints
app.get("/games", isLoggedIn, getMatches);
app.post("/games", startGame);
app.post("/games/:id/property", checkProperty);
app.put("/games/:id/item", checkItem);
module.exports = app;