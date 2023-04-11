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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Local scripts
const config_1 = __importDefault(require("./config"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const routes_1 = __importDefault(require("./routes"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Create Express server
    const app = (0, express_1.default)();
    // Express configuration
    app.set('port', config_1.default.APP_PORT || 3000);
    app.use((0, helmet_1.default)());
    app.use((0, errorhandler_1.default)());
    app.use(body_parser_1.default.json({ limit: '50mb' }));
    app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
    // CORE
    app.use((0, cors_1.default)(config_1.default.CORS_OPTIONS));
    // Route logging
    if (process.env.NODE_ENV !== 'test') {
        app.use((req, res, next) => {
            console.log({
                method: req.method,
                path: req.path,
                params: req.params,
                body: req.body,
            });
            res.on('finish', () => {
                console.log({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                });
            });
            next();
        });
    }
    app.disable('x-powered-by');
    app.use((req, res, next) => {
        res.status(404).json();
    });
    app.use((err, req, res, next) => {
        const errorData = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        };
        res.status(500).json(errorData);
    });
    // Setup routes
    app.use('/', yield (0, routes_1.default)());
    app.listen(app.get('port'), () => {
        console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    });
}))();
