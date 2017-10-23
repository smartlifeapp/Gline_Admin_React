/* jshint esversion: 6 */
const express = require('express');
const compression = require('compression');
const CacheControl = require('express-cache-control');

const cache = new CacheControl().middleware;

// Create our app
const app = express();
app.use(compression());
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    req.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});


app.use(express.static('public'));

app.get('*', cache('hours', 3), (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('*.js', cache('hours', 3), (req, res, next) => {
  res.cacheControl = {
    maxAge: 30,
  };
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.listen(7440, () => {
  console.log('Express server is up on port 7440');
});
