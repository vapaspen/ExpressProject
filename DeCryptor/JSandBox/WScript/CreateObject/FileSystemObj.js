/*
Definition for the Scripting.FileSystemObject object of WScript.

CreateTextFile
OpenTextFile

*/

var GL = require('../../GenLibFuncts.js');

var FileSystemObj =  function(Log){
    var FSObj = this;

    //https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
    this.GetDrive = function(GetDriveCall){
        var FunLog = GL.addLogRef(Log,'GetDrive');
        FunLog.Call = arguments;

        var DriveObj = {
            FileSystem:'NTFS',
            DriveLetter:'C'
        };
        return DriveObj;
    };
    this.getDrive = this.GetDrive;
    this.GETDRIVE = this.GetDrive;

    //https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
    this.GetDriveName = function(GetDriveName){
        var FunLog = GL.addLogRef(Log,'GetDriveName');
        FunLog.Call = arguments;

        return 'C';
    };
    this.getDriveName = this.GetDriveName;
    this.GETDRIVENAME = this.GetDriveName;

    //https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
    this.GetSpecialFolder = function(GetSpecialFolderCall){
        var results = ["C:\\windows\\", "C:\\windows\\system32\\", "%TEMP%\\"][GetSpecialFolderCall]
        var FunLog = GL.addLogRef(Log,'GetSpecialFolder');
        FunLog.Call = arguments;
        FunLog.Return = results;
        return results;
    };
    this.getSpecialFolder = this.GetSpecialFolder;
    this.GETSPECIALFOLDER = this.GetSpecialFolder;

    //https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
    this.GetTempName = function(GetTempNameCall){
        var results = '<RandomGeneratedTempName>.TMP';
        var FunLog = GL.addLogRef(Log,'GetTempName');
        FunLog.Call = arguments;
        FunLog.Return = results;
        return results;
    };
    this.getTempName = this.GetTempName;
    this.GEETEMPNAME = this.GetTempName;


    this.GetFile = function(GetTempNameCall){
        var results = {
            'ShortPath':"ShortPath-"+GetTempNameCall
        };
        var FunLog = GL.addLogRef(Log,'GetFile');
        FunLog.Call = arguments;
        FunLog.Return = results;
        return results;
    };
    this.getFile = this.GetFile;
    this.GETFILE = this.GetFile;

    this.FolderExistis = function(){
        var FunLog = GL.addLogRef(Log,'FolderExistis');
        FunLog.Call = arguments;
        return true;
    };
    this.folderExistis = this.FolderExistis;
    this.FOLDEREXISTS = this.FolderExistis;

    this.FileExists = function(){
        var FunLog = GL.addLogRef(Log,'FileExistis');
        FunLog.Call = arguments;
        return true;
    };
    this.fileExists = this.FileExistis;
    this.FILEEXISTS = this.FileExistis;


    this.CopyFile = function(COPYFILECall){
        var FunLog = GL.addLogRef(Log,'CopyFile');
        FunLog.Call = arguments;
        return true;
    };
    this.copyFile = this.CopyFile;
    this.COPYFILE = this.CopyFile;

    this.DeleteFile = function(){
        var FunLog = GL.addLogRef(Log,'CopyFile');
        FunLog.Call = arguments;
        return true;
    };
    this.deleteFile = this.DeleteFile;
    this.DELETEFILE = this.DeleteFile;

    this.Close = function(){
        var FunLog = GL.addLogRef(Log,'CopyFile');
        FunLog.Call = arguments;
    };
    this.close = this.Close;
    this.CLOSE = this.Close

};


module.exports = FileSystemObj ;

