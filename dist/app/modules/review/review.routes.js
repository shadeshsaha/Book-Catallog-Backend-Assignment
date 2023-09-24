"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.customer), review_controller_1.ReviewController.getReviewsFromDB);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.customer), review_controller_1.ReviewController.getSingleReview);
router.post('/create-review', (0, auth_1.default)(client_1.UserRole.customer), review_controller_1.ReviewController.createReview);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.customer, client_1.UserRole.admin), review_controller_1.ReviewController.updateReviewDataToDB);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.customer), review_controller_1.ReviewController.deleteReviewFromDB);
exports.reviewRoutes = router;
