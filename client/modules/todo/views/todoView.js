define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        Model    = require('todo/models/todoModel'),
        tpl      = require('text!todo/tpl/todoTpl.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        model: null,

        initialize: function(options) {
            this.model = new Model(options.model.attributes);
            this.render();
        },

        events: {
            "click div"         : "editTodo",
            "click .submit"     : "updateTodo",
            "click .complete"   : "completeTodo"
        },

        editTodo: function() {
            $("div", this.$el).hide();
            $(".complete", this.$el).hide();
            $("input", this.$el).show();
            $(".submit", this.$el).show();
        },

        updateTodo: function() {
            var self = this;

            this.model.attributes.task = $("input", this.$el).val();
            this.model.attributes.status = 0;

            this.model.save(null,{
                success: function (data) {
                    $("input", self.$el).hide();
                    $(".submit", self.$el).hide();
                    $("div", self.$el).html($("input", self.$el).val());
                    $("div", self.$el).show();
                    $("div", self.$el).removeClass("strike");
                    $(".complete", self.$el).show();
                },
                error: function (data) {
                    $('#msg').html('Failed to save details.');
                }
            });
        },

        completeTodo: function() {
            var self = this;

            this.model.attributes.status = 1;
            this.model.save(null,{
                success: function (data) {
                    $("div", self.$el).addClass("strike");
                },
                error: function (data) {
                    $('#msg').html('Failed to save details.');
                }
            });
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            if(this.model.attributes.status === 1) {
                $("div", this.$el).addClass("strike");
            }
            return this;
        }

    });

});
