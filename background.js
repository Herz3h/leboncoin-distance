console.log("background started");
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.method == 'Distance') {
        console.log(request);
        Distance(request.origin, request.destination_lat, request.destination_lng, sendResponse);
        return true;
    }
});

function Distance(origin, destination_lat, destination_lng, sendResponse)
{
    console.log(origin);
    var service = new google.maps.DistanceMatrixService();
    var sendR = chrome.runtime.sendResponse;
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [new google.maps.LatLng(destination_lat, destination_lng)],
        travelMode: google.maps.TravelMode.DRIVING,
    }, function(response, status)
    {
        console.log(response);
        sendResponse({r: response});
    });
}
