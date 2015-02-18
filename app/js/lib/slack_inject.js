//Javascript code for the slack chatpage goes here
var http = require('http');
var gui = require('nw.gui');

function log(msg) {
    console.log("[Slack-Node] " + msg);
}

log("Slack has been injected?");