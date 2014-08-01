
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.send('index', { title: 'Express' });
  res.sendfile("public/blank.html");
};
