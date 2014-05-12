'use strict';

angular.module('quark.relativeDate',[])
    .filter('relativeDate', ['$filter' , function ($filter){

        var CONVERSIONS = {
            now: 1,
            second: 1000,
            minute: 60,
            hour:   60,
            day : 24
        },labelText = {
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

        var getText = function(key){
                var labelKey = key;
                if(key === 'before_now' || key === 'after_now'){
                    key  = 'now';
                }
                return labelText[key];
            },
            localize = function(delta, unit_key){

                var prefix = 'before_';

                if( delta  < 0 ){
                    prefix = 'after_';
                }

                var unit = getText(prefix+unit_key);

                return unit.replace('%n', Math.abs(delta) );
            };


        return function(date){

            var now = new Date(),
                relativeTime = new Date(date),
                delta = now - relativeTime,
                unit_key = 'now',
                key;

            for (key in CONVERSIONS) {
                if (Math.abs(delta) < CONVERSIONS[key]){
                    break;
                }
                unit_key = key;
                delta = delta / CONVERSIONS[key];
            }

            if (unit_key === 'day' && delta > 0 ) {
                return $filter('date')(relativeTime,'yyyy-MM-dd');
            }

            return localize(Math.floor(delta), unit_key);

        }

    }]);

