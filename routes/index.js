var express = require('express');
var moment = require('moment')
var router = express.Router();
var mqtt = require('mqtt');
const Websocket = require('ws');
var nhet_do_rep=require('../repos/nhietdo')

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

var i=0;
var index = 0;
wss.on('connection', (ws, req) => {
  client.on('message', function (topic, message) {
    var msg = message.toString();
    i++;
    console.log(msg);
    // index++;
    ws.send(msg);
    console.log('t',moment().format('MMMM Do YYYY,h:mm:ss '));
    var data={
      nhiet_do:msg,
      thoi_gian:moment().add(-7,'days').format('HH:mm:ss DD-MM-YYYY ')
    }
    if(moment().hours()==0&&moment().seconds()==0&&moment().minutes()==0)
      nhet_do_rep.add(data);
    if(i<25)      nhet_do_rep.add(data);

    // console.log(moment().minutes())
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  // nhet_do_rep.loadAll().then(function (data) {
  //   console.log(data);
  //   res.render('index', { title: 'Express' });
  //
  // })
  res.render('index', { title: 'Express' });
});
router.get('/nhietdo', function(req, res, next) {
  // nhet_do_rep.loadAll().then(function (data) {
  //   console.log(data);
  //   res.render('index', { title: 'Express' });
  //
  // })
  // res.render('index', { title: 'Express' });
  nhet_do_rep.loadNhietDoTrongNgay('%'+moment().format('DD-MM-YYYY')+'%').then(function (data) {
    console.log('kaka')
    res.json(data);
  })
});
router.get('/nhietdoAll', function(req, res, next) {
  // nhet_do_rep.loadAll().then(function (data) {
  //   console.log(data);
  //   res.render('index', { title: 'Express' });
  //
  // })
  // res.render('index', { title: 'Express' });
  nhet_do_rep.loadAll().then(function (data) {
    res.json(data);
  })
});

module.exports = router;
