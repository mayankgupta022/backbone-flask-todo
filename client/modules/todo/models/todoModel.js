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
        },

        createUrl: function(id) {
        	if(id) {
	        	this.url = this.urlRoot + 'todo/' + id;
	        	this.idAttribute = id;
	        }
	        else
	        	this.url = this.urlRoot + 'todo';
        }

    });

});
