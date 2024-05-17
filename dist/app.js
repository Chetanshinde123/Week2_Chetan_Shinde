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
const express_1 = __importDefault(require("express"));
const arrayExercises_1 = require("./arrayExercises");
const service_1 = require("./service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Ensure table exists
(0, service_1.checkAndCreateTable)();
// POST API to process and store orders
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = req.body.items || (req.body.data && req.body.data.items);
    if (!items || !Array.isArray(items)) {
        return res.status(400).send('Invalid payload');
    }
    // Filter orders where any OrderBlock's lineNo is divisible by 3
    // Filter orders where any OrderBlock's lineNo array contains a number divisible by 3
    const filteredOrders = items.filter(item => item.OrderBlocks.some((block) => Array.isArray(block.lineNo)
        ? block.lineNo.some((line) => line % 3 === 0)
        : block.lineNo % 3 === 0));
    try {
        // Store orderIDs in PostgreSQL database
        for (const order of filteredOrders) {
            yield (0, service_1.createOrder)(order.orderID);
        }
        res.send('Orders processed and stored successfully');
    }
    catch (err) {
        res.status(500).send('Error processing orders');
    }
}));
app.get('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, service_1.getOrders)();
    res.json(orders);
    console.log(orders);
}));
// Array Exercises Route
app.get('/students/passed', (req, res) => {
    res.json((0, arrayExercises_1.filterPassedStudents)(arrayExercises_1.students));
    console.log((0, arrayExercises_1.filterPassedStudents)(arrayExercises_1.students));
});
app.get('/students/names', (req, res) => {
    res.json((0, arrayExercises_1.getStudentNames)(arrayExercises_1.students));
    console.log((0, arrayExercises_1.getStudentNames)(arrayExercises_1.students));
});
app.get('/students/sorted', (req, res) => {
    res.json((0, arrayExercises_1.sortStudentsByGrade)(arrayExercises_1.students));
    console.log((0, arrayExercises_1.sortStudentsByGrade)(arrayExercises_1.students));
});
app.get('/students/average-age', (req, res) => {
    res.json((0, arrayExercises_1.getAverageAge)(arrayExercises_1.students));
    console.log((0, arrayExercises_1.getAverageAge)(arrayExercises_1.students));
});
// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
