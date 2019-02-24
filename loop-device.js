var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  keyPath: './private.pem.key',
  certPath: './cert.crt',
  caPath: './root.pem',
  clientId: 'temp1',
  host: 'tbd'
})

device
  .on('connect', () => {
    console.log('connect')
    for (i=0; i < 10000; i++) {
        setTimeout(() => {
          const temp = {
            timestamp: + new Date(),
            temp: Math.floor(Math.random() * 20) + 20
          }
          console.log('temp', JSON.stringify(temp))
          device.publish('temp/temp1', JSON.stringify(temp))
        }, 1000 * i)
    }
  })