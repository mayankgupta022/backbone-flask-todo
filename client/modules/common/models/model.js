define(function (require) {

    "use strict";

    var Backbone  = require('backbone'),
        server_ip = 'localhost:5000';

    document.mode = "local";
    document.serverURL = 'http://' + server_ip + '/';
    var originalSync = Backbone.sync;
    console.log("common");

    if(document.mode === "local") {
        var storage;
        if(!localStorage.getItem("todoList")) {
            storage = {};
            localStorage["todoList"] = JSON.stringify(storage);
            document.index = 0;
        }
        else {
            var max = -1;
            storage = JSON.parse(localStorage["todoList"]);
            for(var key in storage) {
                max = key>max ? key: max;
            }
            document.index = max+1;
        }
    }

    Backbone.sync = function (method, model, options) {
        if (method === "read" || method === "create"|| method === "update" || method === "delete") {
            options.dataType = "json";
            if (!options.crossDomain) {
                options.crossDomain = true;
            }

            if (!options.xhrFields) {
                options.xhrFields = {withCredentials:false};
            }

            return originalSync(method, model, options);
        }
    };

});
