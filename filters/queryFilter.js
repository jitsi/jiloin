angular.module('jitsiLogs').filter('queryFilter', function() {
    return function(response, fieldName) {
        switch(fieldName) {
            case 'conference_id':
                for(var i = 0; i < response[1].columns.length; i++) {
                    if(response[1].columns[i] === "room_jid") {
                        response[0].columns[4] = "room_name";
                        for(var j = 0; j < response[1].points.length; j++) {
                            var jid = response[1].points[j][i];
                            //we assume the conference name does not include a @
                            response[0].points[j][4] = jid.substr(0, jid.indexOf('@'));
                        }
                    }
                }
                response.pop(1);
                break;
        }
        return response;
    }
});