﻿$('#toggleSwitch').bootstrapToggle({
    on: 'Tänd',
    onstyle: 'warning',
    off: 'Släck',
    size: 'large'
});

var hemsamaritenWCFServiceURL = 'http://10.0.0.2:8525/HemsamaritenWCFService/';

$('#switchOfGroupForNight').on('click', function () {
    //set state
    $('#toggleSwitch').bootstrapToggle('off');

    var tellstickDevicesToSwitchOff = [35, 36, 37, 39, 41, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    $.each(tellstickDevicesToSwitchOff, function(index, nativeDeviceId) {
        toggleDeviceSwitch(nativeDeviceId);
        console.debug('Sent switch off message to nativeDeviceId= ' + nativeDeviceId);
    });
});

$('#switchOnAll').on('click', function () {
    //set state
    $('#toggleSwitch').bootstrapToggle('on');

    var tellstickDevicesToSwitchOn = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    $.each(tellstickDevicesToSwitchOn, function (index, nativeDeviceId) {
        toggleDeviceSwitch(nativeDeviceId);
        console.debug('Sent switch on message to nativeDeviceId= ' + nativeDeviceId);
    });
});

var toggleDeviceSwitch = function toggleDeviceSwitch(id) {
    var ajaxOptions;
    var turnOnDevice = $('#toggleSwitch').prop('checked');
    if (turnOnDevice) {
        ajaxOptions = {
            async: true,
            url: hemsamaritenWCFServiceURL + 'TurnOnTellstickDevice',
            data: 'nativeDeviceId=' + id,
            dataType: 'jsonp',
            contentType: "application/json; charset=utf-8",
            type: 'GET'
        };
    } else {
        ajaxOptions = {
            async: true,
            url: hemsamaritenWCFServiceURL + 'TurnOffTellstickDevice',
            data: 'nativeDeviceId=' + id,
            dataType: 'jsonp',
            contentType: "application/json; charset=utf-8",
            type: 'GET'
        };
    }
    console.debug('Sent: ' + ajaxOptions.url);
    // Initiate the request!
    $.ajax(ajaxOptions)
        .then(
        function () {

        },
        function (message) {
            //debugger;
        }
    );
}

var StartTellstickScheduler = function() {
    ajaxOptions = {
        async: true,
        url: hemsamaritenWCFServiceURL + 'StartTellstickScheduler',
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        type: 'GET'
    };

    console.debug('Sent: ' + ajaxOptions.url);
    // Initiate the request!
    $.ajax(ajaxOptions)
        .then(
            function() {

            },
            function(message) {
                //debugger;
            });
};

var StopTellstickScheduler = function () {

    ajaxOptions = {
        async: true,
        url: hemsamaritenWCFServiceURL + 'StopTellstickScheduler',
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        type: 'GET'
    };
    
    console.debug('Sent: ' + ajaxOptions.url);
    // Initiate the request!
    $.ajax(ajaxOptions)
        .then(
            function () {

            },
            function (message) {
                //debugger;
            });
};