(function () {
	'use strict';
    
	angular.module('App').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/");

		$stateProvider
			.state("Master", {
				url: "/Master",
				views: {
					'': {
						templateUrl: "App/Modules/Layout/Master/Master.html",
						controller: "Master",
						data: { pageTitle: '', pageSubTitle: '' }
					},
					'Header@Master': {
						templateUrl: 'App/Modules/Layout/Header/Header.html',
						controller: 'Header'
					}
				}
			})

			.state("Login", {
				url: "^/Login",
				templateUrl: "App/Modules/Login/Login.html",
				controller: "Login"
			})


			
	}]);
})();