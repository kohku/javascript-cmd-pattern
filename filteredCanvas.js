(function(angular){
  'use sctrict';
  function FilteredCanvasController($scope, $element, $attrs){
    
    $scope.outputStye = { };
    
    var ctrl = this;
    
    ctrl.commandChain = [];
    
    ctrl.commands = [{
      name: 'grayscale',
      command: grayscaleCommand
    }, {
      name: 'blur',
      command: blurCommand
    }, {
      name: 'contrast',
      command: contrastCommand
    }, {
      name: 'invert',
      command: invertCommand
    }];
    
    ctrl.apply = function(name){
      var cmd = ctrl.commands.find(function(cmd){
        return cmd.name == name;
      });
      console.log("adding the " + name + " to the command chain and executing it");
      ctrl.commandChain.push(new cmd.command($scope.outputStye).execute());
    }
    
    ctrl.undo = function(){
      if (ctrl.commandChain.length > 0){
        if (ctrl.commandChain[ctrl.commandChain.length-1] instanceof undoableCommandBase){           
          cmd = ctrl.commandChain.pop();
          console.log("Undoing last command");
          cmd.undo();
        }
      } else{
        console.log("Nothing to undo");
      }
    }
  }
  
  angular.module('CanvasApp').component('filteredCanvas', {
    templateUrl: 'filteredCanvas.html',
    controller: FilteredCanvasController
  });
  
})(window.angular);