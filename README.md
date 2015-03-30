# eeh-signalr
AngularJS wrapper module for the official jQuery SignalR client.

## Usage

### (Optional) Configure the SignalR URL

The URL is '/signalr' by default. 
If it is set to another value on the server, or if CORS is in use, it can be set when you configure your app.

```js
angular.module('myApp').config(function (eehSignalRProvider) {
    eehSignalRProvider.url('http://example.com/myCustomSignalRUrl');
});
```

### Inject the eehSignalR Service in a Controller (or somewhere else)

```js
angular.module('myApp')
.controller('MainCtrl', function ($scope, eehSignalR) {
    var hub = eehSignalR.getHub('assetHub');
    hub.client.hello = function (message) {
        $scope.message = message;
    };
    eehSignalR.start();
});
```
