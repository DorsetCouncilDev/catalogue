function initMap(){
    var map;
    var locationLatitudes = document.getElementsByClassName('location-lat');
    var locationLongitudes = document.getElementsByClassName('location-lng');
    var locationStreetLatitudes = document.getElementsByClassName('location-street-lat');
    var locationStreetLongitudes = document.getElementsByClassName('location-street-lng');
    var locationStreetHeadings = document.getElementsByClassName('location-street-heading');
    var locationStreetPitches = document.getElementsByClassName('location-street-pitch');
    var lat = Number(locationLatitudes[0].value);
    var lng = Number(locationLongitudes[0].value);
    var position = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 14,
        mapTypeControlOptions: {
            mapTypeIds: [],
          }
    });
    createMarker(position, map);
    function createMarker(position, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
    
      
        })
       
    }
    if(typeof locationStreetLatitudes != 'undefined' && locationStreetLatitudes[0].value > 0){

        var streetLat = Number(locationStreetLatitudes[0].value);
        var streetLng = Number(locationStreetLongitudes[0].value);
        var streetHeading = Number(locationStreetHeadings[0].value);
        var streetPitch = Number(locationStreetPitches[0].value);

        console.log("slat: " + streetLat);
        console.log("slng: " + streetLng);
        console.log("shead: " + streetHeading);
        console.log("spitch: " + streetPitch);

         var panorama = new google.maps.StreetViewPanorama(document.getElementById('pan'), {
            position: {
                lat: streetLat,
                lng:streetLng
            },
            pov: {
                // direction facing, in degrees from north
                heading: streetHeading,
                // vertical angle, 0 - straight forward
                pitch: streetPitch
            },
            zoom: 1
        });  
    }
}