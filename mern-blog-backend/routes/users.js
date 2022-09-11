const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require('bcrypt');

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can update only your account!")
    }

})

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id)
        if (user) {
            try {
                await Post.deleteMany({username : user.username});
                const duser = await User.findByIdAndDelete(req.params.id);
                res.status(200).json(duser);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(400).json("user not found")
        }

    } else {
        res.status(401).json("You can update only your account!")
    }

})

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json("User not found");
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
})



module.exports = router;