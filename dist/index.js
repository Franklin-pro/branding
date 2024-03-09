"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../src/documentation/swagger_output.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use("/", index_1.router);
async function startServer() {
    const connect_database_mongoDb = "mongodb+srv://frank:frank@king.dizpopl.mongodb.net/test?retryWrites=true&w=majority&appName=king";
    try {
        mongoose_1.default.connect(connect_database_mongoDb)
            .then(() => {
            app.listen(port);
            console.log(`The application is listening on port ${port}!`);
        });
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map