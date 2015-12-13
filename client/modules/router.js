define(function (require) {

    "use strict";

    var model       = require('common/models/model'),
        ShellView   = require('shell/views/shell'),
        $body       = $('body'),
        shellView,
        currentView,
        $content;

    return Backbone.Router.extend({

        routes: {
            "": "todoList"
        },

        initialize: function () {
            shellView = new ShellView();
            $body.html(shellView.render().el);
            $content = $("#content");
        },

        updateCurrentView: function(newView) {
            //COMPLETELY UNBIND THE VIEW
            if(this.currentView) {
                if(typeof this.currentView.close === "function")
                    this.currentView.close();
                this.currentView.undelegateEvents();
                $(this.currentView.el).removeData().unbind();
                //Remove currentView from DOM
                this.currentView.remove();
                Backbone.View.prototype.remove.call(this.currentView);
            }
            this.currentView= newView;
            this.currentView.delegateEvents(); // delegate events when the view is recycled
        },

        todoList: function () {
            var self = this;
            require(["todoList/views/todoListView"], function (TodoList) {
                var todoList = new TodoList();
                self.updateCurrentView(todoList);
                $(todoList.el).appendTo($content);
            });
        }
    });

});
