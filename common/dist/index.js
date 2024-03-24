"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Passord is too small").max(15, "Password is too big"),
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Passord is too small").max(15, "Password is too big"),
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(15, "Title is too small").max(60, "Title is too big"),
    content: zod_1.z.string().min(50, "Blog is too small").max(700, "Blog is too big"),
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(15, "Title is too small").max(60, "Title is too big"),
    content: zod_1.z.string().min(50, "Blog is too small").max(700, "Blog is too big"),
    id: zod_1.z.string()
});
