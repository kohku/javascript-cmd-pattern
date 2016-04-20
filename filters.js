var commandBase = function(target){
    this.target = target
  };
commandBase.prototype.execute = function(){};

var undoableCommandBase = function(target){
    commandBase.call(this, target);
  };
undoableCommandBase.prototype = Object.create(commandBase.prototype);
undoableCommandBase.prototype.constructor = undoableCommandBase;
undoableCommandBase.prototype.undo = function(){};

var cssFilterCommandBase = function(target){
  undoableCommandBase.call(this, target);
  this.ccsFilter = undefined;
}
cssFilterCommandBase.prototype = Object.create(undoableCommandBase.prototype);
cssFilterCommandBase.prototype.contructor = cssFilterCommandBase;
cssFilterCommandBase.prototype.execute = function(){
  this.target['-webkit-filter'] = this.target['filter'] = 
    (this.target['filter'] || '') + this.cssFilter;
  return this;     
}
cssFilterCommandBase.prototype.undo = function(){
  this.target['-webkit-filter'] = this.target['filter'] = 
    this.target['filter'] && this.target['filter'].lastIndexOf(this.cssFilter) != -1 ?
    this.target['filter'].replace(this.cssFilter, '') : this.target['filter'];
  return this;
}

var grayscaleCommand = (function(){
  function grayscale(target){
    cssFilterCommandBase.call(this, target)
    this.cssFilter = ' grayscale(1)';
  }
  return function(target){
    grayscale.prototype = Object.create(cssFilterCommandBase.prototype);
    grayscale.prototype.constructor = cssFilterCommandBase;
    
    return new grayscale(target);
  }
})();

var blurCommand = (function(){
  function blur(target){
    cssFilterCommandBase.call(this, target)
    this.cssFilter = ' blur(5px)';
  }
  return function(target){
    blur.prototype = Object.create(cssFilterCommandBase.prototype);
    blur.prototype.constructor = cssFilterCommandBase;
    
    return new blur(target);
  }
})();

var contrastCommand = (function(){
  function contrast(target){
    cssFilterCommandBase.call(this, target)
    this.cssFilter = ' contrast(4)';
  }
  return function(target){
    contrast.prototype = Object.create(cssFilterCommandBase.prototype);
    contrast.prototype.constructor = cssFilterCommandBase;
    
    return new contrast(target);
  }
})();

var invertCommand = (function(){
  function invert(target){
    cssFilterCommandBase.call(this, target)
    this.cssFilter = ' invert(.8)';
  }
  return function(target){
    invert.prototype = Object.create(cssFilterCommandBase.prototype);
    invert.prototype.constructor = cssFilterCommandBase;
    
    return new invert(target);
  }
})();