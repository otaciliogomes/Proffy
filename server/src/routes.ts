import express from 'express';
import ClassesController from './controllers/ClassesController';
import Connections from './controllers/ConnectionsControllers';


const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new Connections();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);


routes.get('/connectios', connectionsController.index);
routes.post('/connectios', connectionsController.create);

export default routes;