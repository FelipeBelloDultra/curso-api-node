const { Router } = require('express');

const authHeader = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const TaskController = require('./app/controllers/TaskController');

const routes = Router();

// POST
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rotas abaixo desse middlewares precisam do token
routes.use(authHeader);
routes.put('/user', UserController.update);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/task/:taskId', TaskController.update);
routes.delete('/task/:taskId', TaskController.delete);

module.exports = routes;
