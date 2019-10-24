const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('organizations/item', '/organizations/:organizationId');
routes.add('users/item', '/users/:id');