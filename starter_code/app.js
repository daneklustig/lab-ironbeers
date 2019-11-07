const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// partials are templates within a template
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beersList => {
      // console.log(beersList);
      res.render('beers', {
        beersList
      });
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/randombeer', (req, res, next) => {

  // getRandom always give you an array with one object, every time we refresh the page
  punkAPI.getRandom()
    .then(randomBeer => {

      console.log(randomBeer)
      res.render('randombeer', {randomBeer});
    })
    .catch(error => {
      console.log(error)
    })
});



app.listen(3000);