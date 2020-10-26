var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
const Websocket = require('ws');

let wss = new Websocket.Server({
  port: 1888
});

var settings = {
  mqttServerUrl: "localhost",
  port: 1883,
  topic: "myTopicPub"
}

var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);
client.on('connect', function () {
  client.subscribe(settings.topic)
  console.log("Subscribed topic " + settings.topic);
})

var content = [];
var index = 0;
wss.on('connection', (ws, req) => {
  client.on('message', function (topic, message) {
    var msg = message.toString();
    content.push(msg);
    console.log(msg);
    // index++;
    ws.send(msg);
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
