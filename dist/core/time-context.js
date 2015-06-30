/**
 *  @class TimeContext
 *
 *  represent a time segment and its scale to the pixel domain
 *  the timeContexts are organised in a tree structure,
 *  with the timeline's TimeContext on top
 *
 *  @WARNING: the tree works with two level, but probably wont with more depth
 */
"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

var TimeContext = (function () {
  function TimeContext() {
    var parent = arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, TimeContext);

    this.parent = parent;
    this._children = [];

    this._xScale = null;
    this._originalXScale = null;

    this.start = 0;
    this.duration = parent !== null ? parent.duration : 1;
    this.offset = 0;
    this._stretchRatio = 1;

    if (this.parent) {
      this.parent._children.push(this);
    }
  }

  _createClass(TimeContext, {
    xScale: {

      /**
       * @return {Function} the closest available xScale in the TimeContext tree
       */

      get: function () {
        if (this.parent && !this._xScale) {
          return this.parent.xScale;
        } else {
          return this._xScale;
        }
      },
      set: function (xScale) {
        this._xScale = xScale;

        if (!this.parent && !this._originalXScale) {
          this._originalXScale = this._xScale.copy();
        }
      }
    },
    xScaleRange: {
      set: function (range) {
        if (this._xScale) {
          this._xScale.range(range);
        }

        if (this._originalXScale) {
          this._originalXScale.range(range);
        }

        this._children.forEach(function (child) {
          child.xScaleRange = range;
        });
      }
    },
    originalXScale: {

      /**
       * @return {Function} the xScale as defined in the timeline without stretching
       */

      get: function () {
        if (this.parent) {
          return this.parent.originalXScale;
        } else {
          return this._originalXScale;
        }
      }
    },
    stretchRatio: {
      get: function () {
        return this._stretchRatio;
      },
      set: function (ratio) {
        // do not remove xScale on top of the graph
        if (ratio === 1 && this.parent) {
          this._xScale = null;
        } else {
          var xScale = this.originalXScale.copy();

          var _xScale$domain = xScale.domain();

          var _xScale$domain2 = _slicedToArray(_xScale$domain, 2);

          var min = _xScale$domain2[0];
          var max = _xScale$domain2[1];

          var diff = (max - min) / ratio;

          if (this.parent) {
            diff = diff / this.parent.stretchRatio;
          }

          xScale.domain([min, min + diff]);
          this._xScale = xScale;
        }

        this._stretchRatio = ratio;

        // propagate change to children who have their own stretchRatio
        var ratioChange = ratio / this._stretchRatio;

        this._children.forEach(function (child) {
          if (!child._xScale) {
            return;
          }
          child.stretchRatio = child.stretchRatio * ratioChange;
        });
      }
    }
  });

  return TimeContext;
})();

module.exports = TimeContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb3JlL3RpbWUtY29udGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQVNNLFdBQVc7QUFDSixXQURQLFdBQVcsR0FDWTtRQUFmLE1BQU0sZ0NBQUcsSUFBSTs7MEJBRHJCLFdBQVc7O0FBRWIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRXBCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztBQUU1QixRQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNmLFFBQUksQ0FBQyxRQUFRLEdBQUcsQUFBQyxNQUFNLEtBQUssSUFBSSxHQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLFFBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDOztBQUV2QixRQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixVQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7R0FDRjs7ZUFoQkcsV0FBVztBQTZCWCxVQUFNOzs7Ozs7V0FSQSxZQUFHO0FBQ1gsWUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNoQyxpQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMzQixNQUFNO0FBQ0wsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjtPQUNGO1dBRVMsVUFBQyxNQUFNLEVBQUU7QUFDakIsWUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O0FBRXRCLFlBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN6QyxjQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUM7T0FDRjs7QUFFRyxlQUFXO1dBQUEsVUFBQyxLQUFLLEVBQUU7QUFDckIsWUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCOztBQUVELFlBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN4QixjQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7QUFFRCxZQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztBQUFFLGVBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO1NBQUUsQ0FBQyxDQUFDO09BQ2xFOztBQUtHLGtCQUFjOzs7Ozs7V0FBQSxZQUFHO0FBQ25CLFlBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLGlCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1NBQ25DLE1BQU07QUFDTCxpQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQzdCO09BQ0Y7O0FBTUcsZ0JBQVk7V0FKQSxZQUFHO0FBQ2pCLGVBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztPQUMzQjtXQUVlLFVBQUMsS0FBSyxFQUFFOztBQUV0QixZQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM5QixjQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQixNQUFNO0FBQ0wsY0FBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7K0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Ozs7Y0FBM0IsR0FBRztjQUFFLEdBQUc7O0FBRWYsY0FBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBLEdBQUksS0FBSyxDQUFDOztBQUUvQixjQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixnQkFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztXQUN4Qzs7QUFFRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqQyxjQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN2Qjs7QUFFRCxZQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs7O0FBRzNCLFlBQU0sV0FBVyxHQUFHLEtBQUssR0FBSSxJQUFJLENBQUMsYUFBYSxBQUFDLENBQUM7O0FBRWpELFlBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ3JDLGNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQUUsbUJBQU87V0FBRTtBQUMvQixlQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1NBQ3ZELENBQUMsQ0FBQztPQUNKOzs7O1NBM0ZHLFdBQVc7OztBQThGakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMiLCJmaWxlIjoiZXM2L2NvcmUvdGltZS1jb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAgQGNsYXNzIFRpbWVDb250ZXh0XG4gKlxuICogIHJlcHJlc2VudCBhIHRpbWUgc2VnbWVudCBhbmQgaXRzIHNjYWxlIHRvIHRoZSBwaXhlbCBkb21haW5cbiAqICB0aGUgdGltZUNvbnRleHRzIGFyZSBvcmdhbmlzZWQgaW4gYSB0cmVlIHN0cnVjdHVyZSxcbiAqICB3aXRoIHRoZSB0aW1lbGluZSdzIFRpbWVDb250ZXh0IG9uIHRvcFxuICpcbiAqICBAV0FSTklORzogdGhlIHRyZWUgd29ya3Mgd2l0aCB0d28gbGV2ZWwsIGJ1dCBwcm9iYWJseSB3b250IHdpdGggbW9yZSBkZXB0aFxuICovXG5jbGFzcyBUaW1lQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCA9IG51bGwpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5feFNjYWxlID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5hbFhTY2FsZSA9IG51bGw7XG5cbiAgICB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gKHBhcmVudCAhPT0gbnVsbCkgPyBwYXJlbnQuZHVyYXRpb24gOsKgMTtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy5fc3RyZXRjaFJhdGlvID0gMTtcblxuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuX2NoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgY2xvc2VzdCBhdmFpbGFibGUgeFNjYWxlIGluIHRoZSBUaW1lQ29udGV4dCB0cmVlXG4gICAqL1xuICBnZXQgeFNjYWxlKCkge1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhdGhpcy5feFNjYWxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQueFNjYWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5feFNjYWxlO1xuICAgIH1cbiAgfVxuXG4gIHNldCB4U2NhbGUoeFNjYWxlKSB7XG4gICAgdGhpcy5feFNjYWxlID0geFNjYWxlO1xuXG4gICAgaWYgKCF0aGlzLnBhcmVudCAmJiAhdGhpcy5fb3JpZ2luYWxYU2NhbGUpIHtcbiAgICAgIHRoaXMuX29yaWdpbmFsWFNjYWxlID0gdGhpcy5feFNjYWxlLmNvcHkoKTtcbiAgICB9XG4gIH1cblxuICBzZXQgeFNjYWxlUmFuZ2UocmFuZ2UpIHtcbiAgICBpZiAodGhpcy5feFNjYWxlKSB7XG4gICAgICB0aGlzLl94U2NhbGUucmFuZ2UocmFuZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vcmlnaW5hbFhTY2FsZSkge1xuICAgICAgdGhpcy5fb3JpZ2luYWxYU2NhbGUucmFuZ2UocmFuZ2UpO1xuICAgIH1cblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLnhTY2FsZVJhbmdlID0gcmFuZ2UgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7RnVuY3Rpb259IHRoZSB4U2NhbGUgYXMgZGVmaW5lZCBpbiB0aGUgdGltZWxpbmUgd2l0aG91dCBzdHJldGNoaW5nXG4gICAqL1xuICBnZXQgb3JpZ2luYWxYU2NhbGUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQub3JpZ2luYWxYU2NhbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbFhTY2FsZTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3RyZXRjaFJhdGlvKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJldGNoUmF0aW87XG4gIH1cblxuICBzZXQgc3RyZXRjaFJhdGlvKHJhdGlvKSB7XG4gICAgLy8gZG8gbm90IHJlbW92ZSB4U2NhbGUgb24gdG9wIG9mIHRoZSBncmFwaFxuICAgIGlmIChyYXRpbyA9PT0gMSAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5feFNjYWxlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeFNjYWxlID0gdGhpcy5vcmlnaW5hbFhTY2FsZS5jb3B5KCk7XG4gICAgICBjb25zdCBbbWluLCBtYXhdID0geFNjYWxlLmRvbWFpbigpO1xuXG4gICAgICBsZXQgZGlmZiA9IChtYXggLSBtaW4pIC8gcmF0aW87XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICBkaWZmID0gZGlmZiAvIHRoaXMucGFyZW50LnN0cmV0Y2hSYXRpbztcbiAgICAgIH1cblxuICAgICAgeFNjYWxlLmRvbWFpbihbbWluLCBtaW4gKyBkaWZmXSk7XG4gICAgICB0aGlzLl94U2NhbGUgPSB4U2NhbGU7XG4gICAgfVxuXG4gICAgdGhpcy5fc3RyZXRjaFJhdGlvID0gcmF0aW87XG5cbiAgICAvLyBwcm9wYWdhdGUgY2hhbmdlIHRvIGNoaWxkcmVuIHdobyBoYXZlIHRoZWlyIG93biBzdHJldGNoUmF0aW9cbiAgICBjb25zdCByYXRpb0NoYW5nZSA9IHJhdGlvIC8gKHRoaXMuX3N0cmV0Y2hSYXRpbyk7XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoIWNoaWxkLl94U2NhbGUpIHsgcmV0dXJuOyB9XG4gICAgICBjaGlsZC5zdHJldGNoUmF0aW8gPSBjaGlsZC5zdHJldGNoUmF0aW8gKiByYXRpb0NoYW5nZTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVDb250ZXh0O1xuIl19