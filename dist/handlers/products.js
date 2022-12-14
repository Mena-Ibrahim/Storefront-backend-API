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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_1 = require("../models/products");
var Authorization_1 = require("../middleware/Authorization");
var store = new products_1.ProductStore();
// get all products
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                products = _a.sent();
                res.status(302);
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//get specific product by id
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.show(id)];
            case 2:
                product = _a.sent();
                res.status(302);
                res.json(product);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//create new product, takes name and price from body
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, newProduct, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = {
                    name: req.body.name,
                    price: req.body.price
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(product)];
            case 2:
                newProduct = _a.sent();
                res.status(201);
                res.json(newProduct);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//update a product by id, takes new product details (name, price) from body
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, updatedProduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                product = {
                    name: req.body.name,
                    price: req.body.price
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(id, product)];
            case 2:
                updatedProduct = _a.sent();
                res.status(200);
                res.json(updatedProduct);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//delete a product by id
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.delete(id)];
            case 2:
                deletedProduct = _a.sent();
                res.status(200);
                res.json(deletedProduct);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(400);
                res.json(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//RESTful routes for products management
var products_routes = function (app) {
    app.get('/products', index); //get all products
    app.get('/products/:id', show); //get a speicifc product by id
    //only admin can manage products, therefore a token with a user role as admin is required:
    app.post('/products', Authorization_1.verifyAdminToken, create); //create new product 
    app.patch('/products/:id', Authorization_1.verifyAdminToken, update); //update a product
    app.delete('/products/:id', Authorization_1.verifyAdminToken, destroy); //delete a product
};
exports.default = products_routes;
