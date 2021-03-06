// Generated by CoffeeScript 1.6.3
(function() {
  var BounceEasing, HardBounceEasing, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BounceEasing = require("./bounce");

  HardBounceEasing = (function(_super) {
    __extends(HardBounceEasing, _super);

    function HardBounceEasing() {
      _ref = HardBounceEasing.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HardBounceEasing.prototype.oscillation = function(t) {
      return Math.abs(Math.cos(this.omega * t));
    };

    return HardBounceEasing;

  })(BounceEasing);

  module.exports = HardBounceEasing;

}).call(this);
