angular.module('jitsiLogs').service('Charts', [function() {
    var defaultOptions = {
        axes: {
            x: {
                key: 'x',
                type: 'linear',
                labelFunction: function(value) {
                    return value%100000;
                },
                ticks: 10
            },
            y: {
                type: 'linear',
                ticks: 10,
                labelFunction: function(value) {
                    return value;
                }
            }
        },
        series: [
            {
                y: 'nameOfStat',
                color: 'steelblue',
                thickness: '2px',
                label: 'nameOfStat'
            }
        ],
        lineMode: 'linear',
        tension: 0.7,
        tooltip: {
            mode: 'scrubber',
            formatter: function(x, y, series) {
                return y;
            }
        },
        drawLegend: true,
        drawDots: true,
        columnsHGap: 5
    };
    var statsWanted = {
      'Conn-audio-1-0': ['bytesReceived', 'bytesSent', 'googRtt'],
      'bweforvideo': ['googActualEncBitrate', 'googAvailableSendBandwidth',
      'googRetransmitBitrate', 'googAvailableReceiveBandwidth', 'googTargetEncBitrate',
      'googBucketDelay', 'googTransmitBitrate']
    };
    var ssrcSendStats = ["audioInputLevel", "packetsLost", "googRtt",
        "googEchoCancellationReturnLossEnhancement", "googJitterReceived",
    "packetsSent", "bytesSent", "googEchoCancellationEchoDelayStdDev"];
    var ssrcRecvStats = ["googTargetDelayMs", "packetsLost",
        "packetsReceived" ,"googJitterReceived", "googPreferredJitterBufferMs",
        "googDecodingCNG", "audioOutputLevel", "bytesReceived",
        "googJitterBufferMs"];
    function addSsrcFields(stats) {
        for(var property in stats) {
            if(stats.hasOwnProperty(property)) {
                if(property.search('ssrc') !== -1) {
                    if(property.search('send') !== -1) {
                        statsWanted[property] = ssrcSendStats;
                    } else {
                        statsWanted[property] = ssrcRecvStats;
                    }

                }
            }
        }
    }
    function addPointToCharts(stats, charts) {
        for (var j = 0; j < stats.timestamps.length; j++) {
            for(var field in statsWanted) {
                if(statsWanted.hasOwnProperty(field)) {
                    charts[field] = charts[field] || {};
                    for (var stat = 0; stat < statsWanted[field].length; stat++) {
                        var currentStat = statsWanted[field][stat];
                        if(stats.stats[field][statsWanted[field][stat]]) {
                            if(!charts[field][currentStat]) {
                                charts[field][currentStat] = {chart: []};
                                charts[field][currentStat].options = angular.copy(defaultOptions);
                                charts[field][currentStat].options.series[0].y = currentStat;
                                charts[field][currentStat].options.series[0].label = currentStat;
                            }
                            var currentValue = {};
                            currentValue.x = parseInt(stats.timestamps[j]);
                            currentValue[currentStat] = parseInt(stats.stats[field][statsWanted[field][stat]][j]);
                            charts[field][currentStat].chart.push(currentValue);
                        }
                    }
                }
            }
        }
    }
    return {
        getOptions: function () {
            return options;
        },
        getChartData: function (response) {
            var charts = {};
            //find the index of the peer_connection_stats series
            for (var statsIndex = 0; statsIndex < response.length; statsIndex++) {
                if (response[statsIndex].name === 'peer_connection_stats') {
                    break;
                }
            }
            if(statsIndex === response.length) {
                return;
            }
            //find the stats column in them...
            for (var statsColumn = 0; statsColumn < response[statsIndex].columns.length; statsColumn++) {
                if (response[statsIndex].columns[statsColumn] === 'stats') {
                    break;
                }
            }
            //...and parse the data
            for(var i = response[statsIndex].points.length - 1; i >= 0; i--) {
                var stats = JSON.parse(response[statsIndex].points[i][statsColumn]);
                if(i === response[statsIndex].points.length - 1) {
                    addSsrcFields(stats.stats);
                }
                addPointToCharts(stats, charts);
            }
            return charts;
        }
    }
}]);