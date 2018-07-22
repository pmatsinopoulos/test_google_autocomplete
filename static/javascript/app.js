$(function () {
    $('.maps-dynamic').each(function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.971524, lng: 23.725872},
            zoom: 17
        });
    });
});