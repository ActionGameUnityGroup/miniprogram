const App = require(`${__dirname}/app/app`);
const app = new App();

app.listen(9001, () => {
  console.log('Server running at http://127.0.0.1:9001');
});