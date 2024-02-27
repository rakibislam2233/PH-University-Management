import express from  'express';
import { studentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const routes = express.Router();
//get all students routes
routes.get('', studentController.getAllStudent)
//get single students routes
routes.get('/:id', studentController.getSingleStudent)
//delte students from db
routes.put('/:id', studentController.deleteStudent);
routes.patch('/:id', validateRequest(updateStudentValidationSchema) ,studentController.updateStudent)
export const studentRoutes = routes;