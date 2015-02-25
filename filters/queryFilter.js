angular.module('jitsiLogs').filter('query', ['QueryBuilder', '$filter',
    function(QueryBuilder, $filter) {
    return function(response, filter) {
        switch(filter) {
            //merge conference_created and conference_room series so we
            //have the names of the conferences
            case 'conferences':
            case 'room_jid':
                for(var i = 0; i < response[0].columns.length; i++) {
                    if(response[0].columns[i] === "room_jid") {
                        response[0].columns[i] = "room_name";
                        for(var j = 0; j < response[0].points.length; j++) {
                            var jid = response[0].points[j][i];
                            //we assume the conference name does not include a @
                            response[0].points[j][i] = jid.substr(0, jid.indexOf('@'));
                        }
                    }
                }
                break;
            //we get the results sorted alphabetically so we sort them
            //in the order we want to show them
            case 'conference_id':
                var data = {};
                for(var i = 0; i < response.length; i++) {
                    if(response[i].name === 'conference_room') {
                        for(var j = 0; j < response[i].columns.length; j++) {
                            if(response[i].columns[j] === 'room_jid') {
                                var jid = response[i].points[0][j];
                                data.room_name = jid.substr(0, jid.indexOf('@'));
                                break;
                            }
                        }
                    } else if(response[i].name === 'conference_created') {
                        data.created = $filter('time')(response[i].points[0][0]);
                    } else if(response[i].name === 'conference_expired') {
                        if(response[i].points.length > 0) {
                            data.expired = $filter('time')(response[i].points[0][0]);
                        }
                    }
                }
                if(!data.expired) {
                    data.expired = 'Ongoing';
                }
                response = data;
                break;
            default:
                var order = QueryBuilder.getCorrectSeriesOrder(filter).split(',');
                var sortedResponse = [];
                var ordered = 0;
                for(var i = 0; i < order.length; i++) {
                    for(var j = 0; j < response.length; j++) {
                        if(order[i] === response[j].name) {
                            sortedResponse[ordered] = response[j];
                            ordered++;
                        }
                    }
                }
                response = sortedResponse;
                break;

        }
        return response;
    }
}]);