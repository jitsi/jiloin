angular.module('jitsiLogs').filter('queryFilter', ['QueryBuilder',
    function(QueryBuilder) {
    return function(response, filter) {
        switch(filter) {
            //merge conference_created and conference_room series so we
            //have the names of the conferences
            case 'conference_room':
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
            case 'endpoint_id':
                var order = QueryBuilder.getCorrectSeriesOrder('conference_id').split(',');
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