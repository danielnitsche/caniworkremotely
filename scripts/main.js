(function($) {

	var localUTC = new Date().getTimezoneOffset() * 60 * -1, // convert to seconds (* -1 to match expected offset, not what JS returns)
		locationURL = 'https://maps.googleapis.com/maps/api/geocode/json',
		timezoneURL = 'https://maps.googleapis.com/maps/api/timezone/json',
		timestamp = new Date().getTime()/1000,
		calcOverlap = overlap.calcOverlap;

	$('.question').addEventListener('submit', function(e) {
		e.preventDefault();
		$('.answer').innerHTML = '';
		var location = $('.location').value;

		getRemoteUTC(location, function(remoteUTC) {
			if (!remoteUTC) {
				display('I’m not sure: I couldn’t work out where ' + location + ' is :(');
			} else {
				if (remoteUTC == localUTC) {
					display('Yes: you’re in the same timezone.');
				} else {
					// Determine overlap and display results
					var overlap = calcOverlap(remoteUTC, localUTC);

					if (overlap.hours === 0) {
						display('No: there is no overlap between the two timezones.');
					} else if (overlap.hours >= 4) {
						if (overlap.workOnSaturday) {
							display('Yes, but: you’ll need to work Tuesday to Saturday.');
						} else if (overlap.workOnSunday) {
							display('Yes, but: you’ll need to work Sunday to Thursday.');
						} else {
							display('Yes: there is about ' + overlap.hours + ' hours overlap between the two timezones.');
						}
					} else if (overlap.hours < 4) {
						if (overlap.earlyStartIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('Yes, but: you’ll need to work Tuesday to Saturday, and you’ll need to shift your working day a couple of hours earlier.');
							} else if (overlap.workOnSunday) {
								display('Yes, but: you’ll need to work Sunday to Thursday, and you’ll need to shift your working day a couple of hours earlier.');
							} else {
								display('Yes, but: you’ll need to shift your working day a couple of hours earlier.');
							}
						} else if (overlap.lateFinishIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('Yes, but: you’ll need to work Tuesday to Saturday, and you’ll need shift your working day a couple of hours later.');
							} else if (overlap.workOnSunday) {
								display('Yes, but: you’ll need to work Sunday to Thurdsay, and you’ll need shift your working day a couple of hours later.');
							} else {
								display('Yes, but: you’ll need shift your working day a couple of hours later.');
							}
						} else {
							display('No: there is not enough overlap between the two timezones (' + overlap.hours + ' hours at min).');
						}
					}
				}
			}
		});
	});

	function ajax(url, callback) {
		jQuery.ajax({
			'dataType': 'json',
			'url': url,
			'timeout': 5000
		}).done(function(data) {
			callback(null, data);
		}).fail(function(data) {
			callback(true, false);
		});
	}

	function display(message) {
		$('.answer').innerHTML = message;
	}

	function getRemoteUTC(location, callback) {
		// Get lat and long from address
		ajax(locationURL + '?sensor=true&address=' + location, function(error, result) {
			if (error || !result || !result.results || !result.results[0].geometry.location) {
				callback(false);
			} else {
				var lat = result.results[0].geometry.location.lat,
					lng = result.results[0].geometry.location.lng;
				// Get timezone from lat and long
				ajax(timezoneURL + '?sensor=true&timestamp=' + timestamp + '&location=' + lat + ',' + lng, function(error, result) {
					if (error || !result || !result.rawOffset) {
						callback(false);
					} else {
						callback(result.rawOffset + result.dstOffset);
					}
				});
			}
		});
	}

})(document.querySelector.bind(document));