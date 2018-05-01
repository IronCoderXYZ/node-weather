const fs = require('fs');
const hbs = require('hbs');
const express = require('express');

const app = express();
app
  .set('view engine', 'hbs')
  .use((req, res, next) => {
    fs.appendFileSync(
      'server.log',
      `${new Date().toString()}: ${req.method} ${req.url}\n`
    );
    next();
  })
  // .use((req, res, next) => {
  //   res.render('maintenance.hbs');
  // })
  .use(express.static(`${__dirname}/public`));

const hbsHelpers = [
  { name: 'getYear', action: () => new Date().getFullYear() },
  { name: 'capitalize', action: text => text.toUpperCase() }
];
hbs.registerPartials(`${__dirname}/views/partials`);
hbsHelpers.forEach(({ name, action }) =>
  hbs.registerHelper(name, () => action())
);

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.listen(process.env.PORT || 3000);
