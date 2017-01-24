'use strict';
var hemsamaritenWCFServiceURL = 'http://10.0.0.2:8525/HemsamaritenWCFService/';

var selectedCamera = null;

var surveillanceCameras = [
    {
        mapCameraCustomId: 0,
        name: 'Sony Xperia Z3 Compact',
        location: 'Hans rum mot skrivbordet',
        requestUrl: 'http://10.0.0.70:8080/',
        APIMethod: {
            audio: 'audio.opus',
            snapshot: 'shot.jpg',
            videoStream: 'video',
            ledFlashlight: {
                curState: 'off',
                possibleStates: [{ name: 'enabletorch', state: 'off' },
                                 { name: 'disabletorch', state: 'on' }]
            }
        },
        closestTellstickDevice: { unitId: '15', state: 'off' }
    },
    {
        mapCameraCustomId: 1,
        name: 'Samsung Galaxy S4',
        location: '',
        requestUrl: 'http://10.0.0.72:8080/',
        APIMethod: {
            audio: 'audio.opus',
            snapshot: 'shot.jpg',
            videoStream: 'video',
            ledFlashlight: {
                curState: 'off'
            }
        },
        closestTellstickDevice: { unitId: '6', state: 'off' }
    }];

function SurveillanceCameraIndexBy(mapCameraCustomId) {
    var i;
    var m = null;
    for (var i = 0; i < surveillanceCameras.length; ++i) {
        if (surveillanceCameras[i].mapCameraCustomId !== mapCameraCustomId)
            continue;
        m = surveillanceCameras[i];
        break;
    }
    // m is now either null or the one you want
    return m != null ? i : null;
}

function CameraBy(mapCameraCustomId) {
    var m = null;
    for (var i = 0; i < surveillanceCameras.length; ++i) {
        if (surveillanceCameras[i].mapCameraCustomId !== mapCameraCustomId)
            continue;
        m = surveillanceCameras[i];
        break;
    }
    // m is now either null or the one you want
    return m;
}

function SendGetRequest(APIMethod) {
    $.get(selectedCamera.requestUrl + APIMethod);
}

function ToggleTellstickDeviceSwitch(selectedCamera) {
    var ajaxOptions;
    var turnOnDevice;
    var cameraIndex = SurveillanceCameraIndexBy(selectedCamera.mapCameraCustomId);
    var state = selectedCamera.closestTellstickDevice.state;
    if (state === 'on') {
        turnOnDevice = false;
        surveillanceCameras[cameraIndex].closestTellstickDevice.state = 'off';
    } else {
        turnOnDevice = true;
        surveillanceCameras[cameraIndex].closestTellstickDevice.state = 'on';
    }

    if (turnOnDevice) {
        ajaxOptions = {
            async: true,
            url: hemsamaritenWCFServiceURL + 'TurnOnTellstickDevice',
            data: 'unitId=' + selectedCamera.closestTellstickDevice.unitId,
            dataType: 'jsonp',
            contentType: "application/json; charset=utf-8",
            type: 'GET'
        };
    } else {
        ajaxOptions = {
            async: true,
            url: hemsamaritenWCFServiceURL + 'TurnOffTellstickDevice',
            data: 'unitId=' + selectedCamera.closestTellstickDevice.unitId,
            dataType: 'jsonp',
            contentType: "application/json; charset=utf-8",
            type: 'GET'
        };
    }
    // Initiate the request!
    $.ajax(ajaxOptions)
        .then(
        function () {

        },
        function (message) {
            console.log(message);
        }
    );
}

function ToggleLEDFlashlight(selectedCamera) {
    var APIMethod;
    var cameraIndex = SurveillanceCameraIndexBy(selectedCamera.mapCameraCustomId);
    var state = selectedCamera.APIMethod.ledFlashlight.state;

    if (state === 'on') {
        APIMethod = 'disabletorch';
        surveillanceCameras[cameraIndex].APIMethod.ledFlashlight.state = 'off';
    } else {
        APIMethod = 'enabletorch';
        surveillanceCameras[cameraIndex].APIMethod.ledFlashlight.state = 'on';
    }
    SendGetRequest(APIMethod);
}

function TakeAndDownloadSnapshot(selectedCamera) {
    var tempID = 'tempTakeAndDownloadSnapshotAnchorTag';
    var snapshotMethod = selectedCamera.requestUrl + selectedCamera.APIMethod.snapshot;
    var nameOfFileWhenDownloaded = '[SNAPSHOT] ' + selectedCamera.name + '      on' + new Date().toISOString();
    $('#icoSnapshot').append('<a id="' + tempID + '" href="' + snapshotMethod + '" download></a>');
    $('#' + tempID).trigger('click');
    $('#' + tempID).remove();

}

function ToggleAudio(selectedCamera) {
    
}


function showSurveillanceCamera(id) {
    selectedCamera = CameraBy(id);

    $('#name').text(selectedCamera.name);

    $('#browser_video').attr('src', selectedCamera.requestUrl + selectedCamera.APIMethod.videoStream);

    $("#surveillanceCameraModal").modal({ show: true });

}


$('#icoAudio').on('click', function () {
    console.debug('Clicked on ToggleAudio.');
    ToggleAudio(selectedCamera);
});
$('#icoSnapshot').on('click', function () {
    console.debug('Clicked on TakeAndDownloadSnapshot.');
    TakeAndDownloadSnapshot(selectedCamera);
});
$('#icoLEDFlashlight').on('click', function () {
    console.debug('Clicked on ToggleLEDFlashlight.');
    ToggleLEDFlashlight(selectedCamera);
});
$('#icoClosestTellstickDevice').on('click', function () {
    console.debug('Clicked on ToggleTellstickDeviceSwitch.');
    ToggleTellstickDeviceSwitch(selectedCamera);
});