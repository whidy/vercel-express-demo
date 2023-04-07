import mongoose from "mongoose";
import { dbConfig } from "../../config/db.config.js";
import { Model } from "./tutorial.model.js";
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = Model(mongoose);

export default db;
