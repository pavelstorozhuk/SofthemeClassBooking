// Run javascript after DOM is initialized

$(document)
    .ready(function () {
        $('#map_canvas')
            .mapit({
                latitude: 50.4290312,
                longitude: 30.5181806,
                zoom: 17,
                type: 'ROADMAP',
                scrollwheel: false,
                marker: {
                    latitude: 50.4290312,
                    longitude: 30.5181987,
                    icon: "/Content/images/marker_red.png",
                    title: 'The Hotel',
                    open: false,
                    center: true
                },
                address:
                    '<h2>Softheme</h2>' +
                        '<p><img src="../images/planet.png"/> г. Киев, ул. Деловая, 5А</p>' +
                '<p>softheme.com</p>' +
                    'info@softheme.com',
                styles: 'GRAYSCALE',
                origins: [
                    ['37.936294', '23.947394'],
                    ['37.975669', '23.733868']
                ]
            });

    });



