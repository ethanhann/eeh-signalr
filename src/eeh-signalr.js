(function (angular) {
    'use strict';
    var SignalRService = function (jQuery) {
        this.jQuery = jQuery;
    };

    SignalRService.prototype.getHub = function (hubName) {
        return this.jQuery.connection[hubName];
    };

    var SignalRProvider = function () {
        this._url = '/signalr';
        this._proxies = {};
    };

    SignalRProvider.prototype.url = function (value) {
        if (angular.isUndefined(value)) {
            return this._url;
        }
        this._url = value;
        return this;
    };

    SignalRProvider.prototype.proxy = function (name, methods) {
        if (angular.isUndefined(methods)) {
            return this._proxies[name];
        }
        this._proxies[name] = methods;
        return this;
    };

    SignalRProvider.prototype.$get = function ($rootScope, $window) {
        var jQuery = $window.jQuery;
        var self = this;
        angular.forEach(jQuery.connection.hub.proxies, function (proxy, proxyName) {
            if (!self._proxies.hasOwnProperty(proxyName)) {
                return;
            }
            angular.forEach(self._proxies[proxyName], function (methodName) {
                proxy.client[methodName] = function () {
                    var args = [];
                    angular.forEach(arguments, function (argument) {
                        args.push(argument);
                    });
                    $rootScope.$broadcast('eehSignalR:' + methodName, args);
                    $rootScope.$apply();
                };
            });
        });
        jQuery.connection.hub.url = this.url();
        jQuery.connection.hub.start();
        return new SignalRService(jQuery);
    };

    angular.module('eehSignalR', []).provider('eehSignalR', SignalRProvider);
}(angular));
