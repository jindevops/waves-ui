var events    = require('events');
var uniqueId  = require('utils').uniqueId;
var LayerVis  = require('layer-vis');
// var anchorVis = require('./anchor');
var pck       = require('./package.json');

var Zoomer = (function(super$0){"use strict";var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;if(!PRS$0)MIXIN$0(Zoomer, super$0);var proto$0={};

  function Zoomer() {
    if (!(this instanceof Zoomer)) { return new Zoomer; }

    super$0.call(this);

    var name = pck.name.replace('-vis', '');

    var defaults = {
      type: name,
      id: uniqueId(name),
    };

    this.params(defaults);
    // add events ability
    var emitter = new events.EventEmitter();
    this.on = emitter.on;
    this.trigger = emitter.emit;
    // bind draw to `this`
    this.draw = this.draw.bind(this);
  }if(super$0!==null)SP$0(Zoomer,super$0);Zoomer.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Zoomer,"configurable":true,"writable":true}});DP$0(Zoomer,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  proto$0.graph = function(timeline) {
    timeline.layer(this);
    return this;
  };

  proto$0.draw = function(sel) {
    var graph = this.base; // that.graph();
    var d3 = this.d3;
    var that = this; // binding fix when called from d3

    sel.each(function() {
      var zx = 0;
      var zy = 0;
      var xponent = 1.005;
      var zoomerX;

      // mouseMove
      function onMouseMove(evt) {
        if (evt.which !== 1) { return; } 

        var deltaY = zy - evt.pageY;
        var deltaX = zx - (parseInt(evt.pageX - zoomerX, 10));

        var zoomVal = Math.abs(deltaY);
        var zFactor = (deltaY > 0)? Math.pow(xponent, zoomVal) : 1 / Math.pow(xponent, zoomVal);
        // update event object
        var e = {
          anchor: zx,
          factor: zFactor,
          delta: { x: deltaX, y: deltaY },
          originalEvent: evt // keep track of the original event
        }

        that.trigger('mousemove', e);
      }

      // mouseUp
      function onMouseUp(evt) {
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseup', onMouseUp);
        document.body.classList.remove('zooming');
        that.trigger('mouseup', evt);
      }

      d3.select(this).on('mousedown', function(evt) {
        zoomerX = this.getBoundingClientRect().left;
        zy = d3.event.pageY;
        zx = parseInt(d3.event.pageX - zoomerX, 10);

        // update position of the anchor on click
        // graph.layers['anch'].position(zx);
        var e = {
          anchor: zx,
          originalEvent: d3.event
        };
        
        that.trigger('mousedown', e);

        document.body.classList.add('zooming');
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);
        document.body.addEventListener('mouseleave', onMouseUp);
      });
    });

    return this;
  };
MIXIN$0(Zoomer.prototype,proto$0);proto$0=void 0;return Zoomer;})(LayerVis);;

module.exports = Zoomer;

