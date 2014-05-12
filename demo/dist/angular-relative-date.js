/**
 * angular-relative-date
 * @version v0.0.1 - 2014-05-12
 * @link https://github.com/ariesjia/angular-relative-date
 * @author Chenjia <ariesjia00@hotmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('quark.relativeDate', []).filter('relativeDate', [
  '$filter',
  function ($filter) {
    var CONVERSIONS = {
        now: 1,
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24
      }, labelText = {
        now: '\u73b0\u5728',
        before_second: '%n\u79d2\u949f\u524d',
        before_minute: '%n\u5206\u949f\u524d',
        before_hour: '%n\u5c0f\u65f6\u524d',
        before_day: '%n\u5929\u524d',
        after_second: '\u8fd8\u5269%n\u79d2\u949f',
        after_minute: '\u8fd8\u5269%n\u5206\u949f',
        after_hour: '\u8fd8\u5269%n\u5c0f\u65f6',
        after_day: '\u8fd8\u5269%n\u5929'
      };
    var getText = function (key) {
        var labelKey = key;
        if (key === 'before_now' || key === 'after_now') {
          key = 'now';
        }
        return labelText[key];
      }, localize = function (delta, unit_key) {
        var prefix = 'before_';
        if (delta < 0) {
          prefix = 'after_';
        }
        var unit = getText(prefix + unit_key);
        return unit.replace('%n', Math.abs(delta));
      };
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
        return $filter('date')(relativeTime, 'yyyy-MM-dd');
      }
      return localize(Math.floor(delta), unit_key);
    };
  }
]);