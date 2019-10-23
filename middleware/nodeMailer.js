const nodemailer = require('nodemailer');
require('dotenv').config();

exports.nodemailSender = (forgetPasswordDataObject, url, urlToken, callback) => {
    console.log('user email', process.env.USERMAIL);
    console.log('user password', process.env.USERPASSWORD);
    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'surajpj78522@gmail.com',
            pass:'suraj7852'
        }
    });

    let mailoption = {
        // from: process.env.USERMAIL,
        from:'surajpj78522@gmail.com',
        to: forgetPasswordDataObject.email,
        subject: 'sending email to reset password',
        text: url,
        html: '<h1>click on link for verification</h1><br><p>Click <a href="http://localhost:3000/#/resetPassword/' + urlToken + '">here</a> to reset your password</p><br><br>'
    }
    /**send mail take mailoption as argument*/
    transporter.sendMail(mailoption, (err, data) => {
        if (err) {
            console.log('email not send');
            return callback(err);
        } else {
            return callback(null, 'email send :' + data.response);
        }
    })
}
