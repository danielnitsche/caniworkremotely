(function($) {

	var localUTC = new Date().getTimezoneOffset() * 60 * -1, // convert to seconds (* -1 to match expected offset, not what JS returns)
		locationURL = 'https://maps.googleapis.com/maps/api/geocode/json',
		timezoneURL = 'https://maps.googleapis.com/maps/api/timezone/json',
		timestamp = new Date().getTime()/1000,
		calcOverlap = overlap.calcOverlap;

	$('.question').addEventListener('submit', function(e) {
		e.preventDefault();
		$('body').className = 'answering';
		var location = $('.location').value;
		// Reset class names for second answer
		$('.answer').className = 'answer';
		$('.info').className = 'info';

		getRemoteUTC(location, function(remoteUTC) {
			if (remoteUTC === false) {
				display('I’m not sure :(', 'I couldn’t work out where that is', false);
			} else {
				if (remoteUTC == localUTC) {
					display('Yes', 'you’re in the same timezone as the company headquarters', false);
				} else {
					// Determine overlap and display results
					var overlap = calcOverlap(remoteUTC, localUTC);

					if (overlap.hours === 0) {
						display('No', 'there is no overlap between you and the company headquarters', false);
					} else if (overlap.hours >= 4) {
						if (overlap.workOnSaturday) {
							display('Yes', 'if you work Tuesday to Saturday', true);
						} else if (overlap.workOnSunday) {
							display('Yes', 'if you work Sunday to Thursday', true);
						} else {
							display('Yes', 'there are four or more hours of overlap', false);
						}
					} else if (overlap.hours < 4) {
						if (overlap.earlyStartIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('Yes', 'if you work Tuesday to Saturday and shift your working day a couple of hours earlier', true);
							} else if (overlap.workOnSunday) {
								display('Yes', 'if you work Sunday to Thursday and shift your working day a couple of hours earlier', false);
							} else {
								display('Yes', 'if you shift your working day a couple of hours earlier', true);
							}
						} else if (overlap.lateFinishIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('Yes', 'if you work Tuesday to Saturday shift your working day a couple of hours later', true);
							} else if (overlap.workOnSunday) {
								display('Yes', 'if you work Sunday to Thurdsay and shift your working day a couple of hours later', true);
							} else {
								display('Yes', 'if you shift your working day a couple of hours later', true);
							}
						} else {
							display('No', 'There is not enough overlap between the two timezones (' + overlap.hours + ' hours at min)', false);
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

	function display(answer, info, but) {
		$('.answer').innerHTML = answer;
		$('.info').innerHTML = info;

		if (but) {
			$('.answer').className += ' but';
			$('.info').className += ' but';
		}

		$('body').className += ' answered';
	}

	function getRemoteUTC(location, callback) {
		// Get lat and long from address
		ajax(locationURL + '?sensor=true&address=' + location, function(error, result) {
			if (error || !result || !result.results || !result.results[0] || !result.results[0].geometry.location) {
				callback(false);
			} else {
				var lat = result.results[0].geometry.location.lat,
					lng = result.results[0].geometry.location.lng,
					address = result.results[0].formatted_address;

				// Get timezone from lat and long
				ajax(timezoneURL + '?sensor=true&timestamp=' + timestamp + '&location=' + lat + ',' + lng, function(error, result) {
					if (error || !result || !result.hasOwnProperty('rawOffset')) {
						callback(false);
					} else {
						callback(result.rawOffset + result.dstOffset);
					}
				});
			}
		});
	}

})(document.querySelector.bind(document));