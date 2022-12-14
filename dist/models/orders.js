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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
//METHODS
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    //get the total price of an order by order id and user id
    OrderStore.prototype.getOrderTotalPrice = function (order_id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT SUM(products.price * orders_details.quantity) as \"total_price\"\n            FROM orders INNER JOIN orders_details INNER JOIN products \n            ON  orders_details.product_id = products.id\n            ON  orders.id = orders_details.order_id\n            WHERE orders.id = $1 and orders.user_id = $2";
                        return [4 /*yield*/, conn.query(sql, [order_id, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Can't get products ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get the list of items(product name, price, quantity) in an order by order_id (whether active or complete) and user id.
    OrderStore.prototype.getOrderProducts = function (order_id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT products.name, products.price, orders_details.quantity\n            FROM orders INNER JOIN orders_details INNER JOIN products \n            ON  orders_details.product_id = products.id\n            ON  orders.id = orders_details.order_id\n            WHERE orders.id = $1 and orders.user_id = $2";
                        return [4 /*yield*/, conn.query(sql, [order_id, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Can't get products ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get all orders (without details) and specify what orders to show (active or complete)
    OrderStore.prototype.getOrders = function (user_id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders where status = $1 and user_id = $2";
                        return [4 /*yield*/, conn.query(sql, [status, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Can't get orders ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //adds a product to as specific order
    OrderStore.prototype.addProduct = function (user_id, op) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlOrder, resultOrder, order, error_4, conn, sqlAddProduct, resultAddProduct, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlOrder = "SELECT * FROM orders WHERE id = $1 and user_id = $2";
                        return [4 /*yield*/, conn.query(sqlOrder, [op.order_id, user_id])];
                    case 2:
                        resultOrder = _a.sent();
                        order = resultOrder.rows[0];
                        if (order.status == 'complete') {
                            throw new Error("can not insert product in a completed order.");
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Can't find order ".concat(error_4));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 5:
                        conn = _a.sent();
                        sqlAddProduct = "INSERT INTO orders_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, conn.query(sqlAddProduct, [op.order_id, op.product_id, op.quantity])];
                    case 6:
                        resultAddProduct = _a.sent();
                        conn.release();
                        return [2 /*return*/, resultAddProduct.rows[0]];
                    case 7:
                        error_5 = _a.sent();
                        throw new Error("Can't add product to order ".concat(error_5));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //create order
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.status])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Can't add product ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //delete order by id (user_id is used so that users can delete their own orders only)
    OrderStore.prototype.delete = function (order_id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM orders WHERE id= $1 and user_id = $2 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [user_id, order_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_7 = _a.sent();
                        throw new Error("Can't delete product ".concat(error_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //set status of order, takes id and new status (should be active or complete to match enum type in db)
    OrderStore.prototype.setStatus = function (order_id, user_id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE orders SET status = $1 WHERE id = $2 and user_id = $3 RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [status, order_id, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_8 = _a.sent();
                        throw new Error("Can't update product ".concat(error_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
