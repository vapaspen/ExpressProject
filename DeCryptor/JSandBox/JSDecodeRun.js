/**
 * Created by vapaspen on 2/17/2017.
 */



var SandBox = require('./JSSandbox.js');

(function JSDecodeRun(){

    if(!process.argv[2] || !process.argv[3]){
        console.log({"Error":"Missing required arguments"});
        return;
    }

    var ScriptToRunName = process.argv[2];
    var data = process.argv[3];

    var localSandBox = new SandBox(ScriptToRunName);
    localSandBox.run(String(data), function (LogObj) {
       console.log(JSON.stringify(LogObj));
    });

})();
