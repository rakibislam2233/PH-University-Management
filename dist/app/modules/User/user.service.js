"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemister_model_1 = require("../AcademicSemister/academicSemister.model");
const student_model_1 = require("../Student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../middleware/AppError"));
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.password = password || config_1.default.default_password;
    userData.role = 'student';
    const admisstionSemister = yield academicSemister_model_1.AcademicSemister.findById(payload.admissionSemister);
    if (!admisstionSemister) {
        throw new Error('Admission semester not found');
    }
    userData.id = yield (0, user_utils_1.genaretedId)(admisstionSemister);
    //create session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create user
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(404, 'Failed to create user');
        }
        payload.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        payload.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(404, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(404, `${error}`);
    }
});
exports.userService = { createStudentIntoDB };
