/*
Definition for the Shell object of WScript.



*/


var PSDecrypt = require('./PowerShellDecode.js');
var GL = require('../../GenLibFuncts.js');

var Shell = function(Log){
    //Excucation runner: https://msdn.microsoft.com/en-us/library/2f38xsxe(v=vs.84).aspx
    this.Exec = function(/*ExeToRun to Run*/){
        this.Status = 1;
        ExecObj = {};

        var ExecLog = GL.addLogRef(Log,'Exec');
        ExecLog.Call = arguments;
        ExecLog.Return = {};

        //https://msdn.microsoft.com/en-us/library/yzzwsz3t(v=vs.84).aspx
        ExecObj.StdIn = {
            "Write":function(/*Text To Write*/){
                var WriteLog = GL.addLogRef(ExecLog.Return, 'Write');
                WriteLog.Call = arguments;
            }
        };

        //https://msdn.microsoft.com/en-us/library/cbxxzwb5(v=vs.84).aspx
        ExecObj.StdOut = {
            "ReadAll":function(){
                var results = "<Command Line Data>" + ExecLog.Call[0];
                ReadAllLog = GL.addLogRef(ExecLog.Return, 'ReadAll');
                ReadAllLog.Call = arguments;
                ReadAllLog.Return = results;

                return results;
            }
        };
        return ExecObj
    };


    //Shell.Run Script Runner.
    this.run = function(runString){
        var RunLog = GL.addLogRef(Log, 'Run');
        var runStringCleaned = runString.replace(/[\^]/g, '').toLocaleLowerCase();
        if(runStringCleaned.indexOf("powershell") > -1){

            RunLog['powershell'] = PSDecrypt.invokeDecode(runStringCleaned);
        }

        RunLog.Call = arguments;
        return 1;
    };
    this.Run = this.run;
    this.RUN = this.run;

    //https://msdn.microsoft.com/en-us/library/fd7hxfdd(v%3Dvs.84).aspx
    this.ExpandEnvironmentStrings = function(EnvironmentCall){
        var ExpandEnvironmentStringsLog = GL.addLogRef(Log, 'ExpandEnvironmentStrings');
        ExpandEnvironmentStringsLog.Call = arguments;

        var stubEnvironmentString = {
            'NUMBER_OF_PROCESSORS':4,
            'PROCESSOR_ARCHITECTURE':"AMD64",
            'PROCESSOR_IDENTIFIER':"AMD",
            'PROCESSOR_LEVEL':'Processor Level',
            'OS':'Window 7',
            'COMSPEC':'cmd.exe',
            'PATH':'PATH_Environment',
            'PATHEXT':'.exe',
            'TEMP':'%TEMP%',
            'TMP':'%TEMP%',
            'HOMEDRIVE':'C',
            'HOMEPATH':'%HOME_PATH'

        };
        var stubEnvironment = {
            'System': function(call){
                var stringReturn = stubEnvironmentString[call];
                var EESSystemLog =  GL.addLogRef(ExpandEnvironmentStringsLog, 'System');
                EESSystemLog.Call = arguments;
                EESSystemLog.Return = stringReturn;
                return stringReturn
            },
            'User':function(call){
                var stringReturn = stubEnvironmentString[call]
                var EESSUserLog =  GL.addLogRef(ExpandEnvironmentStringsLog, 'User');
                EESUserLog.Call = arguments;
                EESUserLog.Return = stringReturn;
                return stringReturn
            },
            'Process':function(call){
                var EESProcessLog =  GL.addLogRef(ExpandEnvironmentStringsLog, 'Process');
                EESProcess.Call = arguments;
                EESProcess.Return = stringReturn;
                return stringReturn
            }
        };

        var result = stubEnvironment
        if(EnvironmentCall){
           result =  stubEnvironment[EnvironmentCall]
        }
        ExpandEnvironmentStringsLog.Return = result
        return result;

    };

    this.REGWRITE = function(){
        var RegWritelog = GL.addLogRef(Log, 'REGWRITE');
        RegWritelog.Call = arguments;

        return true;
    };

    this.RegDelete = function(){
        var FunLog = GL.addLogRef(Log,'RegDelete');
        FunLog.Call = arguments;

    };
    this.REGDELETE = this.RegDelete;
    this.regDelete = this.RegDelete;

};
module.exports = Shell;