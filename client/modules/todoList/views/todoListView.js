define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        Collection  = require('todoList/collections/todoListCollection'),
        tpl         = require('text!todoList/tpl/todoListTpl.html'),
        ModelView   = require('todo/views/todoView'),
        Model       = require('todo/models/todoModel'),

        template = _.template(tpl);

    return Backbone.View.extend({

        collection: null,

        initialize: function() {
            this.render();
        },

        events: {
            'click #submit': 'addTodo'
        },

        render: function () {
            var self = this;

            this.collection = new Collection();
            this.collection.fetch({
                success: function (data) {
                    self.$el.html(template);
                    _.each(data.models, function(model) {
                        $("#todoList", self.$el).append((new ModelView({model: model})).el);
                    });
                },
                error: function (data, response, options) {
                    console.log('Failed to load details.');
                }
            });

            return this;
        },

        addTodo: function() {
            var self = this;

            var model = new Model({
                task: $("#newTodo", this.$el).val()
            });
            model.save(null,{
                success: function(data) {
                    $("#todoList", self.$el).append((new ModelView({model: data})).el);
                    $("#newTodo", self.$el).val("");
                },
                error: function(data, response, options) {
                    console.log('Failed to save todo');
                }
            });
        }

    });

});
