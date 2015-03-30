(function(angular) {
    'use strict';
    var SignalRService = function ($window, url) {
        this.jQuery = $window.jQuery;
        this._url = url;
    };

    SignalRService.prototype.getHub = function (hubName) {
        var hub = this.jQuery.connection[hubName];
        this.jQuery.connection.hub.url = this._url;
        return hub;
    };

    SignalRService.prototype.start = function () {
        this.jQuery.connection.hub.start();
        return this;
    };

    var SignalRProvider = function () {
        this._url = '/signalr';
    };

    SignalRProvider.prototype.url = function (value) {
        if (angular.isUndefined(value)) {
            return this._url;
        }
        this._url = value;
        return this;
    };

    SignalRProvider.prototype.$get = function ($window) {
        return new SignalRService($window, this.url());
    };

    angular.module('eehSignalR', []).provider('eehSignalR', SignalRProvider);
}(angular));
