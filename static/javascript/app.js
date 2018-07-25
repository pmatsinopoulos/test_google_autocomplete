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
        var getPlaceSelected = function() {
            var place = autocomplete.getPlace();
            console.log(place);
        };
        autocomplete.addListener('place_changed', getPlaceSelected);
    });
});