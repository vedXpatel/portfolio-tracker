const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 5000;
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors({
    origin: 'https://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Include 'Content-Type' in allowed headers
}));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to proxy requests
app.post("/proxy", async (req, res) => {
  try {
    // console.log(`req.body : ${Object.entries(req.body)}`);
    const response = await axios({
      method: req.method,
      url: "https://api.upstox.com/v2/login/authorization/token",
      headers: {
        accept: "application/json",
        "Api-Version": "2.0",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        // Include other necessary headers
      },
      data: req.body,
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
