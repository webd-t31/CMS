#! /usr/bin/env node

const server = require("../server");

const args = process.argv
const {exit} = process;

const parseVars = function(str){
    let [k, v] = str.split("=");
    let key = k.substring(2);
    return [key, v];
}

switch(args[2]){
    // start the server and update the settings
    case "start" : {
        for(let i = 3; i < args.length; i++){
            let [key, value] = parseVars(args[i])
            switch(key){
                case "port": {
                    let v = parseInt(value);
                    if(!isNaN(value) && Math.floor(v) == parseFloat(value)){
                        process.env.PORT = v;
                    } else break;
                }
            }
        }
        server.start();
        break;
    }
    case "configure": {

        break;
    }
}