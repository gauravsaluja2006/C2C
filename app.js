
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
  getMotherboards = require('./routes/getMotherboards'),
  getProcessors = require('./routes/getProcessors'),
  getMouse = require('./routes/getMouse'),
  getKeyboards = require('./routes/getKeyboards'),
  getMonitors = require('./routes/getMonitors'),
  getOrders = require('./routes/getOrders'),
  addProduct = require('./routes/addProduct'),
  nodemailer = require('./routes/nodemailer'),
  addOrder = require('./routes/addOrder'),
  uploadImage = require('./routes/uploadImage'),
  deliverOrderService = require('./routes/deliverOrderService'),
  getStatus = require('./routes/getStatus');
 

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/api/nodemail', nodemailer.send);
app.get('/users', user.list);
app.get('/api/getMotherboards', getMotherboards.findAll);
app.get('/api/getProcessors', getProcessors.findAll);
app.get('/api/getMouse', getMouse.findAll);
app.get('/api/getMonitors', getMonitors.findAll);
app.get('/api/getKeyboards', getKeyboards.findAll);
app.get('/api/getOrders', getOrders.findAll);
app.post('/api/deliver', deliverOrderService.save);
app.post('/api/getStatus', getStatus.save);
app.post('/api/addProduct', addProduct.save);
app.post('/api/addOrder', addOrder.save);
app.post('/uploadImage', uploadImage.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
