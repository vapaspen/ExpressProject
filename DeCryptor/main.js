/*tool to make run JS files and Deobfuscate them.

    Log Notes: All log Entries are added to the root create object node, so this tool doesnt provide an execution history, but rather, foot notes of the most important things that happened while running.

    Can take a Sample Location as an argument.

    some samples to use:

    7d389ec44d45f2f882e8aa7dbb1dd2f9
    0164d0dbea683757d8a69376f9cecb98
    8167738acf3f0fe6c76c593e8fbbbe52

*/
var fs = require('fs');
var SandBox = require('./JSandBox/JSSandbox.js')

var currentVersion = "0.3.0";

//Program Settings.
var dataRoot = "C:/Users/dobrien/Documents/MyScripts/DataFolders/";
var sampleDirName = dataRoot + "Samples/";

//Wrapper to run the Main Function
function main(){
    if(process.argv[2]){
        sampleDirName = process.argv[2];
    }

    console.log("David's Javascript decoder Version: " + currentVersion + " \nRunning all samples in: " + sampleDirName);

    //Look through the storage folder and get each file. Then run it.
    fs.readdir(sampleDirName, function(err, fileNames) {
        fileNames.forEach(function(fileName){
            fs.readFile(sampleDirName + fileName , function (err, data){
                var localSandBox = new SandBox(fileName)

                localSandBox.run(String(data), function(LogObj){
                    var logName = dataRoot + "Sandboxes/" + fileName + ".json";

                    fs.writeFile(logName, JSON.stringify(LogObj), function (err) {
                        if (err) return console.log(err);
                        console.log(logName + ' Completed');
                    });
                });
            });
        });
    });
};

module.exports = main;