(function () {
    'use strict';

    angular.module('App').controller('DepartmentAddEdit', DepartmentAddEdit);
    DepartmentAddEdit.$inject = [
		'$scope', '$uibModalInstance',
		'DepartmentRepository', 'Department', 'IsEditMode'
    ];

    function DepartmentAddEdit($scope, $uibModalInstance, departmentRepository, department, isEditMode) {
        $scope.Department =
            {
            Name: '',
            IsParent:''
            }
        $scope.Department = department;
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {
            if ($scope.frm.$valid) {

                var afterSavedDepartment = function ()
                {
                    $uibModalInstance.close($scope.Department);
                    alert('العملية حٌفظت بنجاح');
                }

                var newDepartment = function ()
                {
                    return departmentRepository.SaveNewDepartment($scope.Department).then(function () {
                        afterSavedDepartment();
                    });
                }

                var existDepartment = function () {
                  

                    return departmentRepository.SaveUpdatedDepartment($scope.Department).then(function (result) {
                        afterSavedDepartment();
                    });
                }
                return isEditMode ? existDepartment() : newDepartment();

            } else {
                alert('يجب ادخال البيانات بطريقة صحيحة');
            }
        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();