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
exports.execute = exports.name = void 0;
const collector_1 = __importDefault(require("../../databases/All/collector"));
const name = 'ready';
exports.name = name;
const execute = function (client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        client.setTemp(yield collector_1.default());
        console.log(`以 ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} 身分登入\n服務總共 ${client.guilds.cache.size} 個伺服器、${client.users.cache.size} 位使用者`);
    });
};
exports.execute = execute;
