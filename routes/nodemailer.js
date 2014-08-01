/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
exports.send = function(){
    console.log('Will send mail using nodemailer service...');
    var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'service.c2c@gmail.com',
        pass: 'service@c2c'
    },
    maxConnections: 5,
    maxMessages: 10
}));

transporter.sendMail({
    from: 'service.c2c@gmail.com',
    to: 'gauravsaluja2006@gmail.com',
    subject: 'hello',
    text: 'hello world!'
});

console.log('check mail... :D');


};
