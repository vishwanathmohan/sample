var map;
var marker1, marker2, poly, geodesicPoly, isFirstTime = true;
var infoWindow;
var markers = [];
var markerCluster;
var lang = '', lang_text = '';
var last_hide_marker;

var selectedObjData;

function getMiniInfoSVG(params) {
    return '<svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><defs><style>.cls-1{fill:#2e97de;}.cls-2{fill:#fff;}.small{font: 10px;fill:#ffffff;text-anchor: middle;}</style></defs><title>Icon_others</title><circle class="cls-1" cx="5" cy="5" r="4.5"/><path class="cls-2" d="M5,1A4,4,0,1,1,1,5,4,4,0,0,1,5,1M5,0a5,5,0,1,0,5,5A5,5,0,0,0,5,0Z"/></svg>';
}

function initMap() {

    ////$('.loader').css('display','block');

    infoWindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 3,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f3f3f3"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c0c0c0"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c7e2f5"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });

    map.setOptions({ minZoom: 3, maxZoom: 6 });

    // Ditect Current Location
    ditectCurrentLocation();

    // Service Call to load json locations
    httpServiceCall();

    //getRouteMap();
}

var currlat;
var currlng;
var geocoder;

// getting current location
function ditectCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setUserMarker(position.coords.latitude, position.coords.longitude);
            },

            function () {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        console.log("GET USER STREET, Pincode...");
        handleLocationError(false, infoWindow, map.getCenter());

    }
}

function geocodeAddress(address) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            try {
                setUserMarker(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            } catch (e) {
                console.log("Error :", e);
            }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Location ditect Error Handling
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    /*$.ajax{
        url: "----URL----",
        dataType: "json",
        success: function (data) {
            console.log(data);    
            geocodeAddress(data.address.address);
            appendCopyright(data.custumerRegistry.locations.code);
        }
    });*/
    geocodeAddress('Germany');
    //geocodeAddress('Hyderabad');
    //appendCopyright('Deutsch');  // data.custumer  
}

function setUserMarker(latitude, longitude) {
    var icon = {
        url: "images/my_pointer.svg", // url
        scaledSize: new google.maps.Size(40, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(20, 42) // anchor        
    };

    currlat = latitude;
    currlng = longitude;

    var pos = {
        lat: currlat,
        lng: currlng
    };

    new google.maps.Marker({
        //position: map.getCenter(),
        position: pos,
        icon: icon,
        map: map
    });

    map.setCenter(pos);
}

function httpServiceCall() {
    $.ajax({
        url: "locations.json",
        dataType: "json",
        success: function (data) {

            lang = 'de'; //de //en
            if (lang == 'en') {
                lang_text = 'from';
            } else {
                lang_text = 'ab';
            }
            appendCopyright(lang);


            $.each(data.offerList, function (key, data) {
                ////console.log(key, data);

                // to load all points
                loadAllPinPoints(key, data);
            });
            //markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            markerCluster = new MarkerClusterer(map, markers, { imagePath: 'images/mini_info' });
        }
    });
    /*$.post("demo_test_post.asp",
    {
        lanT: currlng,
        latT: currlat
    },
    function(data, status){
        $.each(data, function (key, data) {
            console.log(key, data);

            // to load all points
            loadAllPinPoints(key, data);
        });
    });*/
}

function loadAllPinPoints(key, data) {
    var mylatlng = new google.maps.LatLng(
        data.Destination.geo.latitude_deg,
        data.Destination.geo.longitude_deg
    );

    var icon1 = {
        url: "images/mini_info.png",
        labelOrigin: new google.maps.Point(23, 9)
    };

    var icon2 = {
        url: "images/info.png", // url
        labelOrigin: new google.maps.Point(23, 9)
    };

    var marker_over = new google.maps.Marker({
        position: mylatlng,
        map: map,
        icon: icon2,
        label: { color: '#FFFFFF', fontSize: '13px', text: data.Destination.code },
        optimized: false,
        visible: true
    });

    var marker = new google.maps.Marker({
        position: mylatlng,
        map: map,
        icon: icon1,
        label: { color: '#ffffff', fontSize: '13px', text: data.totalPrice + " €" },
        optimized: false,
        visible: true,
        price: data.totalPrice
    });

    markers.push(marker);

    selectedObjData = data;

    var infoDetailsPopup =
        '<div class="infoBubbleDetail">' +
        '    <div id="fromlocation">' + data.Origin.code + '</div>' +
        '    <div id="tolocation">' + data.Destination.code + '</div>' +
        '    <div id="fromdate">' + dateStyling(data.departureDate) + '</div> ' +
        '    <div id="todate">' + dateStyling(data.returnDate) + '</div>' +
        '    <div id="totalprice">' + data.totalPrice + ' € </div> ' +
        '    <div id="airlines"><img class="airlineImg" onerror=this.src="https://packit-assets.aerticket-it.de/Airlinelogos/CHARTER.png" src="https://packit-assets.aerticket-it.de/Airlinelogos/' + String(data.airline.iataCode).toLocaleLowerCase() + '.png">' +
        '        <div id="airlinescode">' + data.airline.iataCode + '</div>' +
        '    </div>' +
        '</div>';

    infoDetailsBubble = new InfoBubble({
        map: map,
        position: new google.maps.LatLng(
            data.Origin.latitude,
            data.Origin.longitude
        ),
        shadowStyle: 0,
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 0,
        arrowSize: 0,
        borderWidth: 0,
        disableAutoPan: true,
        hideCloseButton: true,
        arrowSize: 7,
        ////pixelOffset: new google.maps.Size(130, 120),
        pixelOffset: new google.maps.Size(0, 0),
        ////arrowPosition: 35,
        arrowPosition: 35,
        arrowStyle: 0
    });

    $(infoDetailsBubble.bubble_).on("click", ".infoBubbleDetail", function (e) {
        console.log("LOAD Page....", selectedObjData);
        window.open('http://google.com?location=' + selectedObjData.Origin.name);
    });

    $(infoDetailsBubble.bubble_).on("mouseover", ".infoBubbleDetail", function (e) {

    });

    google.maps.event.addListener(marker, "mouseover", function () {
        marker_over.setVisible(true);
    });
    google.maps.event.addListener(marker_over, "mouseout", function () {
        marker_over.setVisible(false);
    });

    google.maps.event.addListener(marker_over, "click", function (event) {
        if (last_hide_marker) {
            last_hide_marker.setVisible(true);
        }
        last_hide_marker = marker;
        marker.setVisible(false);

        infoDetailsBubble.setContent(infoDetailsPopup);
        infoDetailsBubble.open(map, this);

        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();

        marker1 = new google.maps.Marker({
            map: map,
            draggable: true,
            position: { lat: currlat, lng: currlng }
        });

        marker2 = new google.maps.Marker({
            map: map,
            draggable: true,
            position: { lat: latitude, lng: longitude }
        });

        google.maps.event.addListener(marker1, 'position_changed', update);
        google.maps.event.addListener(marker2, 'position_changed', update);

        if (isFirstTime == true) {
            poly = new google.maps.Polyline({
                strokeColor: '#d6d6d6',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: map,
            });

            geodesicPoly = new google.maps.Polyline({
                strokeColor: '#313c45',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
                map: map
            });
            isFirstTime = false;
        }
        update();
    });

    marker_over.setVisible(false)

    marker.setMap(map);

    setTimeout(() => {
        //// $('.loader').css('display','none');
    }, 2000);    
}

function update() {
    marker1.setVisible(false); // maps API hide call
    marker2.setVisible(false); // maps API hide call
    var path = [marker1.getPosition(), marker2.getPosition()];
    poly.setPath(path);
    geodesicPoly.setPath(path);

    try {
        clearInterval(timer);
    } catch (e) {

    }
    timer = setInterval(function () {
        marker1.setVisible(false); // maps API hide call
        marker2.setVisible(false); // maps API hide call
    }, 1);
}

var timer;

// Libs
function month_name(dt) {
    mlist = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ];
    return mlist[parseInt(dt)];
}

function dateStyling(params) {
    // console.log(params);
    var date = params.split("-");
    return date[2] + "<small> " + month_name(date[1]) + "</small>";
}

function appendCopyright(lang) {
    var text = '';
    if (lang == 'en') {
        text = 'Prices were found within the last 24 hours and are for return flights in Economy Class including 1 bag, taxes and fees.';
    } else if (lang == 'de') {
        text = 'Die Preise wurden innerhalb der letzten 24 Stunden gefunden und gelten für Hin- und Rückflug in der Economy Class inklusive 1 Gepäckstück, Steuern und Gebühren.';
    }
    $('#clarifyprice').empty();
    $('#clarifyprice').append('<p>' + text + '</p>');
}
