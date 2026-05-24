const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "Loaded"
    : "Missing"
);

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{

    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS

  }

});

app.post(
"/send-email",
async(req,res)=>{

try{

const {
  name,
  email,
  message
} = req.body;

if(
  !name ||
  !email ||
  !message
){

return res.status(400).json({

message:
"All fields required."

});

}

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to:
"saifromios@gmail.com",

subject:
`Portfolio Message — ${name}`,

html:`

<h2>New Portfolio Message</h2>

<p>
<b>Name:</b>
${name}
</p>

<p>
<b>Email:</b>
${email}
</p>

<p>
<b>Message:</b>
</p>

<p>
${message}
</p>

`

});

res.status(200).json({

message:
"Email sent successfully."

});

}catch(error){

console.log(
"========== EMAIL ERROR =========="
);

console.log(error);

console.log(
"================================="
);

res.status(500).json({

message:
"Email sending failed."

});

}

}
);

const PORT =
process.env.PORT || 5005;

app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});