/*
    Modules for adding the Hooks to the try catch Blocks.
    These are currently used in the eval system.

*/

function catchHook(LogObj, e){
    //console.log(e);

    if(!LogObj['CatchHook']){
        LogObj['CatchHook'] =[];
    }
    LogObj['CatchHook'].push({
        'message':e.message,
        'stack':e.stack
    });

}

//Catch Hook Adder
function addCatchHook(commandString){
    var pattern = /(catch\s*\((\w+)\)[\r\n \w\\]*)({)/g
    var hookCommand = "$1$3 catchHook($2); "
    var updatedString = commandString.replace(pattern, hookCommand);
    return updatedString;
}

module.exports = {
        catchHook:function(LogObj){
            return function (e){
                catchHook(LogObj, e);
            }
        },
        addCatchHook:addCatchHook

}