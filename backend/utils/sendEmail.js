const nodeMailer=require("nodemailer");


const sendMail=async(options)=>{

    const transporter=nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        service:"gmail",
        auth:{
            user:MAILER_USER,
            pass:MAILER_PASSWORD
        }
    })
    const mailOptions={
        from:MAILER_USER,
        to: options.email,
        subject: options.subject,
        text: options.message
        
        }
        await transporter.sendMail(mailOptions)

}


module.exports=sendMail
