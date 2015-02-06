angular.module('jitsiLogs').service('Stats', [function() {
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
      'googRetransmitBitrate', 'googAvailableReceiveBandwidth',
      'googTargetEncBitrate', 'googBucketDelay', 'googTransmitBitrate']
    };
    var ssrcSendStats = ["audioInputLevel", "packetsLost", "googRtt",
        "googEchoCancellationReturnLossEnhancement", "googJitterReceived",
    "packetsSent", "bytesSent", "googEchoCancellationEchoDelayStdDev"];
    var ssrcRecvStats = ["googTargetDelayMs", "packetsLost",
        "packetsReceived" ,"googJitterReceived", "googPreferredJitterBufferMs",
        "googDecodingCNG", "audioOutputLevel", "bytesReceived",
        "googJitterBufferMs"];
    function getChartsData(peerStats) {
        var data = {
            charts: {},
            info: {}
            };
        var groupColumn, typeColumn, valueColumn;
        for(var i = 0; i < peerStats.columns.length; i++) {
            if(peerStats.columns[i] === 'groupName') {
                groupColumn = i;
            } else if(peerStats.columns[i] === 'type') {
                typeColumn = i;
            } else if(peerStats.columns[i] === 'value') {
                valueColumn = i;
            }
        }
        if(!(groupColumn && typeColumn && valueColumn)) {
            return data;
        }
        for(i = peerStats.points.length - 1; i >= 0; i--) {
            var groupName = peerStats.points[i][groupColumn];
            var type = peerStats.points[i][typeColumn];
            if(groupName.search('ssrc') !== -1) {
                addSsrcField(groupName);
            }
            addPointToData(data, peerStats.points[i], groupName, type, valueColumn)
        }
        return data;
    }
    function addSsrcField(groupName) {
        if(!statsWanted[groupName]) {
            if(groupName.search('send') !== -1) {
                statsWanted[groupName] = ssrcSendStats;
            } else {
                statsWanted[groupName] = ssrcRecvStats;
            }
        }
    }
    function addPointToData(data, point, groupName, type, valueColumn) {
        var charts = data.charts;
        if(statsWanted[groupName] && statsWanted[groupName].indexOf(type) > -1) {
            if(!charts[groupName]) {
                charts[groupName] = {};
            }
            if(!charts[groupName][type]) {
                charts[groupName][type] = {chart: []};
                charts[groupName][type].options = angular.copy(defaultOptions);
                charts[groupName][type].options.series[0].y = type;
                charts[groupName][type].options.series[0].label = type;
            }
            var currentValue = {};
            //we assume time is always the first column
            currentValue.x = parseInt(point[0]);
            currentValue[type] = parseInt(point[valueColumn]);
            charts[groupName][type].chart.push(currentValue);
        } else if(type.search('Address') !== -1) {
            if(!data.info[type]) {
                data.info[type] = [];
            }
            data.info[type].push(point[valueColumn])
        }
    }
    function cleanUpStatsWanted() {
        for(var item in statsWanted) {
            if(statsWanted.hasOwnProperty(item)) {
                if(item.search('ssrc') !== -1) {
                    delete statsWanted[item];
                }
            }
        }
    }
    return {
        getOptions: function () {
            return options;
        },
        getStatsData: function (response) {
            //find the index of the peer_connection_stats series
            for (var statsIndex = 0; statsIndex < response.length; statsIndex++) {
                if (response[statsIndex].name === 'peer_connection_stats') {
                    break;
                }
            }
            if(statsIndex === response.length) {
                return;
            }
            var data = getChartsData(response[statsIndex]);

            cleanUpStatsWanted();
            return data;
        }
    }
}]);