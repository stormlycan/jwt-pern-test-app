const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
pool

router.get("/", authorization, async (req,res) => {
    try {
        // req.body has payload
        // res.json(req.user)

        const user = await pool.query("SELECT (user_name) FROM users WHERE user_id = $1", [req.user]);

        res.status(200).json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error")
    }
})

module.exports = router;