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
exports.test = exports.logout = exports.login = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * POST /login
 * Sign in using username and password.
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = config_1.default.UserList.find(search => search.username === req.body.username);
        if (!user) {
            return res.status(400).json('User not exists');
        }
        if (req.body.password != user.password) {
            return res.status(401).json({});
        }
        console.log(`(${user.username}) has logged in the system`);
        const token = jsonwebtoken_1.default.sign({ username: user.username }, config_1.default.APP_SESSION_SECRET);
        global.TokenBuffer.push({
            token,
            username: user.username,
        });
        res.status(400).json(`Login success. Please embbed the jwt token [bear ${token}] into Authorization header for testing`);
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
/**
 * GET /logout
 * Log out.
 */
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json('Please login');
        }
        const index = global.TokenBuffer.indexOf(req.user);
        global.TokenBuffer.splice(index, 1);
        res.json({});
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
/**
 * GET /test
 * Get back username for testing only
 */
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json();
        }
        res.send(`login username: ${req.user.username}`);
    }
    catch (err) {
        next(err);
    }
});
exports.test = test;
