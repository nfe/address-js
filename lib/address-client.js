// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "address-client".
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('address-client', factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.address_client = factory(root);
    }
})(this, function (root) {
    'use strict';

    var parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function (type, url, apiKey, data) {

        var methods = {
            success: function () {},
            error: function () {}
        };
        var XHR = root.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Authorization', 'Basic ' + apiKey);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    methods.success.apply(methods, parse(request));
                } else {
                    methods.error.apply(methods, parse(request));
                }
            }
        };
        request.send(data);

        return {
            then: function (successCallback, errorCallback) {
                methods.success = successCallback || function () {};
                methods.error = errorCallback || function () {};
            }
        };
    };

    var get = function (src, apiKey) {
        return xhr('GET', src, apiKey, null);
    };

    var exports = {};

    // settings property
    exports.settings = {
        url: "http://open.nfe.io/v1",
        apiKey: "b58801a82418463f961cff952b27baaa"
    };

    exports.getStates = function () {

        var that = this;
        var url = that.settings.url;
        var apikey = that.settings.apiKey;

        return {
            then: function (successCallback, errorCallback) {

                // set callbacks
                var callbacks = {
                    success: successCallback || function () {},
                    error: errorCallback || function () {}
                };

                get(url + "/states", apikey)
                .then(function (data) {
                    callbacks.success(data.map(function (item) {
                        return {
                            id: item.abbreviation,
                            text: item.name
                        };
                    }));
                }, callbacks.error);
            }
        };

    };

    exports.getCities = function (state_abbreviation) {

        var that = this;
        var url = that.settings.url;
        var apikey = that.settings.apiKey;

        return {
            then: function (successCallback, errorCallback) {

                // set callbacks
                var callbacks = {
                    success: successCallback || function () {},
                    error: errorCallback || function () {}
                };

                // validations
                if (state_abbreviation === null || (state_abbreviation !== null && state_abbreviation.length !== 2)) {
                    return callbacks.error(null);
                }

                get(url + "/states/" + state_abbreviation + "/cities", apikey)
                .then(function (data) {
                    callbacks.success(data.map(function (item) {
                        return {
                            id: item.code,
                            text: item.name
                        };
                    }));
                }, callbacks.error);
            }
        };

    };

    exports.getAddress = function (postalCode) {

        var that = this;
        var url = that.settings.url;
        var apikey = that.settings.apiKey;

        return {
            then: function (successCallback, errorCallback) {

                // set callbacks
                var callbacks = {
                    success: successCallback || function () {},
                    error: errorCallback || function () {}
                };

                // validations
                if (postalCode === null || (postalCode.length !== 8 && postalCode.length !== 9)) {
                    return callbacks.error(null);
                }

                get(url + "/addresses/" + postalCode, apikey)
                .then(callbacks.success, callbacks.error);
            }
        };

    };

    // Return a value to define the module export.
    // This example returns a functions, but the module
    // can return an object as the exported value.
    return exports;
});