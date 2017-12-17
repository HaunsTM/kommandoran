'use strict';

//#region Variables

var hemsamaritenWCFServiceURL = 'http://10.0.0.2:8525/HemsamaritenWCFService/';

var selectedCamera = null;

var surveillanceCameras = [
    {
        mapCameraCustomId: 0,
        name: 'DCS-2330L_1',
        location: 'Hans rum mot skrivbordet',
        requestUrl: 'http://10.0.0.110:80/',
        APIMethod: {
            audio: 'audio.opus',
            snapshot: 'shot.jpg',
            videoStream: 'video2.mjpg',
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
        name: 'DCS-2330L_2',
        location: 'Garaget',
        requestUrl: 'http://10.0.0.111:80/',
        APIMethod: {
            audio: 'audio.opus',
            snapshot: 'shot.jpg',
            videoStream: 'video2.mjpg',
            ledFlashlight: {
                curState: 'off',
                possibleStates: [{ name: 'enabletorch', state: 'off' },
                    { name: 'disabletorch', state: 'on' }]
            }
        },
        closestTellstickDevice: { unitId: '15', state: 'off' }
    },
    {
        mapCameraCustomId: 2,
        name: 'DCS-2330L_3',
        location: 'Fågelmataren',
        requestUrl: 'http://10.0.0.112:80/',
        APIMethod: {
            audio: 'audio.opus',
            snapshot: 'shot.jpg',
            videoStream: 'video2.mjpg',
            ledFlashlight: {
                curState: 'off',
                possibleStates: [{ name: 'enabletorch', state: 'off' },
                    { name: 'disabletorch', state: 'on' }]
            }
        },
        closestTellstickDevice: { unitId: '15', state: 'off' }
    },
    {
        mapCameraCustomId: 3,
        name: 'Sony Xperia Z3 Compact',
        location: 'Hans rum mot skrivbordet',
        requestUrl: 'http://10.0.0.112:80/',
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
        mapCameraCustomId: 4,
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

//#endregion

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

    var snapshotMethod = selectedCamera.requestUrl + selectedCamera.APIMethod.snapshot; //where to send the request
    var nameOfFileWhenDownloaded = '[SNAPSHOT] ' + '[' + selectedCamera.name + ']' + ' [request time ' + new Date().toISOString()+ ']';
    
    $('#icoSnapshot').attr({
        download: nameOfFileWhenDownloaded,
        href: snapshotMethod
    });
}

function ToggleAudio(selectedCamera) {
    
}

//#region Events

function ShowSurveillanceCamera(id) {
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
    TakeAndDownloadSnapshot(selectedCamera);
    console.debug('Clicked on TakeAndDownloadSnapshot.');
});

$('#icoLEDFlashlight').on('click', function () {
    console.debug('Clicked on ToggleLEDFlashlight.');
    ToggleLEDFlashlight(selectedCamera);
});

$('#icoClosestTellstickDevice').on('click', function () {
    console.debug('Clicked on ToggleTellstickDeviceSwitch.');
    ToggleTellstickDeviceSwitch(selectedCamera);
});

//#endregion