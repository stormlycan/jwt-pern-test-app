const { Router } = require('express');
const pool = require('./../db.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('./../util/jwtGenerator.js');
const validinfo = require('./../middleware/validinfo.js');
const authorization = require('./../middleware/authorization.js');

const router = Router();

// Register Route
router.post('/register', validinfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, mail, password)
        const { name, email, password } = req.body;

        //2. check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        //3. Bcrypt the user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the user inside our database 
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]);

        //5. generate our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// login Route

router.post('/login', async (req, res) => {
    try {

        //1. deconstruct if user exists

        const { name, email, password } = req.body;

        //2. check if user exists

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            res.status(401).json("Password or email is incorrect");
        }

        //3. check if incoming password is same as data password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            res.status(401).json("Password or email is incorrect");
        }

        //4. give them jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
