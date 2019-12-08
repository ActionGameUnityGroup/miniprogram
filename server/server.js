const App = require(`${__dirname}/app/app`);
const app = new App();

app.listen(443, () => {
  console.log('Server running at http://127.0.0.1:443');
});