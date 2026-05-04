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
const prisma_1 = __importDefault(require("./src/shared/prisma"));
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notice = yield prisma_1.default.notice.create({
                data: {
                    title: 'Test Notice',
                    pdfUrl: 'https://example.com/test.pdf',
                    slug: 'test-notice-' + Date.now(),
                    publishDate: new Date(),
                },
            });
            console.log('Created notice:', notice);
            const notices = yield prisma_1.default.notice.findMany();
            console.log('All notices:', notices);
        }
        catch (error) {
            console.error('Prisma test error:', error);
        }
        finally {
            process.exit();
        }
    });
}
test();
