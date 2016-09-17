"use strict";

app.controller('GridGameCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

    var grid, timerPromise;

    var startTimer = function(time) {
        grid.timer = grid.timeToUncolor;
        timerPromise = $interval(function () {
            grid.timer--;
            if (!grid.timer) {
                grid.chances--;
                if (!grid.chances) {
                    grid.message = 'You lost ..!! :(';
                    stopTimer();
                } else {
                    grid.message = 'Restrating again ..!!!';
                    stopTimer();
                    $timeout(function () {
                        grid.message = '';
                        colorRandomCoordinates();
                        startTimer();
                    }, 1000);
                }
            }
        }, 1000);
    };

    var stopTimer = function() {
        $interval.cancel(timerPromise);
    };

    var colorGridCell = function(x,y) {
        grid.gridMap[x][y] = true;
        grid.cellsColoredCount++;
    };

    $scope.uncolorCell = function(x, y) {
        if (grid.gridMap[x][y]) {
            grid.gridMap[x][y] = false;
            grid.cellsColoredCount--;
            if (!grid.cellsColoredCount) {
                grid.message = 'You win ..!! :)';
                stopTimer();
            }
        }
    };

    var colorRandomCoordinates = function() {
        while (grid.cellsColoredCount <  grid.cellsToColorCount) {
            var x = Math.floor(Math.random() * grid.gridSize);
            var y = Math.floor(Math.random() * grid.gridSize);
            if (!grid.gridMap[x][y]) {
                colorGridCell(x,y);
            }
        }
    };

    var drawGrid = function() {
        grid.gridMap = [];
        for (var i=0; i<grid.gridSize; i++) {
            grid.gridMap[i] = [];
            for (var j=0; j<grid.gridSize; j++) {
                grid.gridMap[i][j] = false;
            }
        }
    };

    var isFormValid = function(form) {
        return form.$valid;
    };

    $scope.initGame = function(form) {
        if (!isFormValid(form)) {
            $scope.gameInput.formValid = false;
        } else {
            var gameInput = $scope.gameInput;
            gameInput.formValid = true;
            grid = $.extend(true, {}, gameInput);
            grid.cellsColoredCount = 0;
            $scope.grid = grid;
            drawGrid();
            colorRandomCoordinates();
            startTimer();
        }

    };

    var setDefault = function() {
        $scope.gameInput = {};
        $scope.gameInput.formValid = true;
    };

    var initialize = function() {
        setDefault();
    };

    initialize();

}]);
