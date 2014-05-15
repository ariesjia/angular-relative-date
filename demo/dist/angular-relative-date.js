/**
 * angular-relative-date
 * @version v0.0.2 - 2014-05-15
 * @link https://github.com/ariesjia/angular-relative-date
 * @author Chenjia <ariesjia00@hotmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('quark.relativeDate', []).provider('relativeDateFilter', [function () {
    var self = this, CONVERSIONS = {
        now: 1,
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24
      };
    self.labelText = {
      now: 'now',
      before_second: '%n second ago',
      before_minute: '%n mintue ago',
      before_hour: '%n hour ago',
      before_day: '%n day ago',
      after_second: '%n second left',
      after_minute: '%n mintue left',
      after_hour: '%n hour left',
      after_day: '%n day left'
    };
    self.dateFormat = 'yyyy-MM-dd';
    var getText = function (key) {
        var labelKey = key;
        if (key === 'before_now' || key === 'after_now') {
          labelKey = 'now';
        }
        return self.labelText[labelKey];
      }, localize = function (delta, unit_key) {
        var prefix = 'before_';
        if (delta < 0) {
          prefix = 'after_';
        }
        var unit = getText(prefix + unit_key);
        return unit.replace('%n', Math.abs(delta));
      };
    this.$get = [
      '$filter',
      function ($filter) {
        return function (date) {
          var now = new Date(), relativeTime = new Date(date), delta = now - relativeTime, unit_key = 'now', key;
          for (key in CONVERSIONS) {
            if (Math.abs(delta) < CONVERSIONS[key]) {
              break;
            }
            unit_key = key;
            delta = delta / CONVERSIONS[key];
          }
          if (unit_key === 'day' && delta > 0) {
            return $filter('date')(relativeTime, self.dateFormat);
          }
          return localize(Math.floor(delta), unit_key);
        };
      }
    ];
  }]);