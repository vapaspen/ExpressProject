/*
Definition for the HTTP Request object of WScript.




*/

var GL = require('../../GenLibFuncts.js');

var HTTPObj= function(Log){
    var HTTP = this;
    this.status = 200;
    this.Status = this.status;
    this.ResponseBody = "<This would be the Malware Payload>";
    this.onreadystatechange = 4;
    this.readystate = 4;
    this.Header = 'DefaultHeader';
    this.HeaderValue = 'DefaultHeaderValue';
    this.requestType = undefined;
    this.URI = undefined;
    this.Async = undefined;

    //https://msdn.microsoft.com/en-us/library/ms757849(v=vs.85).aspx
    this.Open = function(requestType, URI, Async){
        HTTP.requestType = requestType;
        HTTP.URI= URI;
        HTTP.Async = Async;
        var OpenLog = GL.addLogRef(Log,'Open');
        OpenLog.Call = arguments;
    };
    this.open = this.Open;

    //https://msdn.microsoft.com/en-us/library/ms536736(v=vs.85).aspx
    this.Send = function(){
        var SendLog = GL.addLogRef(Log,'Send');
        SendLog.Call = arguments;
        SendLog.Request = {
            "Header":HTTP.Header,
            "HeaderValue":HTTP.HeaderValue,
            "requestType":HTTP.requestType,
            "URI":HTTP.URI,
            "Async":HTTP.Async
        }
    };
    this.send = this.Send;


    this.setRequestHeader = function(bstrHeader, bstrValue){
        HTTP.Header = bstrHeader;
        HTTP.HeaderValue = bstrValue;

        var setRequestHeaderLog = GL.addLogRef(Log,'setRequestHeader');
        setRequestHeaderLog.Call = arguments;
    };
    this.SETREQUESTHEADER = this.setRequestHeader;

};

module.exports = HTTPObj;