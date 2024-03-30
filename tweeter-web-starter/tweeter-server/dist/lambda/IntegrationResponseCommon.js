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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BAD_REQUEST = exports.performErrorReportingOperation = void 0;
let performErrorReportingOperation = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield operation();
    }
    catch (error) {
        throw new Error(`[Internal Server Error]: ${error}`);
    }
});
exports.performErrorReportingOperation = performErrorReportingOperation;
exports.BAD_REQUEST = "[Bad Request]: ";
