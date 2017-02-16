/*





*/


function addLogRef(Log, LogRef){
    var newInstance = {};
    if(!Log[LogRef]){
        Log[LogRef] = [];
    }
    Log[LogRef].push(newInstance);
    return newInstance
}



module.exports = {
    addLogRef:addLogRef
}