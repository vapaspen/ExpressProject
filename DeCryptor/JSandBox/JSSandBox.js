/* Module containing the actual sandbox object. Use the new Keyword to instantiate this so that the correct global context is maintained.
    When instantiated, this builds the run environment for the sandbox.

    :Args:
        :fileName: Name of the Script to pass on to WScript as part of Environment Setup.

*/

var SandBox = function(fileName){
    this.LogObj = {};
    LogObj = this.LogObj
    WScript = require('./WScript/WScriptObj.js')(LogObj, fileName);
    GetObject = require('./GetObjectFunc.js')(LogObj)

    Object.prototype.ActiveXObject = function(call){
        return WScript.CreateObject(call);
    }

    ScriptEngine = function(){
        LogObj['ScriptEngine'] ={
            'Call':arguments
        };
        return 'JScript'
    }

    eval = require('./EvalProxy.js')(LogObj);
    Object.prototype.eval = require('./EvalProxy.js')(LogObj);
    catchHook = require('./CatchHook.js').catchHook(LogObj);

    //Add the Date at teh start of processing
    var now = new Date()
    LogObj['LastProcessed:'] = now;

    //Run the script

    this.run = function(data, callback){
        try{
            eval(data)
        }
        catch(e){
            LogObj['RunError'] = {};
            LogObj['RunError'].message = e.message;
            LogObj['RunError'].stack = e.stack;
        }
        callback(LogObj)
    }
}

module.exports = SandBox