//Javascript code for the slack chatpage goes here
var http = require('http');
var gui = require('nw.gui');

function log(msg) {
    console.log("[Slack-Node] " + msg);
}

log("Attaching to Proxy Events", global.ProxyEvents);

global.ProxyEvents.slackContentHandler = function(uri) {
    return {
        headers: 'TODO: headers',
        domain: 'catcup'
    }
}