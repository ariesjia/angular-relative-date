'use strict';

angular.module('myApp')
    .controller('MainCtrl', ["$scope", function ($scope) {

        $scope.testDate = new Date();

        $scope.testDate1 = new Date() - 2124;
        $scope.testDate2 = new Date() - 289733;
        $scope.testDate3 = new Date() - 872374;
        $scope.testDate4 = new Date() - 9333333;
        $scope.testDate5 = new Date() - 847484040;

        $scope.testDate6 = new Date().getTime() + 3000;
        $scope.testDate7 = new Date().getTime() + 848300;
        $scope.testDate8 = new Date().getTime() + 12228300;
        $scope.testDate9 = new Date().getTime() + 1292228300;


    }]);
