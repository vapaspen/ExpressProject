/* https://msdn.microsoft.com/en-us/library/ebdktb00(v=vs.100).aspx

get Object Item for the Global scope. In time will need to have it fixed so that the Query can be processed.

*/

function GetObject(Log, objectName){
    if(!Log['GetObject']){
        Log['GetObject'] =[]
    }
    var thisLog = {
        'Call':objectName,
        'ExecQuery':{}
    };
    Log['GetObject'].push(thisLog)
    var Obj = {}

    Obj['ExecQuery'] = function(ExecQueryCall){
        thisLog.ExecQuery = {
            'Call':arguments,
            'Return':1
        }
        return 1
    }


    return Obj;
}


module.exports = function (Log){
    return function(objectName){
        return GetObject(Log, objectName)
    }
}