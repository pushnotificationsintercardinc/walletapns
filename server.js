const apn = require('apn');

const moment = require('moment');

var http = require('http');

var options = {
  token: {
    key: __dirname + "/walletpasspushkey.p8",
    keyId: "8UK7K9Q486",
    teamId: "LEPQ574ULF"
  },
  production: true,
};

http.createServer(function (req, res) {

  if (req.url.indexOf("/index") != -1) {
     var params = req.url.split('/');
     var token = params[params.length-1];

     var apnProvider = new apn.Provider(options);
 
     let deviceToken = token;

     var note = new apn.Notification();
     
    note.expiry = Math.floor(moment().valueOf() / 1000) + 3600;
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 " + "";
    note.payload = {};
    note.topic = "pass.com.intercardinc.upshottestnfc";

    apnProvider.send(note, deviceToken).then( (result) => {
     console.log(result);
    });

    res.write('sent!');
  }
 
  res.end();
}).listen(8080); 