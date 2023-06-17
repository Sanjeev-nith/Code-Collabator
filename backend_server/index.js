const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./services/passport');
const keys = require('./config/keys');
const routes = require('./routes');
const sequelize = require('./services/database')

const app = express();

app.use(express.json());

const syncSequelize = async () => {
  await sequelize.sync();
};
syncSequelize();

const cookieExpiry = 30*24*60*60*1000;
app.use(session({
  cookie: {
    maxAge: cookieExpiry
  },
  secret: keys.cookieSecret,
  resave: false,
  saveUninitialized: false
}));

// app.use(cookieSession({
//   maxAge: 30*24*60*60*1000,
//   keys: [keys.cookieSecret]
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});