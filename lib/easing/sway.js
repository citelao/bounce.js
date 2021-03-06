// Generated by CoffeeScript 1.6.3
(function() {
  var BounceEasing, SwayEasing, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BounceEasing = require("./bounce");

  SwayEasing = (function(_super) {
    __extends(SwayEasing, _super);

    function SwayEasing() {
      _ref = SwayEasing.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SwayEasing.prototype.calculate = function(ratio) {
      var t;
      if (ratio >= 1) {
        return 0;
      }
      t = ratio * this.limit;
      return this.exponent(t) * this.oscillation(t);
    };

    SwayEasing.prototype.calculateOmega = function(bounces, limit) {
      return this.bounces * Math.PI / this.limit;
    };

    SwayEasing.prototype.oscillation = function(t) {
      return Math.sin(this.omega * t);
    };

    return SwayEasing;

  })(BounceEasing);

  module.exports = SwayEasing;

}).call(this);
