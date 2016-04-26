import { grayscaleCommand, blurCommand, contrastCommand, invertCommand, cssFilterCommandBase, undoableCommandBase, commandBase } from './filters'

export class FilteredCanvasController{
  constructor(){
   
    this.outputStyle = { }
    
    this.commandChain = []
    
    this.commands = [{
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
    }]
  }
    
  apply(name){
    let cmd = this.commands.find(function(cmd){
      return cmd.name == name
    });
    console.log("adding the " + name + " to the command chain and executing it");
    this.commandChain.push(new cmd.command(this.outputStyle).execute())
  }
    
  undo(){
    if (this.commandChain.length > 0){
      if (this.commandChain[this.commandChain.length-1] instanceof undoableCommandBase){           
        let cmd = this.commandChain.pop()
        console.log("Undoing last command")
        cmd.undo()
      }
    } else{
      console.log("Nothing to undo")
    }
  }
}