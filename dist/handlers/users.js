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
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Authorization_1 = require("../middleware/Authorization");
var store = new users_1.UserStore();
//get all users
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.status(302); //found
                res.json(users);
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
//get a specific user by id
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.show(id)];
            case 2:
                user = _a.sent();
                res.status(302);
                res.json(user);
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
//create a new user
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'user' //role is user by default and can only be changed to admin from db
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ id: newUser.id, username: newUser.firstname + ' ' + newUser.lastname, email: newUser.email, role: user.role }, process.env.TOKEN_SECRET);
                res.status(201);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//update a user by id and new user information
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, updatedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'user' //role can't be changed from here, has to be from db
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(id, user)];
            case 2:
                updatedUser = _a.sent();
                res.status(200);
                res.json(updatedUser);
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
//delete a user by id
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.delete(id)];
            case 2:
                deletedUser = _a.sent();
                res.status(200);
                res.json(deletedUser);
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
//authenticate user by email and password
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, authenticated, token, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.authenticate(email, password)];
            case 2:
                authenticated = _a.sent();
                if (authenticated != null) // user exists
                 {
                    token = jsonwebtoken_1.default.sign({ id: authenticated.id, username: authenticated.firstname + ' ' + authenticated.lastname, email: authenticated.email, role: authenticated.role }, process.env.TOKEN_SECRET);
                    res.status(302);
                    res.json(token);
                }
                else {
                    res.status(404);
                    res.send("Incorrect email or password");
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(400);
                res.json(error_6 + email);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//RESTful routes for users management
var users_routes = function (app) {
    //show and index require admin privellege, because only adming can see user details.
    app.get('/users', Authorization_1.verifyAdminToken, index); //get all users
    app.get('/users/:id', Authorization_1.verifyAdminToken, show); //get a specific user
    app.post('/users', create); //create a new user
    app.post('/users/authenticate', authenticate); //authenticate user by email and password
    //update and delete require the id in params to be the same one to be updated/deleted, because users can only manage their own data.
    app.patch('/users/:id', Authorization_1.verifyOwnIDToken, update); //update account by id and new account information
    app.delete('/users/:id', Authorization_1.verifyOwnIDToken, destroy); //delete account by id
};
exports.default = users_routes;
