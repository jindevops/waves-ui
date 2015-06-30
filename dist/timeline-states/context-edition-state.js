"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var BaseState = require("./base-state");

var ContextEditionState = (function (_BaseState) {
  function ContextEditionState(timeline) {
    _classCallCheck(this, ContextEditionState);

    _get(_core.Object.getPrototypeOf(ContextEditionState.prototype), "constructor", this).call(this, timeline);
  }

  _inherits(ContextEditionState, _BaseState);

  _createClass(ContextEditionState, {
    handleEvent: {
      value: function handleEvent(e) {
        switch (e.type) {
          case "mousedown":
            this.onMouseDown(e);
            break;
          case "mousemove":
            this.onMouseMove(e);
            break;
          case "mouseup":
            this.onMouseUp(e);
            break;
        }
      }
    },
    onMouseDown: {
      value: function onMouseDown(e) {
        this.mouseDown = true;
        this.currentTarget = e.target;

        for (var i = 0, l = this.layers.length; i < l; i++) {
          var layer = this.layers[i];
          if (layer.hasElement(e.target)) {
            this.currentLayer = layer;
            break;
          }
        }
      }
    },
    onMouseMove: {
      value: function onMouseMove(e) {
        if (!this.mouseDown || !this.currentLayer) {
          return;
        }

        var layer = this.currentLayer;
        var target = this.currentTarget;

        if (!e.originalEvent.shiftKey) {
          this.timeline.timeContextBehavior.edit(layer, e.dx, e.dy, target);
        } else {
          this.timeline.timeContextBehavior.stretch(layer, e.dx, e.dy, target);
        }

        this.timeline.update(this.currentLayer);
      }
    },
    onMouseUp: {
      value: function onMouseUp(e) {
        this.mouseDown = false;
        this.currentTarget = null;
        this.currentLayer = null;
      }
    }
  });

  return ContextEditionState;
})(BaseState);

module.exports = ContextEditionState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi90aW1lbGluZS1zdGF0ZXMvY29udGV4dC1lZGl0aW9uLXN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7SUFFcEMsbUJBQW1CO0FBQ1osV0FEUCxtQkFBbUIsQ0FDWCxRQUFRLEVBQUU7MEJBRGxCLG1CQUFtQjs7QUFFckIscUNBRkUsbUJBQW1CLDZDQUVmLFFBQVEsRUFBRTtHQUNqQjs7WUFIRyxtQkFBbUI7O2VBQW5CLG1CQUFtQjtBQUt2QixlQUFXO2FBQUEscUJBQUMsQ0FBQyxFQUFFO0FBQ2IsZ0JBQU8sQ0FBQyxDQUFDLElBQUk7QUFDWCxlQUFLLFdBQVc7QUFDZCxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixrQkFBTTtBQUFBLEFBQ1IsZUFBSyxXQUFXO0FBQ2QsZ0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsa0JBQU07QUFBQSxBQUNSLGVBQUssU0FBUztBQUNaLGdCQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLGtCQUFNO0FBQUEsU0FDVDtPQUNGOztBQUVELGVBQVc7YUFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDYixZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixZQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7O0FBRTlCLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELGNBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsY0FBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUM5QixnQkFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsa0JBQU07V0FDUDtTQUNGO09BQ0Y7O0FBRUQsZUFBVzthQUFBLHFCQUFDLENBQUMsRUFBRTtBQUNiLFlBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUFFLGlCQUFPO1NBQUU7O0FBRXRELFlBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDaEMsWUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7QUFFbEMsWUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQzdCLGNBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkUsTUFBTTtBQUNMLGNBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEU7O0FBRUQsWUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO09BQ3pDOztBQUVELGFBQVM7YUFBQSxtQkFBQyxDQUFDLEVBQUU7QUFDWCxZQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2QixZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztPQUMxQjs7OztTQW5ERyxtQkFBbUI7R0FBUyxTQUFTOztBQXNEM0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyIsImZpbGUiOiJlczYvdGltZWxpbmUtc3RhdGVzL2NvbnRleHQtZWRpdGlvbi1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJhc2VTdGF0ZSA9IHJlcXVpcmUoJy4vYmFzZS1zdGF0ZScpO1xuXG5jbGFzcyBDb250ZXh0RWRpdGlvblN0YXRlIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgY29uc3RydWN0b3IodGltZWxpbmUpIHtcbiAgICBzdXBlcih0aW1lbGluZSk7XG4gIH1cblxuICBoYW5kbGVFdmVudChlKSB7XG4gICAgc3dpdGNoKGUudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bihlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICB0aGlzLm9uTW91c2VVcChlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZURvd24oZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5sYXllcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXJzW2ldO1xuICAgICAgaWYgKGxheWVyLmhhc0VsZW1lbnQoZS50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIXRoaXMubW91c2VEb3duIHx8wqAhdGhpcy5jdXJyZW50TGF5ZXIpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBsYXllciA9IHRoaXMuY3VycmVudExheWVyO1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuY3VycmVudFRhcmdldDtcblxuICAgIGlmICghZS5vcmlnaW5hbEV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICB0aGlzLnRpbWVsaW5lLnRpbWVDb250ZXh0QmVoYXZpb3IuZWRpdChsYXllciwgZS5keCwgZS5keSwgdGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lbGluZS50aW1lQ29udGV4dEJlaGF2aW9yLnN0cmV0Y2gobGF5ZXIsIGUuZHgsIGUuZHksIHRhcmdldCk7XG4gICAgfVxuXG4gICAgdGhpcy50aW1lbGluZS51cGRhdGUodGhpcy5jdXJyZW50TGF5ZXIpO1xuICB9XG5cbiAgb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBudWxsO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dEVkaXRpb25TdGF0ZTsiXX0=