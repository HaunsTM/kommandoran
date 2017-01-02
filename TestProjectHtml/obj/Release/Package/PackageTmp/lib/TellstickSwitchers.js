$('#toggleSwitch').bootstrapToggle({
    on: 'Tänd',
    onstyle: 'warning',
    off: 'Släck'
});

var hemsamaritenWCFServiceURL = 'http://10.0.0.2:8525/HemsamaritenWCFService/';

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