import { connect } from "mongoose";
const databaseName = process.env.DATABASE_NAME;
const connectionURL = `${process.env.MONGODB_URL}${databaseName}`;
connect(connectionURL);
