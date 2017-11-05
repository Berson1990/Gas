(function () {
	'use strict';
     
	angular.module('Data', []);
     angular.module('Data', []).factory('Port',function(){
		 return{
			 port:8080
		 }
	 });
	angular.module("App", [
	   'ui.router',
	   , 'ui.bootstrap'
       , 'ngSanitize'
        , 'Data'
	   , 'ngAnimate'
	   , 'ui.select'
	   , 'datatables'
	   , 'datatables.bootstrap'
	   , 'blockUI'
	   , 'ngAlertify'
	   , 'ngCookies'
	   , 'pascalprecht.translate'
        , 'angularFileUpload'
        , 'LocalStorageModule'
        
	]);
    
//     angular.module("App", []).factory('HazMasterReturn',function(){
//		 return{
//             
//			 HazMasterReturn :{}
//		 }
//	 })

	angular.module('App').run(['$rootScope', '$state', '$timeout','localStorageService',
		function ($rootScope, $state, $timeout, localStorageService) {
			$rootScope.$on('$stateChangeStart', function (event) {

			    $timeout(function () {
			   //     console.log(localStorageService.get("LoginData"));

			        if ($rootScope.CurrentUser == undefined) {
			            $rootScope.CurrentUser = localStorageService.get("LoginData");
						event.preventDefault();
						//$state.go('Login');
					}
				});
			});
		}]);
})();