angular.module('jitsiLogs').service('QueryBuilder', ['Config', function(Config) {
    var schema = {
        "channel_created": ["content_name", "conference_id", "endpoint_id",
            "lastn", "channel_id"],
        "channel_expired": ["channel_id", "content_name", "conference_id"],
        "conference_created": ["conference_id", "focus"],
        "conference_expired": ["conference_id"],
        "conference_room": ["conference_id", "room_jid"],
        "content_created": ["name", "conference_id"],
        "content_expired": ["name", "conference_id"],
        "endpoint_created": ["conference_id", "endpoint_id"],
        "focus_created": ["room_jid"],
        "peer_connection_stats": ["conference_id", "endpoint_id", "stats"],
        "transport_channel_added": ["channel_id", "hash_code", "conference_id"],
        "transport_channel_removed": ["channel_id", "hash_code", "conference_id"],
        "transport_connected": ["conference_id", "selected_pairs", "hash_code"],
        "transport_created": ["num_components", "ufrag", "is_controlling",
            "hash_code", "conference_id"],
        "transport_state_changed": ["hash_code", "conference_id", "old_state",
            "new_state"]//,
        //endpoint_display_name: ["conference_id", "endpoint_id", "display_name"]
    };
    var tables = ["channel_created", "channel_expired", "conference_created",
        "conference_expired", "conference_room", "content_created",
        "content_expired", "endpoint_created", "focus_created",
        "peer_connection_stats", "transport_channel_added",
        "transport_channel_removed", "transport_connected", "transport_created",
        "transport_state_changed"];
    var clickableFields = {
        "channel_created": 'endpoint_id', "channel_expired" : 'endpoint_id', "conference_created": 'conference_id',
        "conference_expired": "conference_id", "conference_room": "conference_id", "content_created": "conference_id",
        "content_expired": "conference_id", "endpoint_created": "endpoint_id", "focus_created": "room_jid",
        "transport_channel_added": "hash_code", "transport_channel_removed": "hash_code",
        "transport_connected": "hash_code", "transport_created": "hash_code",
        "transport_state_changed":"hash_code"
    };
    var fieldsIn = {
        conference_id: "endpoint_created,conference_created,conference_room," +
            "conference_expired,channel_created,channel_expired,content_created," +
            "content_expired",
        endpoint_id: "endpoint_created,peer_connection_stats,channel_created", //add endpoint_display_name when integrated with jicofo
        //focus: "conference_created",
        room_jid: "conference_room"//,
        //display_name: "endpoint_display_name"
    };
    var queries = {
        conference_id_: "select " + schema.conference_created.join() + ",room_jid " +
            "from conference_created " +
            "inner join conference_room " +
            "where conference_created.conference_id = conference_room.conference_id"
    };
    return {
        getInitialQuery: function() {
            return "select * from conference_created, conference_room where " +
                "time > now() - " + Config.daysAgo + "d";
        },
        getQueryForValue: function(fieldName, value) {
            if(fieldsIn[fieldName]) {
                var time = new Date();
                time.setDate(time.getDate() - Config.daysAgo);
                return "select *" +
                        " from " + fieldsIn[fieldName] +
                        " where " + fieldName + "=~" + "/.*" + (value || '') +
                        ".*/" + " and time > now() - " + Config.daysAgo + 'd';
            }
            return "";
        },
        getCorrectOrder: function(fieldName) {
            return fieldsIn[fieldName];
        },
        getQueryForField: function(fieldName) {
            if(queries[fieldName]) {
                return queries[fieldName];
            }
            if(fieldsIn[fieldName]) {
                return "select * " +
                        "from " + fieldsIn[fieldName];
            }
            return "";
        },
        hasFieldsFor: function(field) {
            return fieldsIn[field] ? true : false;
        },
        getQueryForSeries: function(seriesName) {
            return "select " + schema[seriesName].join() +
                    " from " + seriesName;
        },
        getClickableField: function(tableName) {
            return clickableFields[tableName];
        }
    }
}]);