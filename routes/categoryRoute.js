import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";

const router = express.Router();

//create a new category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update a category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get all categories
router.get('/get-category', categoryController);

//get single category
router.get('/single-category/:slug', singleCategoryController);

//delete a category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;