angular.module('jitsiLogs').service('Stats', [function() {
    var defaultOptions = {
        axes: {
            x: {
                key: 'x',
                type: 'linear',
                labelFunction: function(value) {
                    var time = new Date(value);
                    return time.getUTCHours() + ":" + time.getMinutes() + ":" + time.getSeconds()  ;
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
        var valueColumn;
        for(var i = 0; i < peerStats.columns.length; i++) {
            if(peerStats.columns[i] === 'value') {
                valueColumn = i;
            }
        }
        if(!valueColumn) {
            return data;
        }
        for(i = peerStats.points.length - 1; i >= 0; i--) {
            addPointToData(data, peerStats.points[i], valueColumn);
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
    function addPointToData(data, point, valueColumn) {
        var groupColumn = 0;
        if(point.length !== 5) {
            return data;
        }
        var charts = data.charts;
        var value = JSON.parse(point[valueColumn]);
        for(var i = 0; i < value.length; i++) {
            for (var type in value[i][2]) {
                if (value[i][2].hasOwnProperty(type)) {
                    var groupName = value[i][groupColumn];
                    if (groupName.search('ssrc') !== -1 && !statsWanted[groupName]) {
                        addSsrcField(groupName);
                    }
                    if (statsWanted[groupName] && statsWanted[groupName].indexOf(type) > -1) {
                        if (!charts[groupName]) {
                            charts[groupName] = {};
                        }
                        if (!charts[groupName][type]) {
                            charts[groupName][type] = {chart: []};
                            charts[groupName][type].options = angular.copy(defaultOptions);
                            charts[groupName][type].options.series[0].y = type;
                            charts[groupName][type].options.series[0].label = type;
                        }
                        var currentValue = {};
                        //we assume time is always the first column
                        currentValue.x = parseInt(point[0]);
                        currentValue[type] = parseInt(value[i][2][type]);
                        if (!isNaN(currentValue[type])) {
                            charts[groupName][type].chart.push(currentValue);
                        }
                    } else if (type.search('Address') !== -1) {
                        if (!data.info[type]) {
                            data.info[type] = {
                                columns: ['time', type],
                                name: type,
                                points: []};
                        }
                        var previous = data.info[type].points.slice(-1)[0];
                        if (!previous || value[i][type] !== previous[1]) {
                            data.info[type].points.push([point[0], value[i][type]]);
                        }
                    }
                }
            }
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