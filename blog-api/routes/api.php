<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostIndexController;
use App\Http\Controllers\PostShowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);

Route::get('/posts', PostIndexController::class);
Route::get('/posts/{post:slug}', PostShowController::class);

Route::get('/admin/posts', \App\Http\Controllers\Admin\PostIndexController::class);
Route::post('/admin/posts', \App\Http\Controllers\Admin\PostStoreController::class);
Route::get('/admin/posts/{post:slug}/edit', \App\Http\Controllers\Admin\PostEditController::class);
