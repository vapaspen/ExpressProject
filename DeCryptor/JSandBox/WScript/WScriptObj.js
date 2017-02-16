/*
    A mock up of the WScript object that replicates much of its functionality and adds logging hooks.

    Requires PowerShellDecode so when a run command is given, if that run command is encoded Power shell it can me cleaned.

    :args:
        :Log: reference to the log object as JSON object.
        :scriptName: the Name of the Script being run to use to setup the environment.
    Use:
        Needs to be instantiated in the "Global" scope context of the Sandbox. As the ActiveX object works of the same Mock Up code as WScript, It just needs a Wrapper function added to the Global context that Calls create Object.
        o ensure correct referencing the instance of the globals, the module exports as a function that is called to instantiate the WScript

*/

var CreateObjectLookUp = require('./CreateObject/CreateObjectLookUp.js');
var GL = require('../GenLibFuncts.js');

function WScriptConstructor(Log, scriptName){
    //Constructor Setup
    var Self = {
        MyLog:{}
    };

    Log.WScript = Self.MyLog;

    ///////////////Property Definition.
    //WScript Script Names
    Self['ScriptName'] = scriptName;
    Self['ScriptFullName'] = "./" + scriptName;

    Self['CreateObject'] = function(objectName){
        var CreateObjectLog = GL.addLogRef(Log.WScript, 'CreateObject');
        CreateObjectLog[objectName] = {};
        var LogRef  = CreateObjectLog[objectName];

        if(objectName == "WScript.Network"){
            LogRef["WScript.Network"] = {};
            return {}
        }
        var newObj = CreateObjectLookUp(LogRef, objectName);

        if(!newObj){
            newObj = {}
        }

        return newObj;
        /*if(objectName == "WScript.Shell" || objectName == "MSXML2.XMLHTTP" || objectName == "ADODB.Stream" || objectName == "Scripting.FileSystemObject"){
            var newObj = CreateObjectLookUp(LogRef, objectName);
            return newObj;
        }

        var MadeObj = CreateObjectMock(LogRef, objectName);
        return MadeObj
        */
    };

    //WScript Sleep
    Self['Sleep'] = function(sleepTime, callBack){
        Self.MyLog['Sleep']={
            'Call':arguments
        };
        if(callBack){
            return callBack();
        }

    };

    //WScript Quit
    Self['Quit'] = function(){
        Log.WScript['Quit'] = {
            'ErrorCode':arguments
        }
        //throw new Error("Quit Unexpectedly");

    }

    return Self;
}


//Main Mock Function for all of the Objects that Get created.
function CreateObjectMock(Log, strProgID){

    var Self = {};

    //_______________________________//
    //ActiveX only Stuff
    Self['fields'] = function(fieldsCall){
        var results = {}
        Log['fields'] = {
            'Call':arguments,
            'Return':results
        };
        return results;
    }

    //___________ End ______________//

    //+++++++++++++++++++++++++++++++//
    //File System Objects
    //Get Drive Function: https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
    Self['GetDrive'] = function(GetDriveCall){
        Log['GetDrive'] = {
            'Call':arguments
        };
        var DriveObj = {
            FileSystem:'NTFS',
            DriveLetter:'C'
        };
        return DriveObj;
    }

    //Get Drive: https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
    Self['GetDriveName'] = function(GetDriveName){
        Log['GetDriveName'] = {
            'Call':arguments
        };
        var callReturn = 'C'
        return callReturn;
    }

    //Get Special Folders: https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
    Self['GetSpecialFolder'] = function(GetSpecialFolderCall){
        var results = ["C:\\windows\\", "C:\\windows\\system32\\", "%TEMP%\\"][GetSpecialFolderCall]
        Log['GetSpecialFolder'] = {
            'Call':arguments,
            'Return':results
        };
        return results;
    };

    //GetTempName: https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
    Self['GetTempName'] = function(GetTempNameCall){
        var results = '<RandomGeneratedTempName>.TMP'
        Log['GetTempName'] = {
            'Call':arguments,
            'Return':results
        };
        return results;
    }

    Self['GetFile'] = function(GetTempNameCall){
        var results = {
            'ShortPath':"ShortPath-"+GetTempNameCall
        }
        Log['GetFile'] = {
            'Call':arguments,
            'Return':results
        };
        return results;
    }

    Self['FOLDEREXISTS'] = function(FOLDEREXISTSCall){
        var result = true;
        Log['FOLDEREXISTS'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }

    Self['COPYFILE'] = function(COPYFILECall){
        var result = true;
        Log['COPYFILE'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }

    Self['REGWRITE'] = function(REGWRITECall){
        var result = true;
        Log['REGWRITE'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }

    Self['deleteFile'] = function(deleteFileCall){
        var result = true;
        Log['Close'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }
    Self['DELETEFILE'] = Self['deleteFile'];
    Self['DeleteFile'] = Self['deleteFile'];

    Self['FileExists'] = function(FileExistsFileCall){
        var result = true;
        Log['FileExists'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }



    Self['ExpandEnvironmentStrings'] = function(ExpandEnvironmentStringsCall){
        var result = ExpandEnvironmentStringsCall;
        Log['ExpandEnvironmentStrings'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }

    //https://msdn.microsoft.com/en-us/library/fd7hxfdd(v%3Dvs.84).aspx
    Self['Environment'] = function(EnvironmentCall){
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
            'HOMEPATH':'%HOME_PATH',

        }
        var stubEnvironment = {
            'System': function(call){
                    var stringReturn = stubEnvironmentString[call]
                        Log['Environment']['System'] = {
                    'Call':arguments,
                    'Return':stringReturn
                }
                return stringReturn
            },
            'User':function(call){
                    var stringReturn = stubEnvironmentString[call]
                        Log['Environment']['User'] = {
                    'Call':arguments,
                    'Return':stringReturn
                }
                return stringReturn
            },
            'Process':function(call){
                    var stringReturn = stubEnvironmentString[call]
                        Log['Environment']['Process'] = {
                    'Call':arguments,
                    'Return':stringReturn
                }
                return stringReturn
            }
        };

        var result = stubEnvironment

        if(EnvironmentCall){
           var result =  stubEnvironment[EnvironmentCall]
        }
        Log['Environment'] = {
            'Call':arguments,
            'Return':result
        };
        return result;
    }
    //++++++++++++++ End ++++++++++++++//
    Self['status'] = 200;
    Self['Status'] = Self['status'];


    //********************************//
    //HTTP Send and recive

    Self['ResponseBody'] = "<This would be the Malware Payload>";
    Self['onreadystatechange'] = 4;
    Self['readystate'] = 4;
    Self['Header'] = 'DefaultHeader';
    Self['HeaderValue'] = 'DefaultHeaderValue';

    //XMLHttpRequest open: https://msdn.microsoft.com/en-us/library/ms757849(v=vs.85).aspx
    Self['open'] = function(requestType, URI, Async){
        var request = {}
        if(!Log['open']){
            Log['open'] = []
        }
        openLog = {
            'Call':arguments,
            'Return':request
        };
        Log['open'].push(openLog)
        /*
            Need to Add code for actually sending the Response. and Tracting it
        */
        return request;
    }
    //https://msdn.microsoft.com/en-us/library/ms766589(v=vs.85).aspx
    Self['setRequestHeader'] = function(bstrHeader, bstrValue){
        var request = {};
        Self['Header'] = bstrHeader;
        Self['HeaderValue'] = bstrValue;
        Log['setRequestHeader'] = {
            'Call':arguments,
            'Header':Self['Header'],
            'HeaderValue':Self['HeaderValue']
        };
    }


    Self['send'] = function(sendCall){
        Log['send'] = {
            'Call':arguments,
            'Header':Self['Header'],
            'HeaderValue':Self['HeaderValue']
        };

    }
    Self['Send'] = Self['send']
    //************ End ****************//

    //--------------------------------//
    //Stream File Operations.
    Self['Type'] = -1;
    Self['Position'] = -1;
    //save to file Options Enum
    var saveToFileEnum = ["adSaveCreateNotExist","adSaveCreateNotExist","adSaveCreateOverWrite"];

    //File System Open:
    Self['Open'] = function(OpenCall){
        var openObj = {};
        Log['Open'] = {
            'Call':arguments
        };
        return openObj;
    }

    Self['OpenTextFile'] = function(OpenTextFile){
        var openObj = {
            'Write':Self['Write'],
            'Close':Self['Close']
        };
        Log['OpenTextFile'] = {
            'Call':arguments
        };
        return openObj;
    }

     Self['Write'] = function(WriteCall){
        var WriteObj = {};
        Log['Write'] = {
            'Call':arguments
        };
        return WriteObj;
    }
    Self['write'] = function(writeCall){
        var writeObj = {};
        Log['write'] = {
            'Call':arguments
        };
        return writeObj;
    }


    //https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/savetofile-method
    Self['SaveToFile'] = function(SaveToFileCall){
        var saveToFileEnumArg = saveToFileEnum[1]
        if(arguments[1]){
            saveToFileEnumArg = saveToFileEnum[arguments[1]]
        }
        var SaveToFileObj = {};
        Log['SaveToFile'] = {
            'Call':arguments,
            'saveToFileEnumArg':saveToFileEnumArg
        };
        return SaveToFileObj;
    }
    Self['saveToFile'] = Self['SaveToFile'];


    Self['Close'] = function(CloseCall){
        var CloseObj = {};

        Log['Close'] = {
            'Call':arguments,
            'ObjectState':{
                'Type':Self['Type'],
                'Position':Self['Position']
            }

        };
        return CloseObj;
    }
    Self['close'] = Self['Close']

    //------------ End ---------------//


    //--------------------------------//
    //Shell.Run Script Runner.
    Self['run'] = function(runCall){
        var runObj = {};
        Log['run'] = {
            'Call':arguments,
            'Return':runObj
        };
        if(arguments[0].indexOf("powershell") > -1){

            Log['run']['powershell'] = PSDecrypt.invokeDecode(arguments[0]);
        }
        return runObj;
    }
    //Excucation runner: https://msdn.microsoft.com/en-us/library/2f38xsxe(v=vs.84).aspx
    Self['Exec'] = function(openCall){
        var ObjectLog = {}
        var openObj = {
        };

        Log['Exec'] = {
            'Call':arguments,
            'Return':ObjectLog
        };
        openObj['Status'] = 1;
        //https://msdn.microsoft.com/en-us/library/yzzwsz3t(v=vs.84).aspx
        openObj['StdIn'] = {
            'Write':function(){
                Log.Exec.Return['Write'] = {
                    'Call':arguments,
                }
            }
        }
        //https://msdn.microsoft.com/en-us/library/cbxxzwb5(v=vs.84).aspx
        openObj['StdOut'] = {
            'ReadAll':function(){
                var results = "<Command Line Data>" + Log.Exec.Call[0];
                Log.Exec.Return['ReadAll'] = {
                    'Call':arguments,
                    'Return':results
                }
                return results;
            },
            'Read':function(){
                var results = "<Command Line Data> " + Log.Exec.Call[0];
                Log.Exec.Return['Read'] = {
                    'Call':arguments,
                    'Return':results
                }
                return results;
            }
        }
        return openObj
    }

    //------------ End ---------------//
    Self['Run'] = Self['run']





    return Self
}


module.exports = WScriptConstructor;













