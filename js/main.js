let get_http = (url, cb) => {
    $.getJSON(url,
        function (data, textStatus, jqXHR) {
            if (data && textStatus == "success") {
                cb(data);
            }
        }
    );
}

let get_query = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
};

let type_effect = (el, msg, cb, time=150) => {
    for (let i=0; i<msg.length; i++) {
        let letter = msg[i];
        setTimeout(() => {
            $(el).append(letter);

            // Callback after print completed
            if (i == msg.length-1) {
                if (cb) {
                    cb();
                }
            }
        }, time * i+1);
    }
}

let logo_animation = () => {
    $("#logo").css("width", `40%`);
    let change = false;
    setInterval(() => {
        if (change) {
            $("#logo").css("width", `40%`);
            change = false;
        } else {
            $("#logo").css("width", `35%`);
            change = true;
        }
    }, 1200);
}

// $(function () {
    let steamID = get_query('steamid');
    let map = get_query('mapname');
    let steamAPIURL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + STEAM_KEY + '&steamids=' + steamID;
    let crossOriginProvider = 'https://ignorecors-yipksgwdit.now.sh/?url=' + encodeURIComponent(steamAPIURL);

    logo_animation();

    get_http(crossOriginProvider, (data) => {
        // console.log(data);
        let player = data["response"]["players"][0];

        $('main').fadeIn();

        type_effect("#username", `Welcome`, () => {
            $('#steam_user').append(player["personaname"]);
            $('#steam_user').fadeIn(1500);

            type_effect("#map", `We're playing on`, () => {
                $('#steam_map').append(map);
                $('#steam_map').fadeIn(1500);
            });
        });
    });
// });


/**
 * GARRY'S MOD FUNCTION
 */
let total = 0;
let used = 0;
function SetFilesTotal( tot ) {
    total = tot;
}
function DownloadingFile( fileName ) {
    used++;
    refresh();
}
let refresh = () => {
    $('.progress').css('width', `${used/total * 100}%`)
}
