angular.module('jitsiLogs').filter('queryFilter', function() {
    return function(response, fieldName) {
        switch(fieldName) {
            case 'conference_id':
                for(var i = 0; i < response.columns.length; i++) {
                    if(response.columns[i] === "room_jid") {
                        response.columns[i] = "room_name";
                        for(var j = 0; j < response.points.length; j++) {
                            var jid =response.points[j][i];
                            //we assume the conference name does not include a @
                            response.points[j][i] = jid.substr(0, jid.indexOf('@'));
                        }
                    }
                }
                break;
        }
        return response;
    }
});