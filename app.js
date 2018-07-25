/**
 * Created by aydin on 01.10.2017.
 */
var app1 = angular.module("breakdown_script",["ngRoute","ngSanitize","ngAnimate"]);

var date = new Date();

var categoryName = "category";
var assetName = "asset";
var deleteName = "delete"

app1.config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
        template:""
    })
/*        .when("/:catId",{
                templateUrl:"cat_detail.html",
                controller:"ListDetailController"
	})*/
		.when("/"+categoryName+"/:catId/"+assetName+"/:assetId",{
				templateUrl:"asset.html",
				controller:"AssetController"
    })



});