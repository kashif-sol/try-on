<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});


Route::middleware('shopify.auth')->group(function () {
    Route::controller(ProductController::class)->group(function () {
        Route::get('get-products', 'getProducts');
        Route::post('save-products', 'saveProducts');
    });
    
    Route::controller(PlanController::class)->group(function () {
        Route::get('plans', 'getPlans');
        Route::get('subscribe_plan', 'subscribePlan');
    });
});


Route::controller(ProductController::class)->group(function () {
    Route::get('check-product-button/{id}', 'check_product_button');
    Route::post('save-try/{id}', 'save_try');
});

