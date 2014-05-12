'use strict';

angular.module('myApp')
    .controller('MainCtrl', ["$scope", function ($scope) {

        $scope.testDate = new Date();
        $scope.testDate1 = new Date() - 2124;
        $scope.testDate2 = new Date() - 289733;
        $scope.testDate3 = new Date() - 872374;
        $scope.testDate4 = new Date() - 9333333;
        $scope.testDate5 = new Date() - 847484040;


    }]);
