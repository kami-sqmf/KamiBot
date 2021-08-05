"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clinet_1 = require("./client/Clinet");
const secert_1 = __importDefault(require("./client/Config/secert"));
const discord = new Clinet_1.client();
discord.setSecret(secert_1.default);
discord.start();
