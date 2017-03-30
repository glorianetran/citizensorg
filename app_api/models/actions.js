var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
    action: String,
    name: String
});

mongoose.model('Action', actionSchema, 'actions');