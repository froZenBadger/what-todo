(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('main', {
                url: '/',
                controller: 'MainCtrl as main'
                // templateUrl: '/templates/index.html'
            })
    }

    angular
        .module('Todo', ['ui.router', 'ui.bootstrap'])
        .config(config);
})();
