var awsIot = require('aws-iot-device-sdk');

var device = awsIot.thingShadow({
  keyPath: './private.pem.key',
  certPath: './cert.pem.crt',
  caPath: './root.pem',
  clientId: 'thing-0',
  host: 'tbd'
});
var clientTokenUpdate;

device
  .on('connect', function () {
    console.log('connect');
    device.register('czajnik', {}, function () {
      console.log('registered')
      process.stdin.on('data', (e) => {
        console.log(e.toString('ascii'))
        if (e.toString('ascii').indexOf('on') === 0) {
          console.log('updating')
          clientTokenUpdate = device.update('czajnik', { state: { desired: { on: true } } });
          if (clientTokenUpdate === null) console.log('err')
        } else if(e.toString('ascii').indexOf('off') === 0){
          clientTokenUpdate = device.update('czajnik', { state: { desired: { on: false } } });
          if (clientTokenUpdate === null) console.log('err')
        } else if(e.toString('ascii').indexOf('status') === 0){
          clientTokenUpdate = device.get('czajnik')
          if (clientTokenUpdate === null) console.log('err')
        }
      })
    })


  });

device
  .on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });

device.on('status',
  function (thingName, stat, clientToken, stateObject) {
    console.log('received ' + stat + ' on ' + thingName + ': ' +
      JSON.stringify(stateObject));
  });