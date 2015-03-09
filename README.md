# Overview
Jiloin (Jitsi Logging Interface) in a web-interface used to display the data logged by a [Jitsi Meet](https://github.com/jitsi/jitsi-meet/) installation to an InfluxDB database.

# Usage
First you need to [enable logging to
InfluxDB](https://github.com/jitsi/jitsi-meet/blob/master/doc/influxdb.md) in
your Jitsi Meet installation. 

Afterwards you need to
<ol>
<li>Make the contents of this repository accessible through a web-server. Note
that is is currently mandatory to use a separate domain and have jiloin
installed in its root.</li>
<li>Edit <code>services/config.js</code>.</li>
<li>Configure your web-server to proxy requests to <code>/db/</code> to InfluxDB, in order to allow the JavaScript application running in the browser to access InfluxDB using the same host/port/protocol. See <code>doc/nginx-example-vhost.conf</code> for an example configuration for nginx.</li>
<ol>
