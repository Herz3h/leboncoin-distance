var UNIQUE_GDISTANCE_ID = 'crx_leboncoin_distance';

// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src ="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJMF5mkXuaiFqfgfxiKIv6bkpp2ZnHjKE&callback=initMap";
// document.head.appendChild(script);
$(function() {
    var item_supps = $('.item_infos > .item_supp:nth-child(3)');
    var geoSuccess = function(position)
    {
        var item_supp, current_item_supp;
        for(var i = 0;i < item_supps.length;i++)
        {
            current_item_supp = item_supps[i];
            item_supp = item_supps[i].textContent;
            item_supp = $.trim(item_supp).split('\n')[0];
            chrome.runtime.sendMessage({
                method: 'Distance', 
                origin: item_supp,
                destination_lat: position.coords.latitude,
                destination_lng: position.coords.longitude
            }, function(response)
            {
                console.log("response");
                current_item_supp.after(response.r.rows[0].elements[0].distance.text);
                console.log(response.r.rows[0].elements[0].distance.text);
            })

        }
    }
    if(navigator.geolocation) {
        console.log("supported");
        navigator.geolocation.getCurrentPosition(geoSuccess);

    }
})
