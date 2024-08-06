"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var db_1 = __importDefault(require("./config/db"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var routers_1 = __importDefault(require("./routers"));
// For env File
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
// Connect to db
(0, db_1.default)();
// Use cookie
app.use((0, cookie_parser_1.default)());
// Use bodyParser
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Cors
app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
// Middleware handler public error
// Use route
(0, routers_1.default)(app);
app.use(function (error, req, res, next) {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});
app.get("/", function (req, res) {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(port, function () {
    console.log("Server is Fire at http://localhost:".concat(port));
});
