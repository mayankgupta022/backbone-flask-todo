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
            this.fetchList();
        },

        events: {
            'click #submit': 'addTodo',
            'click .filter button': 'filterTasks'
        },

        render: function() {
            var self = this;

            this.$el.html(template);
            return this;
        },

        renderList: function(data) {
            var self = this;
            $("#todoList", self.$el).html("");
            _.each(data, function(model) {
                $("#todoList", self.$el).append((new ModelView({model: model})).el);
            });
        },

        fetchList: function () {
            var self = this;

            this.collection = new Collection();
            this.collection.fetch({
                success: function (data) {
                    self.render();
                    self.renderList(data.models);
                },
                error: function (data, response, options) {
                    console.log('Failed to load details.');
                }
            });
        },

        filterTasks: function(e) {
            var filterType = e.currentTarget.id;
            var data = this.collection.models;
            if(filterType === "pendingTasks") {
                data = this.collection.where({status: 0});
            } else if(filterType === "completedTasks") {
                data = this.collection.where({status: 1});
            }
            this.renderList(data);
        },

        addTodo: function() {
            var self = this;

            var model = new Model({
                task: $("#newTodo", this.$el).val()
            });
            model.save(null,{
                success: function(data) {
                    self.collection.add(data);
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
