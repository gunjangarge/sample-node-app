const express = require('express')
const app = express()
const os = require('os');
const port = 8080
var msg;
var app_msg = process.env.APP_MSG;
var name= process.env.USER_NAME;
var user_password= process.env.USER_PASSWORD;

app.get('/', (req, res) => {
    if (app_msg == undefined) {
        msg = 'Hello, ' + req.hostname + '. Time is ' + Date() + '.\nYou have no message for me.\n';
    } else {
        msg = 'Hello, ' + req.hostname + '. Time is ' + Date() + '.\nI will deliver your message: ' + app_msg + '\n';
    }
    if (name != undefined && user_password != undefined){
        msg = msg + '\nYour user name is :- ' + name + ' and password is :- ' + user_password + '\n';
    }
    res.send(msg);
})

app.get('/ip', (req, res) => {
    msg = 'Hello, ' + req.hostname + '. Time is ' + Date() + '. From: ' + os.hostname() + '.\n'; 
    console.log(msg);
    res.send(msg);
})

app.get('/perf', (req, res) => {
    var i=0;
    while (i < 9e5) i++;
    console.log("counted till " + i);
    res.status(200)
    .send({
        message: "counted till " + i
    });
})


app.listen(port, () => console.log(`Sample node app listening at port ${port}`))
