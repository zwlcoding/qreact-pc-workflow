const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./entry/app.jsx');
require('./css/style.less')

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
