(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.G = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ApaCHQAAsjJjAAQIJAABAEwQAJAtAAAkQAABRg3AlQg3Ajh9AAQiWAAhng2QhggzAAhCQAAhCA/g1QBBg4BdAAIAnAAIAfABIAMAAQAQgEAAgLQAAgbg6gbQhFgihoAAQiUAAhkBgQh2BxAADTQAAA8ALBHQAxE+AnBsQAvCEBXAAQCCAAAAiMQAAg/gfiEQgNg2grgOIhZgPQgRgDgFgrQgDghAEgYQAOAHJnAKQhoCkAADeQAAAoAEATQgZAdheAsQiMBBjHAoQhdAThLAAQmcAAAAoWg");
	this.shape.setTransform(116.125,110.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,112.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.G, new cjs.Rectangle(0,0,223.8,224.7), null);


(lib.F = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AonJ9QgBgbAHgLQAGgKAXgGQBwgWABg4IAAAAIAAgBIAAAAIAAAAIAAABIAAAAQAAANgVjQQgWjYABinQAAjrAmjIQgzATgvAAQgwgBgggQIAPi/QBSBFFfAAQFfAAEKgvQAIgCAFAIQBcChAADOQAABngpAwQgpAvhdAAQh9AAh5g2QiKg9AAhZQAAhCBGgwQBDguBZAAQB0AABUA0QALAHACAAQAGAAAAgIQAAgkhFgtQhcg7iUAAQg2ABgpAFQjFAWAAEKQAABnAaB7QB6AJB8gBIBbgBIBGgDQAQAAgDARQgEAmAAAsQAABcASBjQgVAAg4ALQg5AKgXAAQggAAgJgMQgHgLgJhHQgGg+glgJQgSgGiAgSQBTE+BOCeQkuA7lKBKQgHgnAAgWg");
	this.shape.setTransform(116.35,111.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.F, new cjs.Rectangle(0,0,223.8,223.8), null);


(lib.E = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ao6GzQAYgMAkAAQA2gBBCAgQhnkugGpGQAAg1gsgRQgsgHg7gOQgQgKAAg4QgBgiAFgIQBDAXD7AZQD/AbCkABQC9AAEOgMQgpBOgeBcIgrCZIgzAEQggAEgTABQgOAAgCgLQgGhsgdgsQgrhDjDAAIiZAGQgtBqAACWQAAAcACAwIACBDIBpgJQBogMADgMQAGgTABgVQAAgigZgdIgogpQAigTAfgOQBLggAwgCQAPAgAAA3IgCAyQgCAhAAARQgBA3AgCDQADAOgDADQgDADgGgBQhAgJibgGIiOgGQAOEIBjBjQBVBWDLAAQBAAAA5gaQAxgVAAgRQAAgJgQAAQgOAAgXACIgnACQiVAAgvhyQgHgTAAgUQAAg7BKgvQBNgxCNgWQAqgGAfAAQCpAAABCPQgBARgCAHQgWDLieBTQh4A/jagBQghAAj3gMQgqgChtgLQhcgLgvAAQhgAAg1Amg");
	this.shape.setTransform(115.45,111.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.E, new cjs.Rectangle(0,0,223.8,223.8), null);


(lib.D = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AovHFQA5glA9AAQApAAAmATQiClUAAnBQAAg4gqgWIhcgYQgPgHAAhWQAAhWAGgMQCrCTFHAAQAjAABAgFQA/gDAeAAQEMAACOCoQBpB8A0D3QAUBhAABKQAAGWn5AAQhPAAiPgJQiQgLg+ABQirAAhRA7gAilj3QgRBMAABeQAAC/AxCSQBCAkCaAAQClAABeg3QBlg8AAhyQAAiAhxhKQhKgwihgnQhtgbiBAAQgUAAgGACg");
	this.shape.setTransform(115.575,106.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.D, new cjs.Rectangle(0,0,223.8,223.8), null);


(lib.C = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AovgPQAAlACjijQCUiSECAAQEmAACRCGQBuBmAACWQAABfg2AnQg2AniJAAQicAAhigsQhdgrAAhAQAAgiAbgwQAthUBtgXIB5gNQAIgFAAgGQAAgdhKgqQhVgwhaAAQh9AAhCBhQg5BTAACIQAABDAMBJQA2E8BJB4QA7BiBeAAQAjAAAkgHQB/gWBHhLQAkglBFh7QAJgGAAAEQAFAmgBAaQAACHg5BoQhNCIicAcQh9AWhdAAQn+AAAAqUg");
	this.shape.setTransform(113.55,115.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,111.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.C, new cjs.Rectangle(0,0,223.8,223.8), null);


(lib.B = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AisF8IgOgCIgHACIgFgFIAHgNIAIgEIAIADIAMgOIAAgLIAFgGIAEgOIAJgJQAGgFABgEIAFgMIAIgFIgHgEIAIgHIgBgLQAAgQAGgNIgCgEIAOgNIAAgMIgFgLIAFgKIAEgoQgFgJgBgEIAGgJIgCgKIACgIIgCgHIgBgZIABgtQAHgGAAgJIAGAAIAAgIIADgEIgDgBIADgEIgBgDIAAgLIgCgDQAFgLAHgLIgFgHIACgGIAFgDIACACIAEgHIgJgGIABgRIAGgHIgEgLQAFgUAEgFIgCgMIAIgVIgDgLIAAgJIADgEIgGgHIABgPQAFgIAEgQIgCgHIgKgFIgBgKIgRABIgGAJQgGALgGAGQgGAHgGAIIgDAAIgMAFIgUgDIgHADIgIgFQgDgCgLgPIAKABIABgQIAvglIAMgEIAXgPIAHgCQAIgHABgFIALgHIANgTIAZgaIAMgBIADgIIAGAAQAMgGAFgBIADgCIAMAEIABAHIAAAGIAEAIIgEAEIACAKIgHAKIAAAJIgHACIABAPIgJAMIgTAyIgNAyIgFAPIgBgEIgFAYIgBgCIADAiIgHAKIAAAIIAEAIIgEACIgDgDIABAKIgBAFIgEAIQgCADgEAXIgBABIALAMIgCAIQgIADgHAJIAHAAIAAADIAIAAIAPAEQAPgIAKAAIAPABIALgBIACAEIAMgDIACAEIAOgFIALAEIgBABIAFAAIARgKIAHACIAAgEIAWAAIAhAIIAHAKIACgDQAQAEAQAHIACAEIAKAIIgKAeIgDAFIgGAAIgBAFIAAARIgDgEIgCAHIgKAGIgDAPIgLAJIACAEIgEAAIACABIgGAEIgBAHQgLAEgMAaIgEgCIACAEIgIABIgBAIIgEgCIgCAHIgKAJIAAAEIgDAHIgGgCIADADIgMADIAAAEIgNALIABAEIgEAFIgFAAIgCgDIgDAFIgEAAIACAFIgFACIgEAKIgDACIAAAEIgHAAIgEAHIgDgCQgGAOgGAEIAAADIgFAAIACAGIgFgEIgBAFIgGAAIgCANIgGgCIgDAHQgOAIgDADIACAFIgDAAIAAAEIgGAAQgHAGgEABIgBgCIgHAHQgKAHgGAGIgJgCIgYATIAAAEIgGAAQgPAPgIAEIgCAEIgDACIgEAIIgEgDIgIAHIgCgCIgEANgAhEEJIgBAFIABAHIAJgDIANgQIARgLIAZgfIAEgGIAGgCQAIgLACgFIAFgDIARgUIABgHIAPAAIgCgKIAJgHIADgLIAPgHIAQgcIADgEIAAgEIAFgQIgGgXQgZgHgFgJIgKgBIgDABIgJgBIgGABIADACIgGACIgBADIgCgFIgCADIgJgDIgNAFQgEgDgHgCQgOAIgDABQgCAHgHAEIgBgDIgFAGIgBgDIgCABIgHgHIgDAAIgDgDIgGAAQgEAOgIAMIAJAQIgJAkIAHALQACAGAAAPIgBAPIABAKIgJAGIAAAyIgDAAg");
	this.shape.setTransform(183.55,49.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhoJcQjGgihLAAQhlAAg5AlIADjBQAXgKAjAAQA5AAA7AeQhklhAAmuIABgTIABgUQgBg0gwgKIhjgOQgNgFAAhBQAAhHAIgfQClBmDmAAQBwAACHgZQBlgTBKAAQCeAABKBMQA3A6AABZQAADujKBAQALgBAYAAQCSAABOBaQBCBNAABwQAACgheByQhzCKjRAAQhqAAjGghgAhWCNQhiAbAAAqQAAAzBxA0QBxA1B5AAQB5AABQgdQBQgfAAgxQABg5h1gqQhtgph8AAQhgAAhVAYgAiNlMQh1AuAAAwQAAAjBNAdQBMAcBUAAQBdAABugrQB7gwABg4QAAgnhIgYQhBgVhaAAQhpAAhzAtg");
	this.shape_1.setTransform(112.15,108.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAnPFIlHQFHlIHPAAQHQAAFHFIQFIFHAAHPQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_2.setTransform(111.875,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.B, new cjs.Rectangle(0,0,223.8,223.8), null);


(lib.A = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("An4IwQhkgZicgcQAVgcAfgqIAog4IBYAnQBzieBcktQBik9AHjLQBygOBhgVQBjgWBzgnQBxC4CHFzICkHZQAPAoBGAVIBrAZQgYAtg0BaQh9gFgyAAQirgBjMAjQATiEAAh/QAAiOgXhPQh+gMkJgeQgZBaghBZQglBogsBIQAtAKC8AJQgPBjAABRQitg5iWgmgAiUkQQhXA6AABKQAABjCqAAQD0AAAAi2QAAhoiOAAQhmAAhTA3g");
	this.shape.setTransform(106.375,106.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("AsWMXQlIlHAAnQQAAj3BejRQBRi2CZiZQBQhQBag9QEPi6FdAAQFeAAEQC6QBYA9BRBQQEvEwAXGiQACAiAAAjQAAHQlIFHQlHFInQAAQnPAAlHlIg");
	this.shape_1.setTransform(111.9,122.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.A, new cjs.Rectangle(0,0,223.8,234.4), null);


(lib.Symbol9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.A();
	this.instance.setTransform(-150.2,253.8,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(150.2,-259.05,1,1,0,0,0,111.9,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(-262.1,-370.9,524.2,741.9), null);


(lib.Symbol8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_16 = new lib.A();
	this.movieClip_16.name = "movieClip_16";
	this.movieClip_16.setTransform(704.85,279.35,1,1,0,0,0,111.9,117.2);
	this.movieClip_16.alpha = 0.5;

	this.movieClip_2 = new lib.C();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(325.75,5.45,1,1,0,0,0,111.9,111.9);
	this.movieClip_2.alpha = 0.5;

	this.instance = new lib.E();
	this.instance.setTransform(495.95,5.45,1,1,0,0,0,111.9,111.9);
	this.instance.alpha = 0.5;

	this.instance_1 = new lib.G();
	this.instance_1.setTransform(672.85,5.95,1,1,0,0,0,111.9,112.4);
	this.instance_1.alpha = 0.5;

	this.instance_2 = new lib.B();
	this.instance_2.setTransform(836.15,8,1,1,0,0,0,111.9,111.9);
	this.instance_2.alpha = 0.5;

	this.movieClip_14 = new lib.D();
	this.movieClip_14.name = "movieClip_14";
	this.movieClip_14.setTransform(1022.8,5.4,1,1,0,0,0,111.9,111.9);
	this.movieClip_14.alpha = 0.5;

	this.movieClip_15 = new lib.F();
	this.movieClip_15.name = "movieClip_15";
	this.movieClip_15.setTransform(704.85,-284.55,1,1,0,0,0,111.9,111.9);
	this.movieClip_15.alpha = 0.5;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1141.275,-71.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C9FFED").s().p("EgtBAoTQCNhdCghtQDnieEOjAQJcmtSutpQDFiPC7iDIAHAEQGkD0ErChQDyCCHmD9QGwDkEdCuQEoC2FgD6IAGAGQCPBmDjCpQ1sM296AAQ5fAAzipVgEhM1AAAQAAx5RFtWIGCEeQETDLDJCKQHfFJKwGQQE0C0IqE7I/cWdQnkFakNCtIggAUIgLAHQhTA0hQAwQv1tAAAxPgEBBDAZcQiShuiIhjQiqh9ibhtQlij4lDjLQk0i/mPjgQjch7nqkIIgLgGIlEiwQDgiXDNiCIJQl0QFnjhDmiaQJWmTGXl5QSYNrgBSjQAAOerILeIgqgggAvI2VQv2pbtApCQTKo1Y0AAQYEAASuITQkADblPDfQi8B8kjCyInkEnQmlEFn+FhQhbA/hzBRQpFlFmykBg");
	this.shape_1.setTransform(670.7,-7.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("EBKZA6OQiEgqiJh6QgggcjCjJQiaifjXiwQh/hnkLjKIkHjFQjjiqiPhmIgGgFQlgj7koi2QkciumwjkQnnj9jxiCQkrihmlj0IgHgEQi7CEjFCOQyuNppcGtQkODAjmCeQigBtiOBdQiEBXhzBIQpNFvoMDnQiPA/heAaQiGAlhygKQiQgNh7hYQh6hZg6iFQg5iFAUiWQAUiWBahxQBVhqCdhSQA9gfDlheQE6iBFejOQBQgvBTg0IAMgIIAfgUQENisHllbIfb2dQopk6k1i0QqwmRnflJQjJiKkTjLImCkeIhUg+QiGhih7hYQmakkksi0Qi4hvhHg2QiGhnhAh0Qg+hwgCiFQgDiEA5hzQA4hyBshOQBrhOB/gTQCigYC9BLQCHA1C7B8QDRCKEeDTIHnFpIBKA3QCTBqCYBsIBiBEQNAJCP3JaQGxEBJGFGQBzhSBag+QH+lhGmkGIHjknQEkiyC7h8QFPjfEBjbQBNhCBHhCIBNhMIA4g5QCvi2ApglQCDhzB+gnQCAgpCKAeQCJAeBmBaQBkBaAwCEQAvCEgVCGQgWCShmCUQg7BUhiBmIg9A8IhXBUQmYF5pWGSQjmCblmDgIpRF1QjMCCjhCWIFFCvIAKAGQHrEJDbB7QGQDgEzDAQFEDKFhD5QCbBtCrB8QCIBkCSBuIApAfIAIAGQENDLC+CaQD0DFDFC0QC4CoBdCKQB/C8ABC3QABB9g7B0Qg7B0hmBKQhlBJiAAVQgtAHgtAAQhQAAhNgYg");
	this.shape_2.setTransform(676.8933,-21.308);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.movieClip_15},{t:this.movieClip_14},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.movieClip_2},{t:this.movieClip_16}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(-1222.4,-396.4,2444.9,792.9), null);


(lib.Symbol7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.A();
	this.instance.setTransform(757.5,253.8,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(1057.9,-259.05,1,1,0,0,0,111.9,111.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1088.625,-97.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(-1169.8,-370.9,2339.6,741.9), null);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_2 = new lib.C();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(564.3,14.5,1,1,0,0,0,111.9,111.9);

	this.instance = new lib.A();
	this.instance.setTransform(1055.9,-233.35,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(431.15,-253.2,1,1,0,0,0,111.9,111.9);

	this.instance_2 = new lib.D();
	this.instance_2.setTransform(392.7,253.2,1,1,0,0,0,111.9,111.9);

	this.instance_3 = new lib.E();
	this.instance_3.setTransform(734.5,14.5,1,1,0,0,0,111.9,111.9);

	this.instance_4 = new lib.G();
	this.instance_4.setTransform(911.4,15,1,1,0,0,0,111.9,112.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1086.675,-62.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.movieClip_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(-1167.8,-365.1,2335.6,730.2), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_2 = new lib.C();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(664.2,22.05,1,1,0,0,0,111.9,111.9);

	this.instance = new lib.A();
	this.instance.setTransform(767.15,-269.7,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(360.15,-117.35,1,1,0,0,0,111.9,111.9);

	this.instance_2 = new lib.D();
	this.instance_2.setTransform(501.8,275.05,1,1,0,0,0,111.9,111.9);

	this.instance_3 = new lib.B();
	this.instance_3.setTransform(1026.25,275.05,1,1,0,0,0,111.9,111.9);

	this.instance_4 = new lib.E();
	this.instance_4.setTransform(835.7,22.05,1,1,0,0,0,111.9,111.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1056.975,-55.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.movieClip_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(-1138.1,-386.9,2276.2,773.9), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_2 = new lib.C();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(728.45,-26.55,1,1,0,0,0,111.9,111.9);

	this.instance = new lib.A();
	this.instance.setTransform(425.7,-239.65,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(377.25,99,1,1,0,0,0,111.9,111.9);

	this.instance_2 = new lib.D();
	this.instance_2.setTransform(682.95,245,1,1,0,0,0,111.9,111.9);

	this.instance_3 = new lib.B();
	this.instance_3.setTransform(1059,133,1,1,0,0,0,111.9,111.9);

	this.instance_4 = new lib.G();
	this.instance_4.setTransform(1058.95,-208.7,1,1,0,0,0,111.9,112.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1089.675,-103.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.movieClip_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-1170.8,-356.8,2341.7,713.7), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.A();
	this.instance.setTransform(-388.15,101.05,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(-156.4,280.75,1,1,0,0,0,111.9,111.9);

	this.instance_2 = new lib.D();
	this.instance_2.setTransform(164.4,268,1,1,0,0,0,111.9,111.9);

	this.instance_3 = new lib.B();
	this.instance_3.setTransform(388.2,67.8,1,1,0,0,0,111.9,111.9);

	this.instance_4 = new lib.G();
	this.instance_4.setTransform(294.3,-209.75,1,1,0,0,0,111.9,112.4);

	this.instance_5 = new lib.E();
	this.instance_5.setTransform(-2.15,-280.75,1,1,0,0,0,111.9,111.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-500,-392.6,1000.1,785.3), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_7 = new lib.Symbol3();
	this.movieClip_7.name = "movieClip_7";
	this.movieClip_7.setTransform(-51.6,35.7);

	this.movieClip_6 = new lib.E();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(709.65,-280.7,1,1,0,0,0,111.9,111.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C9FFED").s().p("EgtBAoTQCNhdCghtQDnieEOjAQJcmtSutqQDFiOC7iDIAHAEQGkD0ErChQDyCCHmD9QGwDkEdCuQEoC1FgD7IAGAGQCPBmDjCpQ1sM396AAQ5fAAzipWgEhM1AAAQAAx5RFtWIGCEeQETDLDJCJQHfFKKwGQQE0C0IqE6I/cWeQnkFakNCtIggAUIgLAIQhTAzhQAwQv1tAAAxPgEBBDAZdQiShviIhjQiqh8ibhuQlij4lDjLQk0jAmPjfQjch7nqkIIgLgGIlEiwQDgiXDNiBIJQl1QFnjhDmibQJWmSGXl5QSYNqgBSkQAAOerILeIgqgfgAvI2VQv2pbtApBQTKo2Y0AAQYEAASuITQkADblPDfQi8B8kjCyInkEnQmlEFn+FhQhbA+hzBSQpFlFmykBg");
	this.shape.setTransform(670.7,-3.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("EBKZA6OQiEgqiJh6QgggcjCjJQiaifjXiwQh/hnkLjKIkHjFQjjiqiPhmIgGgFQlgj7koi2QkciumwjkQnnj9jxiCQkrihmlj0IgHgEQi7CEjFCOQyuNppcGtQkODAjmCeQigBtiOBdQiEBXhzBIQpNFvoMDnQiPA/heAaQiGAlhygKQiQgNh7hYQh6hZg6iFQg5iFAUiWQAUiWBahxQBVhqCdhSQA9gfDlheQE6iBFejOQBQgvBTg0IAMgIIAfgUQENisHllbIfb2dQopk6k1i0QqwmRnflJQjJiKkTjLImCkeIhUg+QiGhih7hYQmakkksi0Qi4hvhHg2QiGhnhAh0Qg+hwgCiFQgDiEA5hzQA4hyBshOQBrhOB/gTQCigYC9BLQCHA1C7B8QDRCKEeDTIHnFpIBKA3QCTBqCYBsIBiBEQNAJCP3JaQGxEBJGFGQBzhSBag+QH+lhGmkGIHjknQEkiyC7h8QFPjfEBjbQBNhCBHhCIBNhMIA4g5QCvi2ApglQCDhzB+gnQCAgpCKAeQCJAeBmBaQBkBaAwCEQAvCEgVCGQgWCShmCUQg7BUhiBmIg9A8IhXBUQmYF5pWGSQjmCblmDgIpRF1QjMCCjhCWIFFCvIAKAGQHrEJDbB7QGQDgEzDAQFEDKFhD5QCbBtCrB8QCIBkCSBuIApAfIAIAGQENDLC+CaQD0DFDFC0QC4CoBdCKQB/C8ABC3QABB9g7B0Qg7B0hmBKQhlBJiAAVQgtAHgtAAQhQAAhNgYg");
	this.shape_1.setTransform(676.8933,-17.608);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.movieClip_6},{t:this.movieClip_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-1222.4,-392.6,2444.9,785.2), null);


// stage content:
(lib.music = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,7,60,100,160,214,264,302,358,670,714,720,759,777,821,831,871,875,920,929,969];
	this.streamSoundSymbolsList[670] = [{id:"wrong_sfxwav",startFrame:670,endFrame:720,loop:1,offset:0}];
	this.streamSoundSymbolsList[720] = [{id:"wrong_sfxwav",startFrame:720,endFrame:777,loop:1,offset:0}];
	this.streamSoundSymbolsList[777] = [{id:"wrong_sfxwav",startFrame:777,endFrame:831,loop:1,offset:0}];
	this.streamSoundSymbolsList[831] = [{id:"wrong_sfxwav",startFrame:831,endFrame:875,loop:1,offset:0}];
	this.streamSoundSymbolsList[875] = [{id:"wrong_sfxwav",startFrame:875,endFrame:929,loop:1,offset:0}];
	this.streamSoundSymbolsList[929] = [{id:"wrong_sfxwav",startFrame:929,endFrame:1000,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.movieClip_3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(25);
		}
		
		this.movieClip_4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(677);
		}
	}
	this.frame_7 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_60 = function() {
		this.stop();
		
		this.movieClip_6.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(65);
		}
		
		this.movieClip_7.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(734);
		}
	}
	this.frame_100 = function() {
		this.stop();
		
		this.movieClip_9.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_9.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_9()
		{
			this.gotoAndPlay(796);
		}
		
		this.movieClip_10.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_10.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_10()
		{
			this.gotoAndPlay(110);
		}
	}
	this.frame_160 = function() {
		this.stop();
		
		this.movieClip_11.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_11.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_11()
		{
			this.gotoAndPlay(850);
		}
		
		this.movieClip_12.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_12.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_12()
		{
			this.gotoAndPlay(166);
		}
	}
	this.frame_214 = function() {
		this.stop();
		
		
		this.movieClip_18.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_18.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_18()
		{
			this.gotoAndPlay(876);
		}
		
		this.movieClip_14.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_19.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_19()
		{
			this.gotoAndPlay(216);
		}
	}
	this.frame_264 = function() {
		this.stop();
		
		this.movieClip_15.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_15.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_15()
		{
			this.gotoAndPlay(270);
		}
		
		this.movieClip_16.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_16.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_16()
		{
			this.gotoAndPlay(930);
		}
	}
	this.frame_302 = function() {
		var movieClip_16_FadeOutCbk = fl_FadeSymbolOut.bind(this);
		this.addEventListener('tick', movieClip_16_FadeOutCbk);
		this.movieClip_16.alpha = 1;
		
		function fl_FadeSymbolOut()
		{
			this.movieClip_16.alpha -= 0.01;
			if(this.movieClip_16.alpha <= 0)
			{
				this.removeEventListener('tick', movieClip_16_FadeOutCbk);
			}
		}
	}
	this.frame_358 = function() {
		this.stop();
	}
	this.frame_670 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,670,720,1);
	}
	this.frame_714 = function() {
		this.gotoAndPlay(7);
	}
	this.frame_720 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,720,777,1);
	}
	this.frame_759 = function() {
		this.gotoAndPlay(59);
	}
	this.frame_777 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,777,831,1);
	}
	this.frame_821 = function() {
		this.gotoAndPlay(100);
	}
	this.frame_831 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,831,875,1);
	}
	this.frame_871 = function() {
		this.gotoAndPlay(159);
	}
	this.frame_875 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,875,929,1);
	}
	this.frame_920 = function() {
		this.gotoAndPlay(214);
	}
	this.frame_929 = function() {
		var soundInstance = playSound("wrong_sfxwav",0);
		this.InsertIntoSoundStreamData(soundInstance,929,1000,1);
	}
	this.frame_969 = function() {
		this.gotoAndPlay(264);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(53).call(this.frame_60).wait(40).call(this.frame_100).wait(60).call(this.frame_160).wait(54).call(this.frame_214).wait(50).call(this.frame_264).wait(38).call(this.frame_302).wait(56).call(this.frame_358).wait(312).call(this.frame_670).wait(44).call(this.frame_714).wait(6).call(this.frame_720).wait(39).call(this.frame_759).wait(18).call(this.frame_777).wait(44).call(this.frame_821).wait(10).call(this.frame_831).wait(40).call(this.frame_871).wait(4).call(this.frame_875).wait(45).call(this.frame_920).wait(9).call(this.frame_929).wait(40).call(this.frame_969).wait(31));

	// Scene
	this.movieClip_4 = new lib.Symbol1();
	this.movieClip_4.name = "movieClip_4";
	this.movieClip_4.setTransform(556.55,399.85);

	this.movieClip_3 = new lib.C();
	this.movieClip_3.name = "movieClip_3";
	this.movieClip_3.setTransform(201.25,189.6,1,1,0,0,0,111.9,111.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmeJhQgIgEAEgSQAeiQAMhoIlEAmQAsh9BOjsQADgGAQAEQB0AYBeANQAGiSAAhCQilAQhTARQgTAEgBgGQgEhqg/jRQCxAZCTAIQgFhxgYjFQDWBFBgADQAFAAgDARQgSBsgMB4QBJAACPgKIgdjrQAAgUACAAQB4gIC+g/QgTCSgLCYQCBgUA4gSQATgEADAMIB8FhIlVgkQAABzAHBsQCagKC2gfQg5DCgGB5QAAALgUgDQhxgTh0gLQARB4AcCBQADAVgHACIldCCQANiKAVkTQhvAAhrAJQAODEAXDlQjVhQiHg1gAh0itQgCAoAABQQAABSACAqQBmAIBhAAQAeAAASgDIABhKIAChLIgCgvIgBgzQh5gEg4AAQgwAAgWACg");
	this.shape.setTransform(-1263.725,331.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C9FFED").s().p("Eg2UAjGQ2huiAB0kQgB0jWhujQWguif0ABQf1gBWgOiQWhOjAAUjQAAUk2hOiQ2gOj/1AAQ/0AA2gujg");
	this.shape_1.setTransform(548.25,396.3);

	this.instance = new lib.A();
	this.instance.setTransform(168.4,500.9,1,1,0,0,0,111.9,117.2);

	this.instance_1 = new lib.F();
	this.instance_1.setTransform(400.15,680.6,1,1,0,0,0,111.9,111.9);

	this.instance_2 = new lib.D();
	this.instance_2.setTransform(720.95,667.85,1,1,0,0,0,111.9,111.9);

	this.instance_3 = new lib.B();
	this.instance_3.setTransform(944.75,467.65,1,1,0,0,0,111.9,111.9);

	this.instance_4 = new lib.G();
	this.instance_4.setTransform(850.85,190.1,1,1,0,0,0,111.9,112.4);

	this.instance_5 = new lib.E();
	this.instance_5.setTransform(554.4,119.1,1,1,0,0,0,111.9,111.9);

	this.movieClip_2 = new lib.C();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(230.7,196.9,1,1,0,0,0,111.9,111.9);

	this.movieClip_7 = new lib.Symbol3();
	this.movieClip_7.name = "movieClip_7";
	this.movieClip_7.setTransform(-174.05,435.5);

	this.movieClip_6 = new lib.E();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(587.2,119.1,1,1,0,0,0,111.9,111.9);

	this.movieClip_9 = new lib.Symbol5();
	this.movieClip_9.name = "movieClip_9";
	this.movieClip_9.setTransform(-206.75,386.9);

	this.movieClip_10 = new lib.G();
	this.movieClip_10.name = "movieClip_10";
	this.movieClip_10.setTransform(916.75,244.7,1,1,0,0,0,111.9,112.4);

	this.movieClip_11 = new lib.Symbol6();
	this.movieClip_11.name = "movieClip_11";
	this.movieClip_11.setTransform(-177.05,394.45);

	this.movieClip_12 = new lib.B();
	this.movieClip_12.name = "movieClip_12";
	this.movieClip_12.setTransform(878.85,632.7,1,1,0,0,0,111.9,111.9);

	this.movieClip_18 = new lib.Symbol9();
	this.movieClip_18.name = "movieClip_18";
	this.movieClip_18.setTransform(732.6,429.05);

	this.movieClip_14 = new lib.D();
	this.movieClip_14.name = "movieClip_14";
	this.movieClip_14.setTransform(242.2,147.4,1,1,0,0,0,111.9,111.9);

	this.movieClip_13 = new lib.Symbol7();
	this.movieClip_13.name = "movieClip_13";
	this.movieClip_13.setTransform(-175.1,429.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C9FFED").s().p("Eg2UAjGQ1et3hAzXIJkAAIgCg4MCGiAAAIgDA4IJjAAQg/TX1eN3Q2gOj/1AAQ/0AA2gujgEhM0AA1IAAg1QgB0jWhujQWguif0ABQf1gBWgOiQWhOjAAUjIgBA1g");
	this.shape_2.setTransform(548.25,396.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C9FFED").s().p("Eg2UAjGQwbqmkct0QhBjLgZjVQgJhKgEhKIJkAAIgCg4MCGiAAAIgDA4IJjAAQgDBKgJBKQgZDVhBDLQkcN0wbKmQ2gOj/1AAQ/0AA2gujgEhM0AA1IAAg1QgB0jWhujQWguif0ABQf1gBWgOiQWhOjAAUjIgBA1g");
	this.shape_3.setTransform(548.25,396.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C9FFED").s().p("Eg3cAjGQ2guiAA0kQAA0jWgujQWhuif1ABQf0gBWgOiQWgOjAAUjQAADIghC/ICwAAIgGAhIiwAAQjHQWyyMIQ2gOj/0AAQ/1AA2hujgEg/vAGoICvAAIAAghIivAAg");
	this.shape_4.setTransform(555.375,396.3);

	this.movieClip_16 = new lib.A();
	this.movieClip_16.name = "movieClip_16";
	this.movieClip_16.setTransform(582.4,682.85,1,1,0,0,0,111.9,117.2);

	this.movieClip_15 = new lib.F();
	this.movieClip_15.name = "movieClip_15";
	this.movieClip_15.setTransform(582.4,118.95,1,1,0,0,0,111.9,111.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C9FFED").s().p("Eg2UAjGQ2huiAB0kQgB0jWhujQWguif0ABQf1gBWgOiQWDOQAdUBIABA1IgBAfQgRUQ2POXQ2gOj/1AAQ/0AA2gujg");
	this.shape_5.setTransform(548.25,396.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C9FFED").s().p("Eg2VAjGQy2sLjEwZMCYeAAAQjEQZy2MLQ2gOj/1AAQ/1AA2gujgEhVmAFmIgBgFIgLAAIgEgVIJZAAQgYijAAipQAA0jWgujQWguif1ABQf1gBWgOiQWCOQAdUBIABA1IAAAfQgCCZgWCUIJaAAIgDAVIgLAAIgCAFg");
	this.shape_6.setTransform(548.3,396.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C9FFED").s().p("Eg12AjGQzPsbizw0MB/6AAAIAAhBMiAEAAAIgHhAIhBAAQgGg1gDg2MCBVAAAIAAhWMiAYAAAIAAg1QAA0jWgujQWguif0ABQf1gBWgOiQWDOQAdUBIABA1IAAAfQgBA3gDA1QgFBXgMBUQiYRez0MyQ2gOj/1AAQ/0AA2gujg");
	this.shape_7.setTransform(545.225,396.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C9FFED").s().p("EhMBACLIgIhAIhBAAQgFg1gEg1IBBAAQgDg1gBg3MCZqAAAQgBA3gDA1IgFA/QgFA2gHA1gEBLMABLIBAAAIAAgrIhAAAg");
	this.shape_8.setTransform(544.4976,413.7148,1.0976,1.0976);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C9FFED").s().p("Eg2UAjGQx4rjjrvWMCXwAAAQjsPWx4LjQ2gOj/1AAQ/0AA2gujgEhM0AAfIAAgfQgB0jWhujQWguif0ABQf1gBWgOiQWDOQAdUBIABA1IgBAfg");
	this.shape_9.setTransform(548.25,396.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C9FFED").s().p("Eg12AjGQuEpFlRrbMCN/AAAIAApwMiQ2AAAIgHhAIhBAAQgGg1gDg2MCSHAAAIAAoDMiQsAAAQC0wzTOsbQWguif0ABQf1gBWgOiQWDOQAdUBIABA1IAAAfQgBA3gDA1QgFBXgMBUQiYRez0MyQ2gOj/1AAQ/0AA2gujg");
	this.shape_10.setTransform(545.225,396.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AibJyQguglAAgyQAAg4BpgnQBYgfBXAAQBeAAA7AgQA2AdAAAoQAAAshdAtQhOAlhZAQQgiAHgcAAQhJgBgugkgAiGhJQgciOAAhgQAAg8ALghQhoAQgtAKQgJgXAAhCQAAgUADgTQAAgEAIgBIAMABIAQABQBiAADBg0QC7g0BggxQAEAAACAFQg1B7ggDHQghDDAADKQAABpANBlQgpALg8ATQhBAXgpAUQhUingwj3g");
	this.shape_11.setTransform(1038.975,120.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AlVHyQh/iDABjkQgBi1BXjKQA8iKA/hQQjaAZitCIQgJALgDgMQgQhmgajmQABgFAIgDQJcAzKMAAQANAAgEAQQhQE7gSC9Qg3gJhXgUQgpgNAAgcQAAgPAMg1QALg1AAgbQAAgkgXgQQiIhahQgMQiJEEgBE7QAACwA1BwQA3B7BkAAQBKAABYg7QBSg3ABgjQgBgOgIABQh0gShSg6QhhhEgBhhQABgzBFgiQBEghB2AAQA1AABHAJQDwAgAAB8QAAAogZBCQhBCui4BeQigBSjKAAQkPAAiKiRg");
	this.shape_12.setTransform(937.9,124.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AovgPQAAlACkijQCSiSEEAAQEmAACQCGQBuBmABCWQgBBfg2AnQg2AniIAAQieAAhhgsQhdgrAAhAQAAgiAbgwQAuhUBsgXIB5gNQAIgFAAgGQAAgdhLgqQhUgwhZAAQh/AAhBBhQg5BTgBCIQAABDANBJQA2E8BJB4QA7BiBeAAQAjAAAkgHQB+gWBJhLQAiglBFh7QAKgGAAAEQAFAmAAAaQAACHg7BoQhMCIicAcQh9AWheAAQn9AAAAqUg");
	this.shape_13.setTransform(815.95,122.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ao7GzQAZgNAkAAQA2AABCAgQhokugFpGQAAg1gsgQQgsgHg7gQQgRgJAAg4QABgiAEgIQBDAXD7AaQD+AbCmAAQC9AAEOgMQgrBOgdBcIgrCZIgzAFQggADgSAAQgQAAgBgKQgGhsgdgsQgrhDjEAAIiYAGQgtBpAACXQAAAcADAvIACBFIBngKQBogMAFgMQAFgTAAgUQABgjgZgdIgogpQAigTAfgOQBLggAwgBQAPAfAAA2IgCAzQgCAhgBARQABA3AfCDQADAOgDADQgDADgGgBQhBgJiagGIiPgGQAPEJBjBhQBWBXDKAAQBAAAA4gaQAygVAAgRQAAgIgRAAQgOgBgWACIgnACQiVAAgvhyQgHgTAAgUQAAg8BJguQBOgyCNgVQAqgGAfAAQCqAAAACPQAAARgDAHQgWDLifBTQh3A/jZgBQgiAAj2gMQgsgChrgMQhdgJgvgBQhgAAg0Amg");
	this.shape_14.setTransform(688.35,119.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhTH3QgKg3gJiVQgGhogbg0QglhIhpgyQgGATAABXQAADeBRERIloACQj5ADgJADIgCgKQAAhUAbgFIBYgMQAsgNAEg2QATkeAXiUQApkABajbQgQADgdAAQhRAAgvgrIAwi0QCGBoCQArQB4AkCggBQBDABCcgKQCcgLAjAAQCoAABWBQQBIBEAABvQAACoiyBgQicBWjkABQhLgBhTgIQCqAjBFAyQA5AqAABAQAAAagNA/QgNA/AAAkQAABdBtAAQBXAABtgrQBqgpAAgcQAAgKgQAAQgKAAhBAPQhBAPgpAAQhmAAgbhDQgEgIAAgMQAAgzBBg8QBIhDB2guQA5gVAvAAQBGAAApAuQAjApAAAwQAABjhKBpQhoCTjHAjQiFAXhcAAQkPAAghivgAjskwQhaAdAAArQAABJC3A2QCTArBzAAQBwAABNgVQBZgYAAgrQAAhAiIg7QiIg9iTABQh7gBhbAeg");
	this.shape_15.setTransform(538.575,116.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhTH3QgKg3gJiVQgGhogbg0QglhIhpgyQgGATAABXQAADeBRERIloACQj5ADgJADIgCgKQAAhUAbgFIBYgMQAsgNAEg2QATkeAXiUQApkABajbQgQADgdAAQhRAAgvgrIAwi0QCGBoCQArQB4AkCggBQBDABCcgKQCcgLAjAAQCoAABWBQQBIBEAABvQAACoiyBgQicBWjkABQhLgBhTgIQCqAjBFAyQA5AqAABAQAAAagNA/QgNA/AAAkQAABdBtAAQBXAABtgrQBqgpAAgcQAAgKgQAAQgKAAhBAPQhBAPgpAAQhmAAgbhDQgEgIAAgMQAAgzBBg8QBIhDB2guQA5gVAvAAQBGAAApAuQAjApAAAwQAABjhKBpQhoCTjHAjQiFAXhcAAQkPAAghivgAjskwQhaAdAAArQAABJC3A2QCTArBzAAQBwAABNgVQBZgYAAgrQAAhAiIg7QiIg9iTABQh7gBhbAeg");
	this.shape_16.setTransform(374.125,116.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Am5HIQiii7AAkJQAAj7Cmi5QC4jMEkAAQI1AAAAGDQAACPhJDAQhVDdh/CMQiuC+jgAAQjPAAibi1gAkpjOQiVBYAABpQAAB6CLBQQB3BGCIAAQCpAACOhhQCJheABhpQgBhrh4hJQh1hJilAAQiVAAiOBUg");
	this.shape_17.setTransform(230.35,127.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AougPQAAlACjijQCTiSEDAAQElAACRCGQBuBmABCWQgBBfg2AnQg2AniIAAQieAAhhgsQhdgrAAhAQAAgiAbgwQAuhUBrgXIB6gNQAIgFAAgGQAAgdhLgqQhTgwhaAAQh/AAhBBhQg5BTgBCIQABBDANBJQA1E8BJB4QA7BiBeAAQAjAAAkgHQB+gWBJhLQAiglBFh7QAKgGAAAEQAEAmABAaQAACHg7BoQhLCIidAcQh9AWheAAQn9AAABqUg");
	this.shape_18.setTransform(110.9,122.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#66FFCC").s().p("Eg10AjGQz0syiYxeIgIhAIhAAAQgGg1gDg2QgDg1AAg3IBAAAIAAgfQgB0jWhujQWguif0ABQf1gBWgOiQWhOjAAUjQgBBGgEBFQgFBXgLBUQiYRez0MyQ2gOj/1AAQ/0AA2gujgEBLNAD2IBBAAIAAjXIhBAAg");
	this.shape_19.setTransform(545.05,396.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C9FFED").s().p("Eg10AjGQz0syiYxeIgIhAIhAAAQgGg1gDg2QgDg1AAg3IBAAAIAAgfQgB0jWhujQWguif0ABQf1gBWgOiQWhOjAAUjQgBBGgEBFQgFBXgLBUQiYRez0MyQ2gOj/1AAQ/0AA2gujgEBLNAD2IBBAAIAAjXIhBAAg");
	this.shape_20.setTransform(545.05,396.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF0000").s().p("EBKZA6OQiEgqiJh6QgggcjCjJQiaifjXiwQh/hnkLjKIkHjFQjjiqiPhmIgGgFQlgj7koi2QkciumwjkQnnj9jxiCQkrihmlj0IgHgEQi7CEjFCOQyuNppcGtQkODAjmCeQihBtiNBdQiEBWhzBJQpNFvoMDnQiPA/heAaQiGAlhygKQiQgNh7hYQh6hZg6iFQg5iFAUiWQAUiWBahxQBVhqCdhSQA9gfDlheQE6iBFdjOQBRgwBTgzIAMgIIAfgUQENisHllbIfb2dQopk6k1i0QqwmRnflJQjJiKkTjLImCkeIhUg+QiGhih7hYQmakkksi0Qi4hvhHg2QiGhnhAh0Qg+hwgCiFQgDiEA5hzQA4hyBshOQBrhOB/gTQCigYC9BLQCHA1C7B8QDRCKEeDTIHnFpIBKA3QCTBqCYBsIBiBEQM/JCP4JaQGxEBJGFGIDNiQQH+lhGmkGIHjknQEkiyC7h8QFPjfEBjbQBNhCBHhCIBNhMIA4g5QCvi2ApglQCDhzB+gnQCAgpCKAeQCJAeBmBaQBkBaAwCEQAvCEgVCGQgWCShmCUQg7BUhiBmIg9A8IhYBTQmXF6pWGSQjmCblmDgIpRF1QjMCCjhCWIFFCvIAKAGQHrEJDbB7QGQDgEzDAQFEDKFhD5QCbBtCrB8QCIBkCSBuIApAfIAIAGQENDLC+CaQD0DFDFC0QC4CoBdCKQB/C8ABC3QABB9g7B0Qg7B0hmBKQhlBJiAAVQgtAHgtAAQhQAAhNgYg");
	this.shape_21.setTransform(554.4433,382.192);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C9FFED").s().p("EgtBAoTQCNhdCghtQDnieENjAQJdmtSutqQDFiNC6iEIAIAEQGkD0EsChQDxCCHnD9QGwDkEcCuQEoC2FfD7IAHAEQCPBnDjCpQ1rM297ABQ5gAAzhpWgEhM0AAAQgBx5RFtWIGCEeQETDLDJCJQHfFKKwGQQE0C1IpE5I/aWdQnlFbkOCtIgeAUIgNAIQhSAzhRAwQvztAAAxPgEBBEAZdQiShviJhjQiqh8ibhtQlhj6lEjKQkzjAmQjfQjch7nqkIIgLgGIlFiwQDiiXDLiBIJSl1QFljgDmicQJXmSGXl5QSYNqAASkQAAOdrJLfIgpgfgAvH2VQv4patApCQTLo2Y0AAQYEAASuITQkADblPDeQi7B9kkCyInjEnQmmEGn/FhIjOCQQpElHmxkAg");
	this.shape_22.setTransform(548.25,396.3);

	this.movieClip_8 = new lib.Symbol4();
	this.movieClip_8.name = "movieClip_8";
	this.movieClip_8.setTransform(-122.45,399.8);

	this.movieClip_17 = new lib.Symbol8();
	this.movieClip_17.name = "movieClip_17";
	this.movieClip_17.setTransform(-122.45,403.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_3,p:{alpha:1}},{t:this.movieClip_4,p:{alpha:1}}]}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:230.7,y:196.9,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},8).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:1.24,skewX:-36.2506,x:288.8,y:233.5,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:2.1958,skewX:-49.0347,x:372.1,y:296.7,regX:112,regY:112,scaleX:1.3153,skewY:20.4713,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},6).to({state:[{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:1.3173,skewX:-40.612,x:488.15,y:368.55,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},4).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_2,p:{scaleY:1.1242,skewX:0,x:554.5,y:409,regX:112,regY:111.9,scaleX:1.1242,skewY:0,alpha:1}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:554.4,y:119.1,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:850.85,y:190.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:944.75,y:467.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:720.95,y:667.85,alpha:1}},{t:this.instance_1,p:{x:400.15,y:680.6,alpha:1}},{t:this.instance,p:{x:168.4,y:500.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:561.55,y:111.9,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:859.25,y:193.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:935.7,y:492.25,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:697,y:676.25,alpha:1}},{t:this.instance_1,p:{x:355.5,y:680.6,alpha:1}},{t:this.instance,p:{x:156.75,y:472.95,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:563.65,y:110.5,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:860.45,y:200.05,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:928.15,y:501.75,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:671.95,y:677.55,alpha:1}},{t:this.instance_1,p:{x:330.6,y:667.85,alpha:1}},{t:this.instance,p:{x:150.75,y:431.5,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:575.9,y:106.45,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:874.85,y:214.1,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:920.75,y:521.9,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:619.95,y:688.1,alpha:1}},{t:this.instance_1,p:{x:285.3,y:632.7,alpha:1}},{t:this.instance,p:{x:155.8,y:335.55,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},8).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:583.05,y:111,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:879.85,y:219.75,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:897.05,y:547.6,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:562.75,y:713.85,alpha:1}},{t:this.instance_1,p:{x:239.85,y:602.05,alpha:1}},{t:this.instance,p:{x:191.35,y:249.5,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_5,p:{x:585.05,y:115.35,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:883,y:222.6,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:888.6,y:557.4,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:527.15,y:696.05,alpha:1}},{t:this.instance_1,p:{x:209.35,y:570.3,alpha:1}},{t:this.instance,p:{x:221.85,y:224.55,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:119.1,regX:111.9,x:587.2,scaleY:1,alpha:1}},{t:this.movieClip_7,p:{alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:119.1,regX:111.9,x:587.2,scaleY:1,alpha:1}},{t:this.movieClip_7,p:{alpha:1}}]},1).to({state:[{t:this.shape_1},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:119.1,regX:111.9,x:587.2,scaleY:1,alpha:1}},{t:this.movieClip_7,p:{alpha:1}}]},1).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.8,scaleX:1.1881,skewX:39.2174,skewY:71.9041,y:185.1,regX:111.9,x:587.2,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:554.4,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.6,scaleX:1.8267,skewX:29.9992,skewY:86.8089,y:233.7,regX:112,x:582.5,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7148,skewX:0,x:552.15,y:426.45,regX:112,regY:111.9,scaleX:1.6841,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.6,scaleX:1.2684,skewX:29.9992,skewY:67.9669,y:342.95,regX:112.2,x:582.5,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7148,skewX:0,x:552.2,y:426.45,regX:112,regY:111.9,scaleX:1.7842,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.instance_5,p:{x:637.35,y:408.95,regX:112,scaleX:1.0969,scaleY:1.0969,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1.0969,skewX:0,x:449.15,y:408.95,regX:111.9,regY:111.9,scaleX:1.0969,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:884.9,y:226.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:884.95,y:568.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:508.9,y:680.5,alpha:1}},{t:this.instance_1,p:{x:203.2,y:534.5,alpha:1}},{t:this.instance,p:{x:251.65,y:195.85,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:895,y:234.55,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:868.5,y:600,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:443.6,y:685.9,alpha:1}},{t:this.instance_1,p:{x:151.25,y:473.45,alpha:1}},{t:this.instance,p:{x:311.85,y:145.9,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},4).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:901.15,y:238.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:857.85,y:622.75,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:405.15,y:680.5,alpha:1}},{t:this.instance_1,p:{x:129.45,y:408.95,alpha:1}},{t:this.instance,p:{x:388.75,y:117.2,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:910.75,y:241.2,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:840.8,y:645.8,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:346.5,y:680.5,alpha:1}},{t:this.instance_1,p:{x:122.7,y:346.25,alpha:1}},{t:this.instance,p:{x:480.35,y:117.2,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:913.9,y:242.9,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:828.8,y:659.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:313.55,y:670.95,alpha:1}},{t:this.instance_1,p:{x:128.7,y:318.25,alpha:1}},{t:this.instance,p:{x:512.75,y:117.2,alpha:1}},{t:this.instance_5,p:{x:628.95,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_10,p:{x:916.75,y:244.7,scaleX:1,scaleY:1,regX:111.9,regY:112.4}},{t:this.movieClip_9}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_10,p:{x:916.75,y:244.7,scaleX:1,scaleY:1,regX:111.9,regY:112.4}},{t:this.movieClip_9}]},1).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:916.75,y:244.7,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},9).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:830,y:273.3,regX:112,scaleY:1.2523,skewX:52.0114,skewY:14.9992,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:782.05,y:291.55,regX:112.2,scaleY:1.4266,skewX:51.7986,skewY:-5.8211,regY:112.7,scaleX:1.3089,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:660.1,y:353.5,regX:111.9,scaleY:2.5724,skewX:63.4349,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_4,p:{x:591.9,y:391.65,regX:112.1,scaleY:2.1728,skewX:63.4351,skewY:21.2876,regY:112.4,scaleX:0.6032,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:0.7738,skewX:0,skewY:0,y:412.2,regX:111.9,x:619.8,scaleY:0.7738,alpha:1}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7738,skewX:0,x:487.1,y:412.2,regX:112,regY:111.9,scaleX:0.7738,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:1}},{t:this.instance,p:{x:560.4,y:117.2,alpha:1}},{t:this.instance_4,p:{x:754.95,y:409.45,regX:111.9,scaleY:1.1188,skewX:0,skewY:0,regY:112.4,scaleX:1.1188,alpha:1}},{t:this.instance_5,p:{x:557.05,y:408.9,regX:111.9,scaleX:1.1188,scaleY:1.1188,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1.1188,skewX:0,x:366.65,y:408.9,regX:111.9,regY:111.9,scaleX:1.1188,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:834.25,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:278.95,y:661.95,alpha:1}},{t:this.instance_1,p:{x:153.4,y:241.95,alpha:1}},{t:this.instance,p:{x:598.25,y:96.35,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:845.25,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:266.85,y:665,alpha:1}},{t:this.instance_1,p:{x:168.4,y:220,alpha:1}},{t:this.instance,p:{x:624.25,y:95.05,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:861.2,y:651.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:241.65,y:661.95,alpha:1}},{t:this.instance_1,p:{x:188.6,y:190.55,alpha:1}},{t:this.instance,p:{x:721.95,y:100.25,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:871.4,y:641.65,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:224.7,y:652.5,alpha:1}},{t:this.instance_1,p:{x:224.7,y:152.7,alpha:1}},{t:this.instance,p:{x:803.7,y:127.5,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_3,p:{x:877.65,y:635.4,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:219.6,y:649.85,alpha:1}},{t:this.instance_1,p:{x:244.05,y:143.7,alpha:1}},{t:this.instance,p:{x:849.45,y:142.55,alpha:1}},{t:this.instance_4,p:{x:734.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_10,p:{x:734.35,y:409.45,scaleX:1,scaleY:1,regX:111.9,regY:112.4}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_3,p:{x:878.85,y:632.7,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_10,p:{x:734.35,y:409.45,scaleX:1,scaleY:1,regX:111.9,regY:112.4}},{t:this.instance_5,p:{x:557.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_3,p:{x:878.85,y:632.7,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:387.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},1).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:878.85,y:632.7,scaleX:1,regY:111.9,alpha:1}},{t:this.movieClip_11,p:{alpha:1}}]},7).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:878.85,y:632.7,scaleX:1,regY:111.9,alpha:1}},{t:this.movieClip_11,p:{alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:112,scaleY:1.2864,skewX:-43.1678,skewY:-4.188,x:801.35,y:595.25,scaleX:1,regY:111.9,alpha:1}},{t:this.movieClip_11,p:{alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:2.1111,skewX:-52.1927,skewY:21.9781,x:684.75,y:523.15,scaleX:1.7365,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:808.65,y:409.45,regX:111.9,scaleY:0.7917,skewX:0,skewY:0,regY:112.4,scaleX:1.4283,alpha:1}},{t:this.instance_5,p:{x:556,y:409.05,regX:111.9,scaleX:1.4283,scaleY:0.7917,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7917,skewX:0,x:312.9,y:409.05,regX:111.9,regY:111.9,scaleX:1.4283,skewY:0,alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_10,p:{x:808.65,y:409.45,scaleX:1.4283,scaleY:0.7917,regX:111.9,regY:112.4}},{t:this.instance_5,p:{x:556,y:409.05,regX:111.9,scaleX:1.4283,scaleY:0.7917,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7917,skewX:0,x:312.9,y:409.05,regX:111.9,regY:111.9,scaleX:1.4283,skewY:0,alpha:1}},{t:this.instance_3,p:{x:590.35,y:451.35,regX:112,scaleY:1.2864,skewX:-43.1678,skewY:-4.188,regY:111.9,scaleX:1,alpha:1}}]},5).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_10,p:{x:750.25,y:417.3,scaleX:1.0912,scaleY:0.6049,regX:112,regY:112.5}},{t:this.instance_5,p:{x:557.25,y:417,regX:112,scaleX:1.0912,scaleY:0.6049,regY:112,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.6049,skewX:0,x:371.5,y:417,regX:112,regY:112,scaleX:1.0912,skewY:0,alpha:1}},{t:this.instance_3,p:{x:583.4,y:449.35,regX:112,scaleY:0.9828,skewX:-43.1674,skewY:-4.1873,regY:112,scaleX:0.764,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1.1103,skewX:0,skewY:0,x:821.85,y:411.65,scaleX:1.1103,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:640.6,y:409.35,regX:112,scaleY:1.1103,skewX:0,skewY:0,regY:112.4,scaleX:1.1103,alpha:1}},{t:this.instance_5,p:{x:444.2,y:408.8,regX:112,scaleX:1.1103,scaleY:1.1103,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:1.1103,skewX:0,x:255.15,y:408.8,regX:111.9,regY:111.9,scaleX:1.1103,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:215.65,y:647.65,alpha:1}},{t:this.instance_1,p:{x:254.1,y:141.25,alpha:1}},{t:this.instance,p:{x:878.85,y:161.1,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:145.3,y:602.05,alpha:1}},{t:this.instance_1,p:{x:314.85,y:94.35,alpha:1}},{t:this.instance,p:{x:949.15,y:228.2,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:98.4,y:544.25,alpha:1}},{t:this.instance_1,p:{x:406.55,y:89.05,alpha:1}},{t:this.instance,p:{x:1017.4,y:335.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:68.55,y:488.85,alpha:1}},{t:this.instance_1,p:{x:488.65,y:69.85,alpha:1}},{t:this.instance,p:{x:1017.4,y:469.15,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:54.7,y:445.15,alpha:1}},{t:this.instance_1,p:{x:536.6,y:69.85,alpha:1}},{t:this.instance,p:{x:1005.7,y:525.65,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:59.45,y:384.45,alpha:1}},{t:this.instance_1,p:{x:580.35,y:79.25,alpha:1}},{t:this.instance,p:{x:973.7,y:558.55,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:59.45,y:320.55,alpha:1}},{t:this.instance_1,p:{x:662.4,y:79.25,alpha:1}},{t:this.instance,p:{x:886.2,y:638,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:102.05,y:234.2,alpha:1}},{t:this.instance_1,p:{x:744.45,y:111.9,alpha:1}},{t:this.instance,p:{x:793.6,y:661.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:168.4,y:180.9,alpha:1}},{t:this.instance_1,p:{x:816.9,y:133.2,alpha:1}},{t:this.instance,p:{x:681.75,y:688.55,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.instance_2,p:{x:199.3,y:164.95,alpha:1}},{t:this.instance_1,p:{x:858.5,y:148.15,alpha:1}},{t:this.instance,p:{x:630.35,y:688.55,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_2,p:{x:242.2,y:147.4,alpha:1}},{t:this.instance_1,p:{x:882.8,y:170,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}},{t:this.instance_3,p:{x:793.65,y:411.5,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:242.2,y:147.4,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_18,p:{alpha:1}}]},6).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:112,scaleY:1.2321,skewX:-35.7476,x:274.6,y:170,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_13}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1.4719,skewX:-47.2022,x:339.05,y:187.7,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_13}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:2.0142,skewX:-51.7621,x:394.1,y:234.65,skewY:8.471,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_13}]},3).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:0.9633,skewX:-33.6933,x:495.2,y:288.45,skewY:29.7415,regY:112,scaleX:3.1443,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_13}]},4).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_13},{t:this.movieClip_14,p:{regX:111.8,scaleY:2.0142,skewX:-51.7621,x:536.5,y:335.4,skewY:8.471,regY:112,scaleX:1,alpha:1}}]},6).to({state:[{t:this.shape_2},{t:this.movieClip_12,p:{regX:111.9,scaleY:0.8756,skewX:0,skewY:0,x:763.1,y:411.4,scaleX:0.8756,regY:112,alpha:1}},{t:this.instance_4,p:{x:620.15,y:409.55,regX:111.9,scaleY:0.8756,skewX:0,skewY:0,regY:112.4,scaleX:0.8756,alpha:1}},{t:this.instance_5,p:{x:465.25,y:409.15,regX:112,scaleX:0.8756,scaleY:0.8756,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.8756,skewX:0,x:316.2,y:409.15,regX:111.9,regY:111.9,scaleX:0.8756,skewY:0,alpha:1}},{t:this.movieClip_13}]},2).to({state:[{t:this.shape_3},{t:this.movieClip_12,p:{regX:111.9,scaleY:0.8756,skewX:0,skewY:0,x:763.1,y:411.4,scaleX:0.8756,regY:112,alpha:1}},{t:this.instance_4,p:{x:620.15,y:409.55,regX:111.9,scaleY:0.8756,skewX:0,skewY:0,regY:112.4,scaleX:0.8756,alpha:1}},{t:this.instance_5,p:{x:465.25,y:409.15,regX:112,scaleX:0.8756,scaleY:0.8756,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.8756,skewX:0,x:316.2,y:409.15,regX:111.9,regY:111.9,scaleX:0.8756,skewY:0,alpha:1}},{t:this.movieClip_13},{t:this.movieClip_14,p:{regX:111.9,scaleY:0.832,skewX:0,x:827.9,y:406.45,skewY:0,regY:111.9,scaleX:0.832,alpha:1}}]},2).to({state:[{t:this.shape_4},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:882.8,y:170,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},3).to({state:[{t:this.shape_4},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:851.55,y:147.05,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_4},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:830.8,y:141,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:890.9,y:405.3,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:704.25,y:407.9,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:540.95,y:405.85,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:364.05,y:405.35,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:193.85,y:405.35,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1332.275,y:293.325}},{t:this.instance_1,p:{x:814.25,y:131.6,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:890.9,y:405.3,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:704.25,y:407.9,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:540.95,y:405.85,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:364.05,y:405.35,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:193.85,y:405.35,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1332.275,y:293.325}},{t:this.instance_1,p:{x:775.85,y:127.55,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:890.9,y:405.3,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:704.25,y:407.9,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:540.95,y:405.85,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:364.05,y:405.35,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:193.85,y:405.35,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1332.275,y:293.325}},{t:this.instance_1,p:{x:754.55,y:115.25,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:731.05,y:111.9,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:693.55,y:118.6,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:674.5,y:111.9,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:644.55,y:111.9,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:605,y:111.9,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.instance_1,p:{x:605,y:111.9,alpha:1}},{t:this.instance,p:{x:582.4,y:682.85,alpha:1}}]},2).to({state:[{t:this.shape_1},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:582.4,y:118.95,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_16,p:{alpha:1}}]},2).to({state:[{t:this.shape_5},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:582.4,y:118.95,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_16,p:{alpha:1}}]},6).to({state:[{t:this.shape_5},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.8,scaleX:0.5201,scaleY:2.0738,x:554.5,y:266.8,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.movieClip_16,p:{alpha:1}}]},9).to({state:[{t:this.shape_6},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.8,scaleX:0.5201,scaleY:2.0738,x:554.5,y:266.8,alpha:1}},{t:this.movieClip_14,p:{regX:112,scaleY:0.7849,skewX:0,x:943.75,y:409.25,skewY:0,regY:112,scaleX:1.1229,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:0.7849,skewX:0,skewY:0,x:734.05,y:411.3,scaleX:1.1229,regY:112,alpha:1}},{t:this.instance_4,p:{x:550.7,y:409.6,regX:111.9,scaleY:0.7849,skewX:0,skewY:0,regY:112.4,scaleX:1.1229,alpha:1}},{t:this.instance_5,p:{x:352.05,y:409.3,regX:111.9,scaleX:1.1229,scaleY:0.7849,regY:112,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7849,skewX:0,x:161,y:409.25,regX:112,regY:111.9,scaleX:1.1229,skewY:0,alpha:1}},{t:this.movieClip_16,p:{alpha:1}}]},5).to({state:[{t:this.shape_6},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_14,p:{regX:112,scaleY:0.7849,skewX:0,x:943.75,y:409.25,skewY:0,regY:112,scaleX:1.1229,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:0.7849,skewX:0,skewY:0,x:734.05,y:411.3,scaleX:1.1229,regY:112,alpha:1}},{t:this.instance_4,p:{x:550.7,y:409.6,regX:111.9,scaleY:0.7849,skewX:0,skewY:0,regY:112.4,scaleX:1.1229,alpha:1}},{t:this.instance_5,p:{x:352.05,y:409.3,regX:111.9,scaleX:1.1229,scaleY:0.7849,regY:112,alpha:1}},{t:this.movieClip_2,p:{scaleY:0.7849,skewX:0,x:161,y:409.25,regX:112,regY:111.9,scaleX:1.1229,skewY:0,alpha:1}},{t:this.movieClip_16,p:{alpha:1}}]},3).to({state:[{t:this.shape_7},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_16,p:{alpha:1}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:990.35,y:411.5,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:812.2,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:625.55,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:462.25,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:285.35,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:115.15,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_16,p:{alpha:1}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1.0976,scaleY:1.0976,x:1033.05,y:411.6,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1.0976,skewX:0,x:837.5,y:408.85,skewY:0,regY:112,scaleX:1.0976,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1.0976,skewX:0,skewY:0,x:632.65,y:411.6,scaleX:1.0976,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:453.4,y:409.35,regX:111.9,scaleY:1.0976,skewX:0,skewY:0,regY:112.4,scaleX:1.0976,alpha:1}},{t:this.instance_5,p:{x:259.2,y:408.8,regX:111.9,scaleX:1.0976,scaleY:1.0976,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1.0976,skewX:0,x:72.45,y:408.8,regX:111.9,regY:111.9,scaleX:1.0976,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_10},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_16,p:{alpha:1}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:990.35,y:411.5,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:812.2,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:625.55,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:462.25,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:285.35,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:115.15,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},2).to({state:[{t:this.shape_19},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:990.35,y:411.5,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:812.2,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:625.55,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:462.25,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:285.35,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:115.15,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},21).to({state:[{t:this.shape_20},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:990.35,y:411.5,alpha:1}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:812.2,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:1}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:625.55,y:411.5,scaleX:1,regY:111.9,alpha:1}},{t:this.instance_4,p:{x:462.25,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:1}},{t:this.instance_5,p:{x:285.35,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:1}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:115.15,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:1}}]},45).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_3,p:{alpha:0.5}},{t:this.movieClip_4,p:{alpha:0.5}}]},311).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_3,p:{alpha:0.5}},{t:this.movieClip_4,p:{alpha:0.5}}]},44).to({state:[{t:this.shape_21},{t:this.shape_22},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:119.1,regX:111.9,x:587.2,scaleY:1,alpha:0.5}},{t:this.movieClip_7,p:{alpha:0.5}}]},6).to({state:[{t:this.movieClip_8}]},39).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:0.5}},{t:this.instance_4,p:{x:916.75,y:244.7,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:0.5}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:0.5}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:0.5}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:0.5}},{t:this.instance,p:{x:560.4,y:117.2,alpha:0.5}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:0.5}}]},18).to({state:[{t:this.shape_21},{t:this.shape_22},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_6,p:{regY:111.9,scaleX:1,skewX:0,skewY:0,y:408.95,regX:111.9,x:628.95,scaleY:1,alpha:0.5}},{t:this.instance_4,p:{x:916.75,y:244.7,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:0.5}},{t:this.instance_3,p:{x:819.5,y:661.95,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:111.9,scaleX:1,alpha:0.5}},{t:this.instance_2,p:{x:295.05,y:661.95,alpha:0.5}},{t:this.instance_1,p:{x:153.4,y:269.55,alpha:0.5}},{t:this.instance,p:{x:560.4,y:117.2,alpha:0.5}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:457.45,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:0.5}}]},44).to({state:[{t:this.shape_21},{t:this.shape_22},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:878.85,y:632.7,scaleX:1,regY:111.9,alpha:0.5}},{t:this.movieClip_11,p:{alpha:0.5}}]},10).to({state:[{t:this.shape_1},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:878.85,y:632.7,scaleX:1,regY:111.9,alpha:0.5}},{t:this.movieClip_11,p:{alpha:0.5}}]},40).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:242.2,y:147.4,skewY:0,regY:111.9,scaleX:1,alpha:0.5}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:793.65,y:411.5,scaleX:1,regY:111.9,alpha:0.5}},{t:this.instance_4,p:{x:630.35,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:0.5}},{t:this.instance_5,p:{x:453.45,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:0.5}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:283.25,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:0.5}},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_18,p:{alpha:0.5}}]},4).to({state:[{t:this.shape_21},{t:this.shape_22},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:878.85,y:632.7,scaleX:1,regY:111.9,alpha:0.5}},{t:this.movieClip_11,p:{alpha:0.5}}]},45).to({state:[{t:this.shape_21},{t:this.shape_22},{t:this.shape,p:{x:-1263.725,y:331.725}},{t:this.movieClip_15,p:{regY:111.9,scaleX:1,scaleY:1,x:582.4,y:118.95,alpha:0.5}},{t:this.movieClip_14,p:{regX:111.9,scaleY:1,skewX:0,x:900.35,y:408.9,skewY:0,regY:111.9,scaleX:1,alpha:0.5}},{t:this.movieClip_12,p:{regX:111.9,scaleY:1,skewX:0,skewY:0,x:713.7,y:411.5,scaleX:1,regY:111.9,alpha:0.5}},{t:this.instance_4,p:{x:550.4,y:409.45,regX:111.9,scaleY:1,skewX:0,skewY:0,regY:112.4,scaleX:1,alpha:0.5}},{t:this.instance_5,p:{x:373.5,y:408.95,regX:111.9,scaleX:1,scaleY:1,regY:111.9,alpha:0.5}},{t:this.movieClip_2,p:{scaleY:1,skewX:0,x:203.3,y:408.95,regX:111.9,regY:111.9,scaleX:1,skewY:0,alpha:0.5}},{t:this.movieClip_16,p:{alpha:0.5}}]},9).to({state:[{t:this.movieClip_17}]},40).to({state:[{t:this.movieClip_17}]},30).wait(1));

	// chord
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag0CEIAAggIAkAAIAAjIIgkAAIAAgfIBHAAIAADnIAjAAIAAAgg");
	this.shape_23.setTransform(73.1,764.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Ag0CEIAAggIAkAAIAAjIIgkAAIAAgfIBHAAIAADnIAjAAIAAAgg");
	this.shape_24.setTransform(51.95,764.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhdBiQglgnAAg6QAAg+AlglQAlgmA5AAQA0AAAkAdIAAgYIAiAAIAABVIgiAAQgMgagXgOQgYgOgbAAQgmAAgZAcQgaAdAAArQAAAsAbAdQAbAcAlAAQAfAAAZgUQAZgUAKgkIAjATQgMAsgjAZQgkAYguAAQg7AAgkgng");
	this.shape_25.setTransform(16.325,763.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgWBcIAAgvIAuAAIAAAvgAgWgsIAAgvIAuAAIAAAvg");
	this.shape_26.setTransform(97.55,722.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgvCEIAAgfIAgAAIAAjJIggAAIAAgfIBDAAIAADoIAdAAIAAAfg");
	this.shape_27.setTransform(86.1,718.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgwCEIAAgfIAhAAIAAjJIghAAIAAgfIBFAAIAADoIAcAAIAAAfg");
	this.shape_28.setTransform(74.7,718.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhCBHQgegbgBgsQAAgpAegcQAdgbAmAAQAkAAAfAbQAdAaABA0IiZAAQADAaARAQQAQAPAaAAQAmAAAWgfIAfAPQgPAYgZAMQgZAMgbgBQgqABgdgbgAgkg1QgPAOgEAWIB0AAQgFgTgQgPQgQgRgYABQgVAAgPAOg");
	this.shape_29.setTransform(57.85,722.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhwCHIAAggIAiAAIAAjKIgfAAIAAggIBDAAIAAAdQAbggAmAAQAnAAAZAbQAaAbAAAqQAAAsgcAaQgcAagjAAQgjAAgdgcIAABJIAkAAIAAAggAgYhTQgSARAAAeQAAAPAGAOQAGANAOAJQAOAKARAAQAaAAARgSQARgQAAgeQAAgegSgQQgRgRgXAAQgXAAgSATg");
	this.shape_30.setTransform(33.825,726.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("Ag4BvIAAAWIghAAIAAhgIAhAAIAAAXQAYArAlAAQAUAAANgMQAOgMAAgTQAAgTgLgIQgLgJgegIQgjgJgSgIQgRgIgKgQQgKgQAAgVQAAgiAWgUQAWgUAiAAQAfAAAbAVIAAgSIAgAAIAABRIggAAIAAgTQgVgegiAAQgWAAgMAKQgLAKAAAOQAAAKAGAIQAFAIAKAEQAJAEAaAHQAjAJAQAIQAPAIAMARQALATAAAYQAAAigYAWQgYAWgjAAQgjAAgdgag");
	this.shape_31.setTransform(11.975,718.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23}]}).wait(1000));

	// bg
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FFFFCC").ss(1,1,1).p("ECFuAAAUAAAAjfgnLAZGUgnKAZGg3ZAAAUg3YAAAgnKgZGUgnKgZGAAAgjfUAAAgjeAnKgZGUAnKgZGA3YAAAUA3ZAAAAnKAZGUAnLAZGAAAAjeg");
	this.shape_32.setTransform(552.6,391.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#BCFFA6").s().p("EhejA8lUgnKgZGAABgjfUgABgjeAnKgZGUAnLgZGA3YAAAUA3ZAAAAnKAZGUAnKAZGAAAAjeUAAAAjfgnKAZGUgnKAZGg3ZAAAUg3YAAAgnLgZGg");
	this.shape_33.setTransform(552.6,391.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33},{t:this.shape_32}]},314).wait(686));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-863.4,242,2480.2,698.6);
// library properties:
lib.properties = {
	id: 'E91F0BD5759F35408668A3AE5C3241EC',
	width: 1100,
	height: 800,
	fps: 36,
	color: "#B0FFE5",
	opacity: 1.00,
	manifest: [
		{src:"wrong_sfxwav.mp3", id:"wrong_sfxwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E91F0BD5759F35408668A3AE5C3241EC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;