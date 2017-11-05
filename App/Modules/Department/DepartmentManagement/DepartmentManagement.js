(function () {
    'use strict';

    angular.module('App').controller('DepartmentManagement', DepartmentManagement);
    DepartmentManagement.$inject = [
		'$scope', '$uibModal',
		'alertify',
		'DTOptionsBuilder', 'DTColumnDefBuilder',
		'DepartmentRepository', 'Department'
    ];

    function DepartmentManagement($scope, $uibModal, alertify, dtOptionsBuilder, dtColumnDefBuilder, departmentRepository, department) {

   
        $scope.Department = department;
         console.log(department)
        $scope.dtOptions = dtOptionsBuilder.newOptions()
			.withOption('order', [1, 'asc'])
			.withBootstrap()
			.withPaginationType('full_numbers')
			.withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
			.withDOM(
					"<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>>" +
					"t" +
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");

        $scope.dtColumnDefs = [
			dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];

        $scope.Search = function () {
            $scope.Department = _.filter(department, function (item) {
                return (item.Name.toLowerCase().indexOf(department.Name.toLowerCase()) > -1)
					   
            });

            
        };

        $scope.Reset = function () {
            $scope.Department =department
              
                  
            //$scope.Search();
        }

        $scope.DepartmentAddEdit = function (department, isEditMode) {
            var DepartmentEdit = angular.extend({}, department);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Department/DepartmentAddEdit/DepartmentAddEdit.html',
                controller: 'DepartmentAddEdit',
                size: 'lg',
                resolve: {
                    Department: function () {
                        return DepartmentEdit;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (savedDepartment) {
                if (isEditMode) {
                    var DepartmentIds = _.pluck(department, 'ID');
                    var departmentIndex = _.indexOf(DepartmentIds, savedDepartment.ID);
                    $scope.Department[departmentIndex] = savedDepartment;
                }
                else {
                    $scope.Department.push(savedDepartment);
                }
                console.log(savedDepartment);
            });
        }

        $scope.DepartmentDelete = function (department) {
            alertify.logPosition("top left");
            alertify.confirm(
				'هل انت متاكد من حذف هذه الشهادة؟',
				function () {
				    departmentRepository.DeleteDepartment(department.DepartmentID).then(function (result) {
				        if (result.data) {
				            $scope.Department.splice($scope.Department.indexOf(department), 1);
				            alertify.success('البيانات حذفت بنجاح');
				            //alert('Data Deleted successfully');
				        } else {
				            //disabled if it in procedure
				            alertify.error('العملية التى تريد الغاءها مرتبطة بالعمليات');
				        }
				    });
				}, function () {
				    alertify.log('.تم الغاء العملية');
				});
        }
    }
})();