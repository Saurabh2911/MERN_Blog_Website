const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


//REGISTER
router.post("/register", [
    body('username', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],
 async (req, res) => {

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;
        if(!username){
            res.status
        }
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt)
        const newuser = new User({
            username: username,
            email: email,
            password: hashpass
        });
        const user = await newuser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
})



//LOGIN
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        !user && res.status(400).json("wrong credentials");

        const validate = await bcrypt.compare(password,user.password);
        !validate && res.status(400).json("wrong credentials");
         
        const nUser = await User.findOne({username}).select("-password");
        res.status(200).json(nUser);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;