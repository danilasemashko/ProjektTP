const { Router } = require('express');
const User = require('./models/User');
const router = Router();



router.put("/exhcange/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "You have successfully complete the operation" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

//get all users
router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({ message: "No users" });
        }
        res.status(200).json(users)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router