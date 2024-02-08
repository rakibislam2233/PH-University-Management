import express from  'express';
import { studentController } from './student.controller';

const routes = express.Router();
//create user routes
routes.post('/',studentController.createStudent);
//get all students routes
routes.get('', studentController.getAllStudent)
//get single students routes
routes.get('/:id', studentController.getSingleStudent)
//delte students from db
routes.put('/:id', studentController.deleteStudent)
export const studentRoutes = routes;