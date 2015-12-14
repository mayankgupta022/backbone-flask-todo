define(function (require) {

    "use strict";

    var Backbone = require('backbone');

    return Backbone.Model.extend({

    	urlRoot: document.serverURL,

        initialize: function(data) {
        	if(data)
	    		this.createUrl(data.id);
	    	else
	    		this.createUrl();
            if(document.mode === "local") {
                this.save = this.saveLocal;
            }
        },

        createUrl: function(id) {
        	if(id) {
	        	this.url = this.urlRoot + 'todo/' + id;
	        	this.idAttribute = id;
	        }
	        else
	        	this.url = this.urlRoot + 'todo';
        },

        saveLocal: function(data, callback) {
            var storage = JSON.parse(localStorage["todoList"]);
            if(data === null) {
                data = this.attributes;
            }
            if(typeof this.id !== "undefined") {
                storage[this.id] = data;
            }
            else {
                data.id = document.index;
                this.id = document.index;
                storage[document.index] = data;
                document.index++;
            }
            localStorage["todoList"] = JSON.stringify(storage);
            this.attributes = data;
            callback.success(this);
        }

    });

});
