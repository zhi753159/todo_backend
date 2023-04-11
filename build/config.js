"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO consider replace dotenv with pure json file
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
if (!fs_1.default.existsSync('.env')) {
    console.error('No .env file exist!');
    process.exit(1);
}
dotenv_1.default.config({ path: '.env' });
function convertType(variable) {
    if (variable.match(/(true|false)/)) {
        return variable === 'true';
    }
    if (variable.match(/\d*/)) {
        const value = parseInt(variable, 10);
        return Number.isNaN(value) ? variable : value;
    }
    if (variable.match(/\d*.\d+/)) {
        const value = parseFloat(variable);
        return Number.isNaN(value) ? variable : value;
    }
}
if (!process.env.APP_SESSION_SECRET) {
    process.exit(1);
}
exports.default = {
    ENVIRONMENT: process.env.NODE_ENV,
    APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
    APP_PORT: convertType(process.env.APP_PORT || '3000'),
    APP_SALT_ROUND: convertType(process.env.APP_SALT_ROUND || '12'),
    APP_URL_PREFIX: process.env.APP_URL_PREFIX || '/',
    CORS_OPTIONS: {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
        ],
    },
    UserList: [
        { username: 'usera', password: '123456' },
        { username: 'userb', password: '123456' },
    ],
};
