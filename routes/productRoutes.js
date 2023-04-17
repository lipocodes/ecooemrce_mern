import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import {createProductController, updateProductController, getProductsController, getSingleProductController,productPhotoController, deleteProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();
router.post('/create-product', requireSignIn,isAdmin, formidable(), createProductController);

router.put('/update-product/:pid', requireSignIn,isAdmin, formidable(), updateProductController);

router.get('/get-products', getProductsController);

router.get('/single-product/:slug', getSingleProductController);

router.get('/product-photo/:pid', productPhotoController);

router.delete('/delete-product/:pid', requireSignIn,isAdmin, formidable(), deleteProductController)

router.post('/product-filter', productFilterController);

router.get('/product-count', productCountController);

router.get('/product-list/:page', productListController);

router.get('/search/:keyword', searchProductController);

router.get('/related-product/:pid/:cid', relatedProductController);

router.get('/product-category/:slug', productCategoryController);

//payment routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn,  brainTreePaymentController);

export default router;