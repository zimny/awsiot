var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  keyPath: './private.pem.key',
  certPath: './cert.pem.crt',
  caPath: './root.pem',
  clientId: 'thing-1',
  host: 'tbd'
});
device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('agd');
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });