// Register User

function registerUser(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let phone=document.getElementById("phone").value;
let password=document.getElementById("password").value;
let confirm=document.getElementById("confirmPassword").value;

if(name==""||email==""||phone==""||password==""||confirm==""){

alert("Please fill all fields.");

return;

}

if(password!=confirm){

alert("Passwords do not match.");

return;

}

let user={

name:name,

email:email,

phone:phone,

password:password

};

localStorage.setItem("user",JSON.stringify(user));

alert("Registration Successful!");

window.location.href="login.html";

}

// Login User

function userLogin(){

let email=document.getElementById("loginEmail").value;

let password=document.getElementById("loginPassword").value;

let user=JSON.parse(localStorage.getItem("user"));

if(user==null){

alert("Please register first.");

return;

}

if(email==user.email && password==user.password){

localStorage.setItem("loggedInUser",JSON.stringify(user));

alert("Login Successful!");

window.location.href="index.html";

}

else{

alert("Invalid Email or Password.");

}

}


// View Property

function viewProperty(name,price,location,image){

let property={

name:name,

price:price,

location:location,

image:image

};

localStorage.setItem("selectedProperty",

JSON.stringify(property));

window.location.href="property-details.html";

}

// Load Property Details

if(window.location.pathname.includes("property-details.html")){

let property=

JSON.parse(localStorage.getItem("selectedProperty"));

if(property){

document.getElementById("propertyName").innerHTML=property.name;

document.getElementById("propertyPrice").innerHTML=property.price;

document.getElementById("propertyLocation").innerHTML=property.location;

document.getElementById("propertyImage").src=property.image;

}

}

// Add Favourite

function addFavourite(){

let property=

JSON.parse(localStorage.getItem("selectedProperty"));

let favourites=

JSON.parse(localStorage.getItem("favourites")) || [];

favourites.push(property);

localStorage.setItem("favourites",

JSON.stringify(favourites));

alert("Property Added to Favourite");

}

// Filter Properties

function filterProperties(){

let category=

document.getElementById("filterCategory").value;

let cards=

document.querySelectorAll(".property-card");

let found=false;

cards.forEach(function(card){

if(category=="" ||

card.dataset.category==category){

card.style.display="block";

found=true;

}

else{

card.style.display="none";

}

});

document.getElementById("noProperty").style.display=

found?"none":"block";

}
// ============================
// Show Favourite Properties
// ============================

if(window.location.pathname.includes("favorites.html")){

let favourites=

JSON.parse(localStorage.getItem("favourites")) || [];

let container=document.getElementById("favoriteList");

if(favourites.length==0){

document.getElementById("emptyMessage").style.display="block";

}

else{

favourites.forEach(function(property,index){

container.innerHTML+=`

<div class="card">

<img src="${property.image}">

<h3>${property.name}</h3>

<p>${property.location}</p>

<p class="price">${property.price}</p>

<button
class="card-btn"
onclick="removeFavourite(${index})">

Remove

</button>

</div>

`;

});

}

}

// ============================
// Remove Favourite
// ============================

function removeFavourite(index){

let favourites=

JSON.parse(localStorage.getItem("favourites")) || [];

favourites.splice(index,1);

localStorage.setItem("favourites",

JSON.stringify(favourites));

location.reload();

}

// ============================
// Contact Owner
// ============================

function sendInquiry(){

let name=document.getElementById("contactName").value;
let email=document.getElementById("contactEmail").value;
let phone=document.getElementById("contactPhone").value;
let message=document.getElementById("contactMessage").value;

if(name=="" || email=="" || phone=="" || message==""){

    alert("Please fill all fields.");
    return;

}

let inquiry={

    name:name,
    email:email,
    phone:phone,
    message:message,
    date:new Date().toLocaleString()

};

let inquiries=JSON.parse(localStorage.getItem("inquiries")) || [];

inquiries.push(inquiry);

localStorage.setItem("inquiries",JSON.stringify(inquiries));

alert("Inquiry Sent Successfully!");

let ownerNumber="917249077508";   // Replace with owner's WhatsApp number

let whatsappMessage=
`Hello, I am ${name}.

I am interested in your property.

My Email: ${email}
My Phone: ${phone}

Message:
${message}`;

window.open(
`https://wa.me/${ownerNumber}?text=${encodeURIComponent(whatsappMessage)}`,
"_blank"
);

document.querySelector("form").reset();

}
// ==========================
// Save Logged-in User
// ==========================

// Add this inside userLogin()
// after successful login



// ==========================
// Show Profile
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname.includes("profile.html")) {

        let user = JSON.parse(localStorage.getItem("loggedInUser"));

        if (user) {
            document.getElementById("userName").textContent = user.name;
            document.getElementById("userEmail").textContent = user.email;
            document.getElementById("userPhone").textContent = user.phone;
        }

    }

});
// ==========================
// Logout
// ==========================

function logout(){

localStorage.removeItem("loggedInUser");

alert("Logged Out Successfully");

window.location.href="login.html";

}

// ==========================
// Admin Login
// ==========================

function adminLogin(){

let id=

document.getElementById("adminId").value;

let password=

document.getElementById("adminPassword").value;

if(id=="admin" && password=="admin123"){

alert("Admin Login Successful");

window.location.href="admin-dashboard.html";

}

else{

alert("Invalid Admin Credentials");

}

}
// ==============================
// Save Property
// ==============================

function saveProperty(){

let property={

name:document.getElementById("propertyName").value,

price:document.getElementById("propertyPrice").value,

location:document.getElementById("propertyLocation").value,

category:document.getElementById("propertyCategory").value,

image:document.getElementById("propertyImage").value,

description:document.getElementById("propertyDescription").value

};

if(property.name=="" ||

property.price=="" ||

property.location==""){

alert("Please fill all required fields.");

return;

}

let properties=

JSON.parse(localStorage.getItem("properties")) || [];

properties.push(property);

localStorage.setItem("properties",

JSON.stringify(properties));

alert("Property Added Successfully");

document.querySelector("form").reset();

}

// ==============================
// Display Properties
// ==============================

if(window.location.pathname.includes("manage-properties.html")){

let properties=

JSON.parse(localStorage.getItem("properties")) || [];

let table=document.getElementById("propertyTable");

properties.forEach(function(property,index){

table.innerHTML+=`

<tr>

<td>${property.name}</td>

<td>${property.location}</td>

<td>${property.category}</td>

<td>${property.price}</td>

<td>

<button

class="delete-btn"

onclick="deleteProperty(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

// ==============================
// Delete Property
// ==============================

function deleteProperty(index){

let properties=

JSON.parse(localStorage.getItem("properties")) || [];

properties.splice(index,1);

localStorage.setItem("properties",

JSON.stringify(properties));

location.reload();

}
// =======================================
// SEARCH PROPERTY FROM HOME PAGE
// =======================================

function searchProperty(){

let type=document.getElementById("propertyType").value;

let location=document.getElementById("location").value;

let budget=document.getElementById("priceRange").value;

localStorage.setItem("searchType",type);

localStorage.setItem("searchLocation",location);

localStorage.setItem("searchBudget",budget);

window.location.href="properties.html";

}

// =======================================
// LOAD USERS IN ADMIN PANEL
// =======================================

if(window.location.pathname.includes("manage-users.html")){

let user=JSON.parse(localStorage.getItem("user"));

let table=document.getElementById("userTable");

if(user){

table.innerHTML=`

<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.phone}</td>

<td>

<button
class="delete-btn"
onclick="deleteUser()">

Delete

</button>

</td>

</tr>

`;

}

}

// =======================================
// DELETE USER
// =======================================

function deleteUser(){

if(confirm("Delete User?")){

localStorage.removeItem("user");

localStorage.removeItem("loggedInUser");

alert("User Deleted");

location.reload();

}

}

// =======================================
// ADMIN LOGOUT
// =======================================

function adminLogout(){

alert("Admin Logged Out");

window.location.href="admin-login.html";

}

// =======================================
// FILTER PROPERTY AFTER SEARCH
// =======================================

if(window.location.pathname.includes("properties.html")){

let type=localStorage.getItem("searchType");

let cards=document.querySelectorAll(".property-card");

let found=false;

if(type!="" && type!=null){

cards.forEach(function(card){

if(card.dataset.category==type){

card.style.display="block";

found=true;

}

else{

card.style.display="none";

}

});

if(document.getElementById("noProperty")){

document.getElementById("noProperty").style.display=

found?"none":"block";

}

}

}

// =======================================
// CLEAR SEARCH
// =======================================

function clearSearch(){

localStorage.removeItem("searchType");

localStorage.removeItem("searchLocation");

localStorage.removeItem("searchBudget");

}

// =======================================
// PAGE LOADER
// =======================================

window.onload=function(){

clearSearch();

}