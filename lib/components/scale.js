// Generated by CoffeeScript 1.6.3
(function() {
  var Component, Matrix4D, Scale, Vector2D,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Matrix4D = require("../math/matrix4d");

  Vector2D = require("../math/vector2d");

  Component = require("./index");

  Scale = (function(_super) {
    __extends(Scale, _super);

    Scale.prototype.from = {
      x: 0.5,
      y: 0.5
    };

    Scale.prototype.to = {
      x: 1,
      y: 1
    };

    function Scale() {
      Scale.__super__.constructor.apply(this, arguments);
      this.fromVector = new Vector2D(this.from.x, this.from.y);
      this.toVector = new Vector2D(this.to.x, this.to.y);
      this.diff = this.toVector.clone().subtract(this.fromVector);
    }

    Scale.prototype.getMatrix = function(x, y) {
      var z;
      z = 1;
      return new Matrix4D([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
    };

    Scale.prototype.getEasedMatrix = function(ratio) {
      var easedRatio, easedVector;
      easedRatio = this.calculateEase(ratio);
      easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
      return this.getMatrix(easedVector.x, easedVector.y);
    };

    return Scale;

  })(Component);

  module.exports = Scale;

}).call(this);
