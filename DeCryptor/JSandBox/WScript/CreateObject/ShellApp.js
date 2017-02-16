/**
 * Created by dobrien on 2/16/2017.
 * Shell App Definition
 */


var GL = require('../../GenLibFuncts.js');


var ShellApp = function(Log){
    var ShellAppRef = this;
    this.file= "";
    this.vArguments = "";
    this.vDirectory = "";
    this.vOperation = "";
    this.vShow = "";

    //https://msdn.microsoft.com/en-us/library/windows/desktop/gg537745(v=vs.85).aspx
    this.ShellExecute = function(sFile, vArguments, vDirectory, vOperation, vShow){
        ShellAppRef.file= sFile;
        ShellAppRef.vArguments = vArguments;
        ShellAppRef.vDirectory = vDirectory;
        ShellAppRef.vOperation = vOperation;
        ShellAppRef.vShow = vShow;
        var FunLog = GL.addLogRef(Log,'ShellExecute');
        FunLog.Call = arguments;

    }

};

module.exports = ShellApp;


