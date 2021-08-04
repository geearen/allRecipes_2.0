const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

/* Register --- Get Route */
router.get("/register", function (request,response){
  // response.send("THIS IS THE REGISTER PAGE");
  return response.render("auth/register");
});

/* Login -- GET Route */
router.get("/login", function (request,response){
  // response.send("THIS IS LOGIN PAGE");
  return response.render("auth/login");
});

/* Register --- POST route */
router.post("/register", async function(request,response){
  // response.send("I CREATED MY ACCOUNT")
  try{
    const foundUser = await User.exists({username:request.body.username})
    if(foundUser){
      return response.redirect("/login");
    };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(request.body.password, salt);
    request.body.password = hash;

    const newUser = await User.create(request.body);

    return response.redirect("/login");
  }catch(error){
    console.log(err);
    return response.send(error); //need fix
  }
});

/* Login --- POST route */
router.post("/login", function (request, response) {
  response.send("I LOG IN")
});

/* LOG OUT --- GET */
router.get("/logout", function (request, response) {
  response.send("I LOGGED OUT")
});

module.exports = router;

