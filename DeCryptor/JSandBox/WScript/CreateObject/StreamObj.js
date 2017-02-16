/*
Definition for the ADODB.Stream Request object of WScript.
OpenTextFile


*/

var GL = require('../../GenLibFuncts.js');

var StreamObj = function(Log){

    var Stream = this;
    this.path = '';
    this.data = '';

    this.Open = function(path){
        OpenLog = GL.addLogRef(Log,'Open');
        OpenLog.Call = arguments;
    };
    this.open = this.Open;

    this.Write = function(data){
        Stream.data = data;
        WriteLog = GL.addLogRef(Log,'Write');
        WriteLog.Call = arguments;
    };
    this.write = this.Write;

    this.SaveToFile = function(path, saveOption){
        var saveToFileEnum = ["adSaveCreateNotExist","adSaveCreateNotExist","adSaveCreateOverWrite"];
        var selectedSaveOption = saveToFileEnum[0];

        if(saveOption){
           selectedSaveOption = saveToFileEnum[saveOption];
        }

        Stream.path = path;
        SaveToFileLog = GL.addLogRef(Log,'SaveToFile');
        SaveToFileLog.Call = arguments;
        SaveToFileLog.saveToFileEnum = selectedSaveOption;
    };
    this.saveToFile = this.SaveToFile;


        this.Close = function(){
        Close = GL.addLogRef(Log,'Close');
        Close.Call = arguments;
    };
    this.close = this.Close;

    this.LoadFromFile = function(){
        LoadFromFileLog = GL.addLogRef(Log,'LoadFromFile');
        LoadFromFileLog.Call = arguments;
    };

    this.ReadText = function(){
        ReadText = GL.addLogRef(Log,'ReadText');
        ReadText.Call = arguments;
        return data
    }
};


module.exports = StreamObj;