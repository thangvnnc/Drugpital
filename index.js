const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const apiv1 = require("./apiv1");

const app = express();
const PORT = 1234;

app.use(session({
        secret: "6E0C130CA8CF53A2473BD88044B83DA9",
        resave: true,
        saveUninitialized: true,
        // cookie: { maxAge: 600000 }
    })
);

// Cấu hình nhận dữ liệu post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/app", express.static(__dirname + "/public"));

// Cấu hình api
app.use("/apiv1", apiv1);

app.listen(PORT, function(err) {
    if (err)
        console.log(err);
    console.log("Server listen: " + PORT);
});