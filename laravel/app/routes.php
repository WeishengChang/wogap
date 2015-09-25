<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});
//Route::any('player/show', ['uses'=>'PlayerController@show']);
//Route::post('player/show', ['uses' => 'PlayerController@show']);

Route::group(['prefix' => 'player'], function() {
	Route::post('show', ['uses' => 'playerController@show']);
	Route::post('add', ['uses' => 'playerController@add']);
	Route::post('edit', ['uses' => 'playerController@edit']);
	Route::post('del/{id}', ['uses' => 'playerController@del']);
	Route::group(['prefix' => 'item'], function() {
		Route::post('show', ['uses' => 'playerItemController@show']);
		Route::post('edit', ['uses' => 'playerItemController@edit']);
	});
	Route::group(['prefix' => 'equipment'], function() {
		Route::post('show', ['uses' => 'playerEquipmentController@show']);
		Route::post('edit', ['uses' => 'playerEquipmentController@edit']);
	});
	Route::group(['prefix' => 'depot'], function() {
		Route::post('show', ['uses' => 'playerDepotController@show']);
		Route::post('edit', ['uses' => 'playerDepotController@edit']);
	});
	Route::group(['prefix' => 'exchange'], function() {
		Route::post('show', ['uses' => 'playerExchangeController@show']);
		Route::post('add', ['uses' => 'playerExchangeController@add']);
		Route::post('edit', ['uses' => 'playerExchangeController@edit']);
		Route::post('del/{id}', ['uses' => 'playerExchangeController@del']);
	});
	Route::group(['prefix' => 'chexp'], function() {
		Route::post('show', ['uses' => 'playerChexpController@show']);
		Route::post('edit', ['uses' => 'playerChexpController@edit']);
	});
});