$('#toggleSwitch').bootstrapToggle({
    on: 'Tänd',
    onstyle: 'warning',
    off: 'Släck'
    //, size: 'small'
});

var hemsamaritenWCFServiceURL = 'http://10.0.0.2:8525/HemsamaritenWCFService/';
var allTellsticDevices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
$('#switchOnAll').on('click', function () {
    //set state
    $('#toggleSwitch').bootstrapToggle('on');
    
    $.each(allTellsticDevices, function (index, unitId) {
        ToggleDeviceSwitch(unitId);
        console.debug('Sent switch on message to unitId= ' + unitId);
    });
});

$('#alarm').on('click', function () {
    Alarm();
});

$('#switchOffAll').on('click', function () {
    //set state
    $('#toggleSwitch').bootstrapToggle('off');
    
    $.each(allTellsticDevices, function (index, unitId) {
        ToggleDeviceSwitch(unitId);
        console.debug('Sent switch on message to unitId= ' + unitId);
    });
});

$('#switchOfGroupForNight').on('click', function () {

    var tellstickDevicesToSwitchOff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    $('#toggleSwitch').bootstrapToggle('off');

    $.each(tellstickDevicesToSwitchOff, function(index, unitId) {
        ToggleDeviceSwitch(unitId);
        console.debug('Sent switch off message to unitId= ' + unitId);
    });

    var tellstickDevicesToSwitchOn = [4, 9];
    $('#toggleSwitch').bootstrapToggle('on');

    $.each(tellstickDevicesToSwitchOn, function (index, unitId) {
        ToggleDeviceSwitch(unitId);
        console.debug('Sent switch on message to unitId= ' + unitId);
    });
});

var ajaxOptionsTurnOnTellstick = function(id) {
    var ajaxOptions = {
        async: true,
        url: hemsamaritenWCFServiceURL + 'TurnOnTellstickDevice',
        data: 'Name=' + id,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        type: 'GET'
    };

    return ajaxOptions;
}

var ajaxOptionsTurnOffTellstick = function(id) {
    var ajaxOptions;

    ajaxOptions = {
        async: true,
        url: hemsamaritenWCFServiceURL + 'TurnOffTellstickDevice',
        data: 'Name=' + id,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        type: 'GET'
    };

    return ajaxOptions;
}

var Alarm = function() {
    var ajaxOptions;
    ajaxOptions = ajaxOptionsTurnOnTellstick(30);
    // Initiate the request!
    $.ajax(ajaxOptions)
        .then(
        function () {


        },
        function (message) {
            debugger;
        }
    );
}

var ToggleDeviceSwitch = function (id) {
    var ajaxOptions;
    var turnOnDevice = $('#toggleSwitch').prop('checked');
    if (turnOnDevice) {
        ajaxOptions = ajaxOptionsTurnOnTellstick(id);
    } else {
        ajaxOptions = ajaxOptionsTurnOffTellstick(id);
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