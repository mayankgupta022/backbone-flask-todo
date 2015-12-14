require.config({

    baseUrl: 'modules',

    paths: {
        backbone: 'assets/lib/backbone',
        underscore: 'assets/lib/underscore',
        jquery: 'assets/lib/jquery',
        text: 'assets/lib/text',
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    wait: 200
});

require(['jquery', 'backbone', 'underscore', 'router'], function ($, Backbone, _, Router) {
    var router = new Router();
    document.router = router;
    Backbone.history.start();
});
