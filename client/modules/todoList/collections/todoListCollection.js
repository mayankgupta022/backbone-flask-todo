define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        Model    = require('todo/models/todoModel');

    return Backbone.Collection.extend({

    	url: document.serverURL + 'todo',
        model: Model
    });

});
