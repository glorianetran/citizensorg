var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
    action: String,
    name: String,
    location: String,
    description: String,
    date: Date
});

mongoose.model('Action', actionSchema, 'actions');