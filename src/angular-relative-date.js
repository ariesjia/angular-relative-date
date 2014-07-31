'use strict';

angular.module('quark.relativeDate', [])
    .provider('relativeDateFilter', [function (){

        var self = this;
        
		self.conversions = {
        	now: 1,
			second: 1000,
			minute: 60,
			hour: 60,
			day: 24
        };

        self.labelText = {
			
            now: "now",
            before_second: {"one": "%n second ago", "more": "%n seconds ago"},
            before_minute: {"one": "%n minute ago", "more": "%n minutes ago"},
            before_hour: {"one": "%n hour ago", "more": "%n hours ago"},
            before_day: {"one": "%n day ago", "more": "%n days ago"},

            after_second: {"one": "%n second left", "more": "%n seconds left"},
            after_minute: {"one": "%n minute left", "more": "%n minutes left"},
            after_hour: {"one": "%n hour left", "more": "%n hours left"},
            after_day: {"one": "%n day left", "more": "%n days left"}

        };

        self.datePattern = 'yyyy-MM-dd';

        self.defaultFormat = function (unit_key,delta,relativeTime) {
            return unit_key === 'day' && delta > 0;
        };

        var getText = function (key) {
                var labelKey = key;
                return self.labelText[labelKey];
            },
            localize = function (delta, unit_key) {

                if (unit_key !== 'now') {
                    var prefix = 'before_';
                    if (delta < 0) {
                        prefix = 'after_';
                    }
                    unit_key = prefix + unit_key;
                }

                var label = getText(unit_key),
                    unit = angular.isString(label) ? label : ( delta == 1 ? label.one : label.more );

                return unit.replace('%n', Math.abs(delta));
            };

        this.$get = ['dateFilter',function(dateFilter){
            return function (date) {
                var now = new Date(),
                    relativeTime = new Date(date),
                    delta = now - relativeTime,
                    unit_key = 'now',
                    key;

                var conversions = self.conversions;

                for (key in  conversions) {
                    if (Math.abs(delta) < conversions[key]) {
                        break;
                    }
                    unit_key = key;
                    delta = delta / conversions[key];
                }

                if( self.defaultFormat(unit_key,delta,relativeTime) ){
                    return dateFilter(relativeTime,self.datePattern);
                }

                return localize(Math.floor(delta), unit_key);
            }
        }];


    }]);

