const nodemailer = require("nodemailer");

module.exports = async (req,res)=>{

if(req.method !== "POST"){

return res.status(405).json({
message:"Method not allowed"
});

}

try{

const {name,email,message} = req.body;

if(
!name ||
!email ||
!message
){

return res.status(400).json({

message:"All fields required."

});

}

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:"saifromios@gmail.com",

subject:
`Portfolio Message — ${name}`,

html:`

<h2>New Portfolio Message</h2>

<p><b>Name:</b> ${name}</p>

<p><b>Email:</b> ${email}</p>

<p><b>Message:</b></p>

<p>${message}</p>

`

});

return res.status(200).json({

message:
"Email sent successfully."

});

}catch(error){

console.log(error);

return res.status(500).json({

message:
"Email sending failed."

});

}

};