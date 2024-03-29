/*
    Import Modules
 */
const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);


/*
    Import User Files
 */
const CONFIG = require("./configs");
const Passport = require("./passport");
//Initialise Server
const app = express();
/*
    MiddleWares
 */

//Serve Static Files
app.use('/',express.static(path.join(__dirname, "/public_html")));

//Handle form-data (JSON & UrlEncoded)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const connection = mongoose.createConnection(`mongodb://${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.DB_NAME}`, {
});
const store = new MongoStore({mongooseConnection: connection});

//Handle sessions
let sessionMiddleware = session({
    resave: true,
    saveUninitialized: false,
    secret: "saveMoney",
    store: store,
    //if maxAge not set, cookie valid for current session only(until browser restart)
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10      //10 days
    },

});
app.use(sessionMiddleware);



//Initialise passport
app.use(Passport.initialize());

//Ensure persistent sessions
app.use(Passport.session());

/*
    Routes
 */

app.use("/manager", require("./routes/manager"));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// //Items route
app.use("/employee", require("./routes/employee"));
app.use("/company", require("./routes/company"));
// app.use("/bids", require("./routes/bids"));
// app.use('/users', HELPERS.checkLoggedIn, require("./routes/users"));
  require("./routes/auth")(app);

/*
    Other Routes
 */
// app.use(function (req, res) {
//     res.send('404');
// });

//Listen on port
app.listen(CONFIG.SERVER.PORT, function () {
    console.log(`Server running @ http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}`);
});
