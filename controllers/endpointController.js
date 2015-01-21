angular.module('jitsiLogs').controller('chartsController',
    ['$scope', 'Database', '$routeParams', 'QueryBuilder', '$timeout', '$filter',
    function($scope, Database, $routeParams, QueryBuilder, $timeout, $filter) {
        $scope.query =

        $scope.data = [
        {x: 0, value: 4, otherValue: 14},
        {x: 1, value: 8, otherValue: 1},
        {x: 2, value: 15, otherValue: 11},
        {x: 3, value: 16, otherValue: 147},
        {x: 4, value: 23, otherValue: 87},
        {x: 5, value: 42, otherValue: 45}
    ];
    $scope.options = {
        axes: {
            x: {key: 'x', labelFunction: function(value) {return value;}, type: 'linear', min: 0, max: 5, ticks: 2},
            y: {type: 'linear', min: 0, max: 150, ticks: 5},
            y2: {type: 'linear', min: 0, max: 150, ticks: 5}
        },
        series: [
            {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'This is y :?'},
            {y: 'otherValue', axis: 'y2', color: 'green', visible: true, drawDots: true, dotSize: 2}
        ],
        lineMode: 'linear',
        tension: 0.7,
        tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'wtf :?';}},
        drawLegend: true,
        drawDots: true,
        columnsHGap: 5
    }
}]);