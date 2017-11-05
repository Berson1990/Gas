(function () {
	'use strict';

	angular.module('App').controller('AppController', AppController);
	AppController.$inject = [
		'$rootScope', '$scope', '$translate'
	];

	function AppController($rootScope, $scope, $translate) {

		$rootScope.CurrentUser = null;

		$rootScope.ChangeLanguage = function (lang) {
			$translate.use(lang);
		};

		$rootScope.Languages = [
			{ Lang: 'ar', Dir: 'rtl', CssClass: 'egypt-flag', Title: 'عربى' },
			{ Lang: 'en', Dir: 'ltr', CssClass: 'usa-flag', Title: 'English' }
		];

		$rootScope.$on('$translateChangeSuccess', function (event, data) {

			var language = data.language;
			$rootScope.lang = language;

			$rootScope.dir = (_.find($rootScope.Languages, function (row) {
				return (row.Lang === data.language);
			})).Dir;

			switch (data.language) {
				case 'ar':
					$('#siteCss').attr("href", "Static/Assets/css/Site-rtl.css");
					$('#bootstrapCss').attr("href", "Static/Vendors/bootstrap-3.3.4/css/bootstrap-rtl.min.css");
					$('#dataTablesCss').attr("href", "Static/Assets/css/dataTables.bootstrap-rtl.css");
					break;
				case 'en':
					$('#siteCss').attr("href", "Static/Assets/css/Site-ltr.css");
					$('#bootstrapCss').attr("href", "Static/Vendors/bootstrap-3.3.4/css/bootstrap.min.css");
					$('#dataTablesCss').attr("href", "Static/Vendors/DataTables-1.10.11/media/css/dataTables.bootstrap.min.css");
					break;
			}
		});
	};
})();