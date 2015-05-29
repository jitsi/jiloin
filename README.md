# Overview
Jiloin (Jitsi Logging Interface) in a web-interface used to display the data logged by a [Jitsi Meet](https://github.com/jitsi/jitsi-meet/) installation to an InfluxDB database.

# Installation
## 1. Enable logging
First you need to [enable logging to InfluxDB](https://github.com/jitsi/jitsi-meet/blob/master/doc/influxdb.md) in
your Jitsi Meet installation. 

## 2. Make the contents of this repository accessible through a web-server.

For example, using nginx, you can do the following:

### A. Check out the repository
```sh
cd /opt
git clone https://github.com/jitsi/jiloin
```

### B. Setup nginx
Create /etc/nginx/sites-enabled/jiloin.example.com with the following contents:
```
server {
    listen 80;
    server_name jiloin.example.com;
    root /opt/jiloin;
}
```

Note that it is currently mandatory to have jiloin installed in the root of the
domain (that is, you can't use example.com/jiloin/, it needs to be 
jiloin.example.com/). This is a [known issue](https://github.com/jitsi/jiloin/issues/8).


## 3. Edit the jiloin configuration in <code>services/config.js</code>
You need to set the hostname and port number for access to InfluxDB, set <code>ssl:true</code> if InfluxDB is setup to support it (usually on port 8087), and the name of the database (this has to match the name configured while [setting up logging for Jitsi Meet](https://github.com/jitsi/jitsi-meet/blob/master/doc/influxdb.md)).

## 4. Open up jiloin.example.com in your browser and login with your InfluxDB username and password.

# Troubleshooting

## If you get "Cross-Origin Request Blocked" errors in your browser, make sure that:

* jiloin uses the same hostname as the influxdb instance
* the protocol (http or https) is the same in the browser and in <code>services/config.js</code>
* InfluxDB is configured with the same hostname as jiloin (look for the "hostname" field in <code>config.toml</code>)

