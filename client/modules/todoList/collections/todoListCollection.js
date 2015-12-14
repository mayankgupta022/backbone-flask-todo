define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        Model    = require('todo/models/todoModel');

    return Backbone.Collection.extend({

    	url: document.serverURL + 'todo',
        model: Model,

        initialize: function(data) {
            if(document.mode === "local") {
                this.fetch = this.fetchLocal;
            }
        },

        fetchLocal: function(callback) {
            var data = [];
            var storage = JSON.parse(localStorage["todoList"]);
            for(var key in storage) {
                data.push(storage[key]);
            }
            this.reset(data);
            callback.success(this);
        }

    });

});
