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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config"));
const auth_1 = __importDefault(require("./modules/auth"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const router = express_1.default.Router();
    // Enable pre-flight
    router.options('*', (0, cors_1.default)(config_1.default.CORS_OPTIONS));
    // Routes
    router.get(config_1.default.APP_URL_PREFIX, (req, res) => {
        res.json({ success: true, version: '0.0.1' });
    });
    router.use(config_1.default.APP_URL_PREFIX + 'auth', auth_1.default);
    return router;
});
