/*
    A module for Proxing the Eval method so that hooks can be added to the eval.

    Requires Catch Hook for adding the hooks on error functions.

    Makes a Sudo Globalized copy of the Native Eval function for use later in actually running the code to evaluate.

    Use:
        Needs to be instantiated in the "Global" scope context of the Sandbox. When instantiated it is given the Log object for further use.
        To ensure correct referencing the instance of the globals, the module exports as a function that is called to instantiate the Eval Proxy
*/
var ch = require('./CatchHook.js');

nativeEval = new Object(eval);
function evalProxy(LogObj, fileName, call){
    call = ch.addCatchHook(call);
    call = call.replace('/*@cc_on','');
    call = call.replace('@*/','');

    if(!LogObj['EvalObj']){
        LogObj['EvalObj'] = {};
        LogObj['EvalObj']['EvalStrings'] = [];
        LogObj['EvalObj']['Error'] = [];
    }
    else(LogObj['EvalObj']['EvalStrings'].push({'SPACER':'#################################'}))
    LogObj['EvalObj']['EvalStrings'].push(call);

    var errorIndex = LogObj['EvalObj']['Error'].push({})
    try{
        //Use the Native Eval to process the request.
        return nativeEval(call);
    }
    catch(e){
        if(e){
            LogObj['EvalObj']['Error'][errorIndex -1] = {
                'message':e.message,
                'stack':e.stack

            }
        }
        else{
            console.log("Error Message")
        }
    }
}





module.exports = function(LogObj, fileName){
    return function(call){
        return evalProxy(LogObj, fileName, call)
    }
}