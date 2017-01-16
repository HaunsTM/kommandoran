'use strict';

var surveillanceCamera = [
    {
        id: 0,
        requestUrl: 'http://10.0.0.70:8080/',
        snapshot: 'shot.jpg',
        videoStream: 'video',
        ledFlashlight: 'enabletorch'
    },
    {
        id: 1,
        requestUrl: 'http://10.0.0.72:8080/',
        snapshot: 'shot.jpg',
        videoStream: 'video',
        ledFlashlight: 'enabletorch'
    }];
var showSurveillanceCamera = function() {
    $("#surveillanceCameraModal").modal({ show: true });
}