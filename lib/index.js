// Generated by CoffeeScript 1.6.3
(function() {
  var Bounce, ComponentClasses, Matrix4D;

  Matrix4D = require("./math/matrix4d");

  ComponentClasses = {
    scale: require("./components/scale"),
    rotate: require("./components/rotate"),
    translate: require("./components/translate"),
    skew: require("./components/skew")
  };

  Bounce = (function() {
    Bounce.FPS = 30;

    Bounce.counter = 1;

    Bounce.prototype.components = null;

    Bounce.prototype.duration = 0;

    function Bounce() {
      this.components = [];
    }

    Bounce.prototype.scale = function(options) {
      return this.addComponent(new ComponentClasses["scale"](options));
    };

    Bounce.prototype.rotate = function(options) {
      return this.addComponent(new ComponentClasses["rotate"](options));
    };

    Bounce.prototype.translate = function(options) {
      return this.addComponent(new ComponentClasses["translate"](options));
    };

    Bounce.prototype.skew = function(options) {
      return this.addComponent(new ComponentClasses["skew"](options));
    };

    Bounce.prototype.addComponent = function(component) {
      this.components.push(component);
      this.updateDuration();
      return this;
    };

    Bounce.prototype.serialize = function() {
      var component, serialized, _i, _len, _ref;
      serialized = [];
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        serialized.push(component.serialize());
      }
      return serialized;
    };

    Bounce.prototype.deserialize = function(serialized) {
      var options, _i, _len;
      for (_i = 0, _len = serialized.length; _i < _len; _i++) {
        options = serialized[_i];
        this.addComponent(new ComponentClasses[options.type](options));
      }
      return this;
    };

    Bounce.prototype.updateDuration = function() {
      return this.duration = this.components.map(function(component) {
        return component.duration + component.delay.reduce(function(a, b) {
          return Math.max(a, b);
        });
      });
    };

    Bounce.prototype.define = function(name) {
      this.name = name || Bounce.generateName();
      this.styleElement = document.createElement("style");
      this.styleElement.innerHTML = this.getKeyframeCSS({
        name: this.name,
        prefix: true
      });
      document.body.appendChild(this.styleElement);
      return this;
    };

    Bounce.prototype.applyTo = function(elements, options) {
      var css, deferred, element, prefix, prefixes, _i, _j, _len, _len1, _ref,
        _this = this;
      if (options == null) {
        options = {};
      }
      this.define();
      if (!elements.length) {
        elements = [elements];
      }
      prefixes = this.getPrefixes();
      deferred = null;
      if (window.jQuery && window.jQuery.Deferred) {
        deferred = new window.jQuery.Deferred();
      }
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        _ref = prefixes.animation;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          prefix = _ref[_j];
          css = [this.name, "" + this.duration + "ms", "linear", "both"];
          if (options.loop) {
            css.push("infinite");
          }
          element.style["" + prefix + "animation"] = css.join(" ");
        }
      }
      if (!options.loop) {
        setTimeout((function() {
          if (options.remove) {
            _this.remove();
          }
          if (typeof options.onComplete === "function") {
            options.onComplete();
          }
          if (deferred) {
            return deferred.resolve();
          }
        }), this.duration);
      }
      return deferred;
    };

    Bounce.prototype.remove = function() {
      var _ref;
      if (!this.styleElement) {
        return;
      }
      if (this.styleElement.remove) {
        return this.styleElement.remove();
      } else {
        return (_ref = this.styleElement.parentNode) != null ? _ref.removeChild(this.styleElement) : void 0;
      }
    };

    Bounce.prototype.getPrefixes = function(force) {
      var prefixes, style;
      prefixes = {
        transform: [""],
        animation: [""]
      };
      style = document.createElement("dummy").style;
      if (force || (!("transform" in style) && "webkitTransform" in style)) {
        prefixes.transform = ["-webkit-", ""];
      }
      if (force || (!("animation" in style) && "webkitAnimation" in style)) {
        prefixes.animation = ["-webkit-", ""];
      }
      return prefixes;
    };

    Bounce.prototype.getKeyframeCSS = function(options) {
      var animations, key, keyframeList, keyframes, matrix, prefix, prefixes, transformString, transforms, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (options == null) {
        options = {};
      }
      this.name = options.name || Bounce.generateName();
      prefixes = {
        transform: [""],
        animation: [""]
      };
      if (options.prefix || options.forcePrefix) {
        prefixes = this.getPrefixes(options.forcePrefix);
      }
      keyframeList = [];
      keyframes = this.getKeyframes(options);
      _ref = this.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        matrix = keyframes[key];
        transformString = "matrix3d" + matrix;
        transforms = [];
        _ref1 = prefixes.transform;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          prefix = _ref1[_j];
          transforms.push("" + prefix + "transform: " + transformString + ";");
        }
        keyframeList.push("" + (Math.round(key * 100 * 100) / 100) + "% { " + (transforms.join(" ")) + " }");
      }
      animations = [];
      _ref2 = prefixes.animation;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        prefix = _ref2[_k];
        animations.push("@" + prefix + "keyframes " + this.name + " { \n  " + (keyframeList.join("\n  ")) + " \n}");
      }
      return animations.join("\n\n");
    };

    Bounce.prototype.getKeyframes = function(options) {
      var component, componentKeys, currentTime, frames, i, key, keyframes, keys, matrix, ratio, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1,
        _this = this;
      if (options == null) {
        options = {};
      }
      keys = [0, 1];
      if (options.optimized) {
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          componentKeys = component.easingObject.findOptimalKeyPoints().map(function(key) {
            return (key * component.duration / _this.duration) + (component.delay / _this.duration);
          });
          if (component.delay) {
            componentKeys.push((component.delay / this.duration) - 0.001);
          }
          keys = keys.concat(componentKeys);
        }
      } else {
        frames = Math.round((this.duration / 1000) * Bounce.FPS);
        for (i = _j = 0; 0 <= frames ? _j <= frames : _j >= frames; i = 0 <= frames ? ++_j : --_j) {
          keys.push(i / frames);
        }
      }
      keys = keys.sort(function(a, b) {
        return a - b;
      });
      this.keys = [];
      keyframes = {};
      for (_k = 0, _len1 = keys.length; _k < _len1; _k++) {
        key = keys[_k];
        if (keyframes[key]) {
          continue;
        }
        matrix = new Matrix4D().identity();
        _ref1 = this.components;
        for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
          component = _ref1[_l];
          currentTime = key * this.duration;
          if ((component.delay - currentTime) > 1e-8) {
            continue;
          }
          ratio = (key - component.delay / this.duration) / (component.duration / this.duration);
          matrix.multiply(component.getEasedMatrix(ratio));
        }
        this.keys.push(key);
        keyframes[key] = matrix.transpose().toFixed(3);
      }
      return keyframes;
    };

    Bounce.generateName = function() {
      return "animation-" + (Bounce.counter++);
    };

    Bounce.isSupported = function() {
      var property, propertyIsSupported, propertyList, propertyLists, style, _i, _j, _len, _len1;
      style = document.createElement("dummy").style;
      propertyLists = [["transform", "webkitTransform"], ["animation", "webkitAnimation"]];
      for (_i = 0, _len = propertyLists.length; _i < _len; _i++) {
        propertyList = propertyLists[_i];
        propertyIsSupported = false;
        for (_j = 0, _len1 = propertyList.length; _j < _len1; _j++) {
          property = propertyList[_j];
          propertyIsSupported || (propertyIsSupported = property in style);
        }
        if (!propertyIsSupported) {
          return false;
        }
      }
      return true;
    };

    return Bounce;

  })();

  module.exports = Bounce;

}).call(this);