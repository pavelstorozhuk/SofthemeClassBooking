// Run javascript after DOM is initialized
$(document).ready(function() {

	$('#map_canvas').mapit({
	latitude:    50.4290033,
	longitude:   30.5175821,
	zoom:        18,
	type:        'ROADMAP',
	scrollwheel: false,
	marker: {
		latitude:   50.4290033,
		longitude:  30.5175821,
		icon:       "/Content/images/marker_red.png",
		title:      'The Hotel',
		open:       false,
		center:     true
	},
	address: '<h2>The Hotel</h2><p>Address 1, Area - County<br />Athens 123 45, Greece</p><p>Tel.: +30 210 123 4567<br />Fax: +30 210 123 4567</p>',
	styles: 'GRAYSCALE',
	origins: [
		['37.936294', '23.947394'],
		['37.975669', '23.733868']
	]
	});

});

