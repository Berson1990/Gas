(function () {
	'use strict';

	angular.module('App').config(["blockUIConfig", function (blockUiConfig) {
		
		blockUiConfig.template = '<div class="spinner-overlay"></div><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>';
		blockUiConfig.delay = 100;
	}]);
    
  

})();