const App = require('./app/App');
const app = new App();

app.listen(9000, () => {
  console.log('Server running at http://127.0.0.1:9000');
});