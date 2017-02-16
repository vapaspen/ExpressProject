/* The Lookup table that Connects the Different objects when CreateObject is call.
Because it is a Look up table for it to work right all objects need to be found here.


*/
var WScriptObjects = {
    "WScript.Shell":require('./Shell.js'),
    "Scripting.FileSystemObject":require('./FileSystemObj.js'),
    "ADODB.Stream":require('./StreamObj.js'),
    "MSXML2.XMLHTTP":require('./HTTP.js'),
    "shell.application":require('./ShellApp.js')

};
function CreateObjectConstructor(Log, ObjName){
    if(!WScriptObjects[ObjName]){
        return false;
    }

    return new WScriptObjects[ObjName](Log);
}

module.exports = CreateObjectConstructor;