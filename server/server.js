const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register AND login routes
app.use('/auth', require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
});
