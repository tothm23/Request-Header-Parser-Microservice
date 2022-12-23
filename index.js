const express = require('express');
const useragent = require("express-useragent")
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Useragent middleware
app.use(useragent.express());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  res.json({
    "ipaddress": req.ip,
    "language": `${req.acceptsLanguages()} ${req.acceptsCharsets()}`,
    "software": req.useragent.source
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Request Header Parser Microservice run on ${listener.address().port}`);
});