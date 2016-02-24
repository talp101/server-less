var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
var appIds = {};

app.get('/:appId', function(req, res){
  var appId = req.params.appId.toString();
  if (!(appId in appIds)){
    var api = new ParseServer({
      databaseURI: 'mongodb://localhost:27017/server-less-'+appId,
      appId: appId,
      masterKey: 'myMasterKey' + appId, // Keep this key secret!
    });
    appIds[appId] = api;
    app.use('/'+appId+'/parse', api);
    return res.json({created: true});
  }
  return res.json({created: false});
})
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function() {
  console.log('parse-server-example running on port 3000.');
});
