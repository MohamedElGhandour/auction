"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const databaseName = process.env.DATABASE_NAME;
const connectionURL = `${process.env.MONGODB_URL}${databaseName}`;
(0, mongoose_1.connect)(connectionURL);
