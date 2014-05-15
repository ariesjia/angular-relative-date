'use strict';

angular.module('myApp', ['ngRoute', 'quark.relativeDate'])
    .config(["$routeProvider","relativeDateFilterProvider",
        function ($routeProvider , relativeDateFilterProvider) {

        // zh-cn
        relativeDateFilterProvider.labelText = {
            now: "现在",
            before_second: "%n秒钟前",
            before_minute: "%n分钟前",
            before_hour: "%n小时前",
            before_day: "%n天前",

            after_second: "还剩%n秒钟",
            after_minute: "还剩%n分钟",
            after_hour: "还剩%n小时",
            after_day: "还剩%n天"
        };

    }]);