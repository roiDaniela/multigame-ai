// ============== connect mongoose ==============

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotdog');
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// ============== make Schema =================

var Schema = mongoose.Schema;

var itemSchema = mongoose.Schema({
  imgUrl: String,
  items: Array,
  data: Array
});

var playerSchema = mongoose.Schema({
    pName: String,
    pScore: Number
});

var Item = mongoose.model('Item', itemSchema);
var Player = mongoose.model('Player', playerSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.Item = Item;