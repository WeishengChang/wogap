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
	
	Route::group(['prefix' => 'skill'], function() {
		
		Route::post('show', ['uses' => 'playerSkillController@show']);
		Route::post('edit', ['uses' => 'playerSkillController@edit']);
		Route::group(['prefix' => 'setup'], function() {
			Route::post('show', ['uses' => 'playerSkillSetupController@show']);
			Route::post('edit', ['uses' => 'playerSkillSetupController@edit']);
		});
	});
	Route::group(['prefix' => 'mission'], function() {
		Route::post('show', ['uses' => 'playerMissionController@show']);
		Route::post('edit', ['uses' => 'playerMissionController@edit']);
	});
	Route::group(['prefix' => 'pet'], function() {
		Route::post('show', ['uses' => 'playerPetController@show']);
		Route::post('add', ['uses' => 'playerPetController@add']);
		Route::post('edit', ['uses' => 'playerPetController@edit']);
		Route::post('del/{id}', ['uses' => 'playerPetController@del']);
	});
	Route::group(['prefix' => 'mercenary'], function() {
		Route::post('show', ['uses' => 'playerMercenaryController@show']);
		Route::post('add', ['uses' => 'playerMercenaryController@add']);
		Route::post('edit', ['uses' => 'playerMercenaryController@edit']);
		Route::post('del/{id}', ['uses' => 'playerMercenaryController@del']);
	});
	Route::group(['prefix' => 'buff'], function() {
		Route::post('show', ['uses' => 'playerBuffController@show']);
		Route::post('add', ['uses' => 'playerBuffController@add']);
		Route::post('edit', ['uses' => 'playerBuffController@edit']);
		Route::post('del/{id}', ['uses' => 'playerBuffController@del']);
	});
	Route::group(['prefix' => 'message'], function() {
		Route::post('show', ['uses' => 'playerMessageController@show']);
		Route::post('add', ['uses' => 'playerMessageController@add']);
		Route::post('edit', ['uses' => 'playerMessageController@edit']);
		Route::post('del/{id}', ['uses' => 'playerMessageController@del']);
	});
	Route::group(['prefix' => 'log'], function() {
		Route::post('show', ['uses' => 'playerLogController@show']);
		Route::post('add', ['uses' => 'playerLogController@add']);
		Route::post('edit', ['uses' => 'playerLogController@edit']);
		Route::post('del/{id}', ['uses' => 'playerLogController@del']);
	});
	Route::group(['prefix' => 'mail'], function() {
		Route::post('show', ['uses' => 'playerMailController@show']);
		Route::post('add', ['uses' => 'playerMailController@add']);
		Route::post('edit', ['uses' => 'playerMailController@edit']);
		Route::post('del/{id}', ['uses' => 'playerMailController@del']);
	});
	Route::group(['prefix' => 'friend'], function() {
		Route::post('show', ['uses' => 'playerFriendController@show']);
		Route::post('add', ['uses' => 'playerFriendController@add']);
		Route::post('edit', ['uses' => 'playerFriendController@edit']);
		Route::post('del/{id}', ['uses' => 'playerFriendController@del']);
	});
});