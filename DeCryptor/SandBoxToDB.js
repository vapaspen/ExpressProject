/**
 * Created by vapaspen on 2/17/2017.
 */

var fs = require('fs');
//var SandBox = require('./JSandBox/JSSandbox.js');
var spawn = require("child_process").spawn;
//var spawn = require( 'child_process' ).spawnSync;
var md5 = require('md5');

function SandBoxToDB(db, target, next) {
    var SandBoxToDBRef = this;
    try {
        var listOfFiles = [];
        //Look through the storage folder and get each file. Then run it.
        fs.readdir(target, function (err, fileNamesToProcess) {
            var I = 0;

            (function fileLoop(i) {
                var CurentName = fileNamesToProcess[i];
                fs.readFile(target + "/" + CurentName, function (err, data) {

                    var MD5OfSample = md5(String(data));
                    listOfFiles.push(CurentName);

                    //var sandBox = spawn("cmd", ["ls", "./JSandBox/JSDecodeRun.js", CurentName, data]);
                    //var comand = "node C:\\Users\\vapaspen\\WebstormProjects\\ExpressProject\\DeCryptor\\JSandBox\\JSDecodeRun.js " + CurentName + " " + data;

                    var sandBox = spawn("node", ["C:\\Users\\vapaspen\\WebstormProjects\\ExpressProject\\DeCryptor\\JSandBox\\JSDecodeRun.js", CurentName, data]);

                    sandBox.stderr.on('data', function(data) {
                        console.log('Error: ' + data);
                    });

                    sandBox.stdout.on('data', function (LogObj){
                        var ProcessedFiles = db.get("ProcessedFiles");
                        ProcessedFiles.remove({"MD5":MD5OfSample});
                        ProcessedFiles.insert({"MD5":MD5OfSample, "Report": JSON.parse(LogObj)});
                        var newI = i++;
                        if ((newI + 1) < fileNamesToProcess.length) {
                            fileLoop(i);
                        }
                        else {
                            next(listOfFiles)
                        }
                    });

                    /*
                    var localSandBox = new SandBox(CurentName);
                    localSandBox.run(String(data), function (LogObj) {

                        //var logName = dataRoot + "Sandboxes/" + CurentName + ".json";
                        var ProcessedFiles = db.get("ProcessedFiles");
                        ProcessedFiles.remove({"MD5":MD5OfSample});
                        ProcessedFiles.insert({"MD5":MD5OfSample, "Report": LogObj});



                    });
                    */
                });
            })(I);
        });
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = SandBoxToDB;