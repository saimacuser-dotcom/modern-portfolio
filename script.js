const form = document.getElementById("contactForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const submitBtn = form.querySelector("button");

submitBtn.disabled = true;
submitBtn.innerText = "Sending...";

const formData = {

name: form.name.value,
email: form.email.value,
message: form.message.value

};

try{

const response = await fetch(
"http://localhost:5005/send-email",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(formData)
}
);

const data = await response.json();

if(response.ok){

statusText.innerText =
"✓ Message sent successfully.";

statusText.style.color = "#ffffff";

form.reset();

}else{

statusText.innerText =
data.message;

statusText.style.color = "#ff4d4d";

}

}catch(err){

console.log(err);

statusText.innerText =
"Server connection failed.";

statusText.style.color = "#ff4d4d";

}

submitBtn.disabled = false;
submitBtn.innerText = "Send Message";

});