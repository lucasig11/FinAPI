import "reflect-metadata";
import express from "express";

import "@shared/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());

app.listen(3333, () => console.log("server started"));
