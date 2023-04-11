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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
/**
 * Forbid not locked user to access and modify the operation form
 */
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    // verify request has token
    if (!token) {
        return res.status(401).json({ message: 'Invalid token ' });
    }
    // remove Bearer if using Bearer Authorization mechanism
    if (token.toLowerCase().startsWith('bearer')) {
        token = token.slice('bearer'.length).trim();
    }
    jsonwebtoken_1.default.verify(token, config_1.default.APP_SESSION_SECRET, (err, jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.send(401);
        }
        else {
            req.user = global.TokenBuffer.find(search => search.token === token);
            if (!req.user) {
                res.send(401);
            }
            next();
        }
    }));
});
