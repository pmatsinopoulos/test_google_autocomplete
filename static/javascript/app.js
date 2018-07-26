$(function () {

    $('.maps-dynamic').each(function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.971524, lng: 23.725872},
            zoom: 17
        });
    });

    $('.places-autocomplete').each(function () {
        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(37.720010, 24.045452),
            new google.maps.LatLng(38.340910, 23.404130)
        );
        var options = {
            bounds: defaultBounds,
            types: ['address'],
            strictBounds: true,
            componentRestrictions: {country: 'gr'},
            // placeIdOnly: true
        };
        var input = $('#pac-input')[0];
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.setFields(['address_component',
            'adr_address',
            'alt_id',
            'formatted_address',
            'geometry',
            'icon',
            'id',
            'name',
            'permanently_closed',
            'photo',
            'place_id',
            'scope',
            'type',
            'url',
            'utc_offset',
            'vicinity']);
        var getPlaceSelected = function () {
            var place = autocomplete.getPlace();
            console.log(place);
        };
        autocomplete.addListener('place_changed', getPlaceSelected);
    });

    $('.mapbox-example').each(function () {

        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lhb2xhIiwiYSI6ImNqazExNjlrbzBibnIzanM0M2o5dGszdmwifQ.E5N02GWNWaJclZIMrp0uqg';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10?optimize=true',
            zoom: 12,
            center: [23.7275, 37.9838]
        });
        map.addControl(new mapboxgl.NavigationControl());
        console.log('Current zoom level: ', map.getZoom());

        var geojson = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [23.7275, 37.9838]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Αθήνα, Κέντρο',
                    URL: 'http://www.cnn.gr'
                }
            },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [23.7414, 38.0038]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'Αθήνα, Κυψέλη',
                        URL: 'http://www.google.com'
                    }
                }]
        };

        // add markers to map
        geojson.features.forEach(function (marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 25})
                    .setHTML('<h3>' + marker.properties.title + '</h3><a target="_blank" href="' + marker.properties.URL + '"><p>' + marker.properties.description + '</p></a>'))
                .addTo(map);
        });

    });

    $('.reverse-geocoding').each(function () {

        $('#button-get-long-lat').on('click', function () {
            var $input = $('#long-lat');
            var latlngStr = $input.val().split(',', 2);
            var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            var geocoder = new google.maps.Geocoder;
            var $textArea = $('#location-results');

            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    $textArea.html(JSON.stringify(results));
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
            return false;
        });
    });
});