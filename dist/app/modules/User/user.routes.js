"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const student_validation_1 = require("../Student/student.validation");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to rakib',
    });
});
router.post('/create-student', (0, validateRequest_1.default)(student_validation_1.createStudentValidationSchema), user_controller_1.userController.createStudent);
exports.userRoutes = router;
