// Apps.remove({})
// Events.remove({})
// Logs.remove({})
// Pages.remove({})
// Connexions.remove({})
// Health.remove({})
Servers.remove({})

parser = Meteor.npmRequire('ua-parser');
geoip = Meteor.npmRequire('geoip-lite');

Meteor.methods({
    Meteortics_Event: function(params) {

        // Server information
        //
        // {
        //     "_id" : "2JuSZ5FygvQu8Lo9N",
        //     "env" : {
        //         "XDG_VTNR" : "7",
        //         "XDG_SESSION_ID" : "c2",
        //         "SSH_AGENT_PID" : "2492",
        //         "CLUTTER_IM_MODULE" : "xim",
        //         "SELINUX_INIT" : "YES",
        //         "XDG_GREETER_DATA_DIR" : "/var/lib/lightdm-data/guillaume",
        //         "SESSION" : "ubuntu",
        //         "GPG_AGENT_INFO" : "/run/user/1000/keyring-UCqegi/gpg:0:1",
        //         "SHELL" : "/usr/bin/zsh",
        //         "XDG_MENU_PREFIX" : "gnome-",
        //         "VTE_VERSION" : "3409",
        //         "TERM" : "xterm",
        //         "SSH_AGENT_LAUNCHER" : "upstart",
        //         "DERBY_HOME" : "/usr/lib/jvm/java-7-oracle/db",
        //         "WINDOWID" : "75497484",
        //         "OLDPWD" : "/home/guillaume/.meteor/packages/meteor-tool/1.1.3/mt-os.linux.x86_64",
        //         "GNOME_KEYRING_CONTROL" : "/run/user/1000/keyring-UCqegi",
        //         "UPSTART_SESSION" : "unix:abstract=/com/ubuntu/upstart-session/1000/2387",
        //         "GTK_MODULES" : "overlay-scrollbar:unity-gtk-module",
        //         "ES_HEAP_SIZE" : "512m",
        //         "ZSH" : "/home/guillaume/.oh-my-zsh",
        //         "NVM_DIR" : "/home/guillaume/.nvm",
        //         "USER" : "guillaume",
        //         "XDG_SESSION_PATH" : "/org/freedesktop/DisplayManager/Session0",
        //         "XDG_SEAT_PATH" : "/org/freedesktop/DisplayManager/Seat0",
        //         "SSH_AUTH_SOCK" : "/run/user/1000/keyring-UCqegi/ssh",
        //         "DEFAULTS_PATH" : "/usr/share/gconf/ubuntu.default.path",
        //         "SESSION_MANAGER" : "local/guillaume-ALTIC:@/tmp/.ICE-unix/2579,unix/guillaume-ALTIC:/tmp/.ICE-unix/2579",
        //         "PAGER" : "less",
        //         "XDG_CONFIG_DIRS" : "/etc/xdg/xdg-ubuntu:/usr/share/upstart/xdg:/etc/xdg",
        //         "LSCOLORS" : "Gxfxcxdxbxegedabagacad",
        //         "PATH" : "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/jvm/java-7-oracle/bin:/usr/lib/jvm/java-7-oracle/db/bin:/usr/lib/jvm/java-7-oracle/jre/bin",
        //         "DESKTOP_SESSION" : "ubuntu",
        //         "QT_QPA_PLATFORMTHEME" : "appmenu-qt5",
        //         "QT_IM_MODULE" : "ibus",
        //         "NVM_NODEJS_ORG_MIRROR" : "http://nodejs.org/dist",
        //         "JOB" : "dbus",
        //         "PWD" : "/data1/Meteor/meteoranalytics/LOCAL",
        //         "JAVA_HOME" : "/usr/lib/jvm/java-7-oracle",
        //         "XMODIFIERS" : "@im=ibus",
        //         "LANG" : "fr_FR.UTF-8",
        //         "GNOME_KEYRING_PID" : "2385",
        //         "MANDATORY_PATH" : "/usr/share/gconf/ubuntu.mandatory.path",
        //         "GDM_LANG" : "fr_FR",
        //         "NODE_PATH" : "",
        //         "IM_CONFIG_PHASE" : "1",
        //         "COMPIZ_CONFIG_PROFILE" : "ubuntu",
        //         "UBUNTU_MENUPROXY" : "1",
        //         "GDMSESSION" : "ubuntu",
        //         "SESSIONTYPE" : "gnome-session",
        //         "XDG_SEAT" : "seat0",
        //         "GIT_SSL_NO_VERIFY" : "true",
        //         "HOME" : "/home/guillaume",
        //         "SHLVL" : "1",
        //         "LANGUAGE" : "fr_FR",
        //         "GNOME_DESKTOP_SESSION_ID" : "this-is-deprecated",
        //         "LOGNAME" : "guillaume",
        //         "LESS" : "-R",
        //         "QT4_IM_MODULE" : "xim",
        //         "XDG_DATA_DIRS" : "/usr/share/ubuntu:/usr/share/gnome:/usr/local/share/:/usr/share/",
        //         "J2SDKDIR" : "/usr/lib/jvm/java-7-oracle",
        //         "DBUS_SESSION_BUS_ADDRESS" : "unix:abstract=/tmp/dbus-z5KAryMdKR",
        //         "LC_CTYPE" : "fr_FR.UTF-8",
        //         "TEXTDOMAIN" : "im-config",
        //         "INSTANCE" : "",
        //         "DISPLAY" : ":0.0",
        //         "XDG_RUNTIME_DIR" : "/run/user/1000",
        //         "J2REDIR" : "/usr/lib/jvm/java-7-oracle/jre",
        //         "GTK_IM_MODULE" : "ibus",
        //         "XDG_CURRENT_DESKTOP" : "Unity",
        //         "TEXTDOMAINDIR" : "/usr/share/locale/",
        //         "COLORTERM" : "gnome-terminal",
        //         "XAUTHORITY" : "/home/guillaume/.Xauthority",
        //         "PORT" : "29255",
        //         "ROOT_URL" : "http://localhost:3000/",
        //         "MONGO_URL" : "mongodb://127.0.0.1:3001/meteor",
        //         "MOBILE_DDP_URL" : "http://localhost:3000",
        //         "MOBILE_ROOT_URL" : "http://localhost:3000",
        //         "MONGO_OPLOG_URL" : "mongodb://127.0.0.1:3001/local",
        //         "METEOR_SETTINGS" : "{\n\t\"meteortics\":{\n\t\t\"appId\":\"itJKKC4h4o9H8vv2g\",\n\t\t\"secret\":\"testApp\"\n\t}\n}",
        //         "APP_ID" : "1ivb2uxdegwk22jpwps",
        //         "NODE_ENV" : "development",
        //         "HTTP_FORWARDED_COUNT" : "1",
        //         "METEOR_SHELL_DIR" : "/data1/Meteor/meteoranalytics/LOCAL/.meteor/local/shell",
        //         "METEOR_PARENT_PID" : "12525",
        //         "METEOR_PRINT_ON_LISTEN" : "true"
        //     },
        //     "arch" : "x64",
        //     "version" : "v0.10.36",
        //     "meteortics_version" : "0.0.1",
        //     "release" : "METEOR@1.1.0.2",
        //     "platform" : "linux",
        //     "type" : "server_info",
        //     "processMem" : 109789184,
        //     "hostname" : "guillaume-ALTIC",
        //     "os_release" : "3.13.0-43-generic",
        //     "webapp" : null,
        //     "uptime" : 120624.362685558,
        //     "memory" : 12516794368,
        //     "cpus" : [ 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 800,
        //             "times" : {
        //                 "user" : 36757600,
        //                 "nice" : 5337600,
        //                 "sys" : 9319700,
        //                 "idle" : 599172400,
        //                 "irq" : 1800
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 800,
        //             "times" : {
        //                 "user" : 38306500,
        //                 "nice" : 5377100,
        //                 "sys" : 6391500,
        //                 "idle" : 9934400,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 1900,
        //             "times" : {
        //                 "user" : 37537600,
        //                 "nice" : 5113800,
        //                 "sys" : 6535300,
        //                 "idle" : 10028400,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 800,
        //             "times" : {
        //                 "user" : 38384200,
        //                 "nice" : 4988400,
        //                 "sys" : 6038300,
        //                 "idle" : 10087700,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 2301,
        //             "times" : {
        //                 "user" : 27314800,
        //                 "nice" : 3972800,
        //                 "sys" : 4052100,
        //                 "idle" : 10826200,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 2100,
        //             "times" : {
        //                 "user" : 26476000,
        //                 "nice" : 3839200,
        //                 "sys" : 3889900,
        //                 "idle" : 11042000,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 900,
        //             "times" : {
        //                 "user" : 26081800,
        //                 "nice" : 3896800,
        //                 "sys" : 4362800,
        //                 "idle" : 10913300,
        //                 "irq" : 0
        //             }
        //         }, 
        //         {
        //             "model" : "Intel(R) Core(TM) i7-4712MQ CPU @ 2.30GHz",
        //             "speed" : 900,
        //             "times" : {
        //                 "user" : 26615400,
        //                 "nice" : 3675500,
        //                 "sys" : 3993100,
        //                 "idle" : 10998700,
        //                 "irq" : 0
        //             }
        //         }
        //     ],
        //     "networkInterfaces" : {
        //         "lo" : [ 
        //             {
        //                 "address" : "127.0.0.1",
        //                 "family" : "IPv4",
        //                 "internal" : true
        //             }, 
        //             {
        //                 "address" : "::1",
        //                 "family" : "IPv6",
        //                 "internal" : true
        //             }
        //         ],
        //         "wlan0" : [ 
        //             {
        //                 "address" : "192.168.0.38",
        //                 "family" : "IPv4",
        //                 "internal" : false
        //             }, 
        //             {
        //                 "address" : "fe80::fef8:aeff:fe5b:f270",
        //                 "family" : "IPv6",
        //                 "internal" : false
        //             }
        //         ]
        //     },
        //     "modules" : {
        //         "http_parser" : "1.0",
        //         "node" : "0.10.36",
        //         "v8" : "3.14.5.9",
        //         "ares" : "1.9.0-DEV",
        //         "uv" : "0.10.30",
        //         "zlib" : "1.2.8",
        //         "modules" : "11",
        //         "openssl" : "1.0.1l"
        //     },
        //     "freemem" : 625905664,
        //     "loadavg" : [ 
        //         1.1181640625, 
        //         1.36474609375, 
        //         1.43359375
        //     ],
        //     "appId" : "itJKKC4h4o9H8vv2g",
        //     "serverId" : "XyNBa45LStoP4fjDk"
        //     "createdAt" : ISODate("2015-06-04T19:12:28.787Z"),
        //     "createdBy" : "0"
        // }
        if (params.type == 'server_info') {
            // console.log('server_info', params)
            
            var server = Servers.find({serverId:params.serverId})
            if(server.count()==0){
                Servers.insert(params)
            }
        }

         // Health received
        if (params.type == 'health') {
            // console.log('health', params)
            Health.insert(params)
            Servers.update({serverId:params.serverId},{$set:{
                usedmemory:params.usedmemory,
                freemem:params.freemem,
                loadavg:params.loadavg,
                uptime:params.uptime,
                processMem:params.processMem
            }})
        }


        // Logs received
        // Format :
        // {
        //     "_id" : "bBGTHZyRXbMkL94Tc",
        //     "text" : "sending event type client_connexion\n",
        //     "appId" : "JxwD2aWBApNjnszRq",
        //     "type" : "log",
        //     "createdAt" : ISODate("2015-06-04T09:28:01.719Z"),
        //     "createdBy" : "0"
        // }
        if (params.type == 'log') {
            Logs.insert(params)
        }


        if (params.type == 'client_connexion') {
            // { ip: '127.0.0.1',
            //   headers:
            //    { 'x-forwarded-for': '127.0.0.1',
            //      host: 'localhost:3000',
            //      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
            //      'accept-language': 'fr-FR,fr;q=0.8,en;q=0.6,en-US;q=0.4',
            //      'x-ip-chain': [ '127.0.0.1', '127.0.0.1' ] },
            //   ddp: '1',
            //   key: '',
            //   secure: false,
            //   language: 'fr',
            //   referrer: '',
            //   uid: 'keJNqhhaYEJF5CB4Y',
            //   sid: 'J3G4ZNaNYZ99mN7CS',
            //   type: 'init' }

            //FOR TESTING
            Events.insert(params)

            if (params.ip == '127.0.0.1')
                params.ip = '89.3.191.30'
            var ua = parser.parse(params.headers['user-agent']);
            var geo = geoip.lookup(params.ip);
            params.ua = ua
            params.geo = geo
            // console.log('geo', params.ip, geo)

            Apps.update({
                _id: params.appId
            }, {
                $inc: {
                    usersConnected: 1
                }
            })
            params.opened = new Date()
            Sessions.insert(_.omit(params,'type'))
        }



        if (params.type == 'client_deconnexion') {
            // { count: 2, sid: '9pnHQdPJtpSinjWLt', type: 'deinit' }
            // console.log('client_deconnexion',params)
            Apps.update({
                _id: params.appId
            }, {
                $set: {
                    usersConnected: params.count
                }
            })

            Sessions.update({sessionId:params.sessionId},{$set:{closed:new Date()}})
        }


        if (params.type == 'event') {
            // { type: 'event',
            // 	template: 'searchbar',
            // 	selector: 'click .small-search-btn',
            // 	formdata: [ { name: 'querystring', value: 'foot' } ],
            // 	connection: 'riF3vRTZS3APTQfEL',
            // 	sid: 'riF3vRTZS3APTQfEL' }

        }


        if (params.type == 'page') {
            // { type: 'page',
            // 	title: 'DataAsso',
            // 	path: '/actualites',
            // 	params: [],
            // 	connection: 'keMKvQmTzhGLdcPay',
            // 	sid: 'keMKvQmTzhGLdcPay' }
            Pages.insert(params)
        }



        if (params.type == 'page_load') {
            // console.log('page_load', params)

        }

        


    }
})

var handle_server_info = function(params) {

}
