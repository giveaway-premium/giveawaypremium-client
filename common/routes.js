const routes = require('next-routes')

module.exports = routes()
  // pages route
  .add('/transaction/start', 'Screen/Transaction/start')
  .add('/transaction/succeeded', 'Screen/Transaction/succeeded')

  .add('/kygui', 'Screen/Consignment')
  .add('/gioithieu', 'Screen/AboutUs')
  .add('/muasam', 'Screen/Store')
  // main routes
  .add('/', 'Screen/HomeScreen')
  .add('/admin', 'Screen/DashBoard')
  .add('/monitor', 'Screen/Monitor')
  .add('/error', 'pages/_error')
