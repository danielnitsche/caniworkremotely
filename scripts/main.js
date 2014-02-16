(function($) {

	var localUTC = new Date().getTimezoneOffset() * 60 * -1, // convert to seconds (* -1 to match expected offset, not what JS returns)
		locationURL = 'https://maps.googleapis.com/maps/api/geocode/json',
		timezoneURL = 'https://maps.googleapis.com/maps/api/timezone/json',
		timestamp = new Date().getTime()/1000,
		calcOverlap = overlap.calcOverlap;

	$('.question').addEventListener('submit', function(e) {
		e.preventDefault();
		$('body').className = 'answering';
		$('.answer').innerHTML = '';
		var location = $('.location').value;
		setTimeout(function() {
			$('body').className += ' elapsed-1'
		}, 1000);

		getRemoteUTC(location, function(remoteUTC) {
			if (remoteUTC === false) {
				display('<span class="yesorno">I’m not sure :(</span> <span class="because">I couldn’t work out where that is</span>');
			} else {
				if (remoteUTC == localUTC) {
					display('<span class="yesorno">Yes</span> <span class="because">you’re in the same timezone as the company headquarters</span>');
				} else {
					// Determine overlap and display results
					var overlap = calcOverlap(remoteUTC, localUTC);

					if (overlap.hours === 0) {
						display('<span class="yesorno">No</span> <span class="because">there is no overlap between you and the company headquarters</span>');
					} else if (overlap.hours >= 4) {
						if (overlap.workOnSaturday) {
							display('<span class="yesorno but">Yes</span> <span class="info">if you work Tuesday to Saturday</span>');
						} else if (overlap.workOnSunday) {
							display('<span class="yesorno but">Yes</span> <span class="info">if you work Sunday to Thursday</span>');
						} else {
							display('<span class="yesorno">Yes</span> <span class="because">there are four or more hours of overlap</span>');
						}
					} else if (overlap.hours < 4) {
						if (overlap.earlyStartIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('<span class="yesorno but">Yes</span> <span class="info">if you work Tuesday to Saturday and shift your working day a couple of hours earlier</span>');
							} else if (overlap.workOnSunday) {
								display('<span class="yesorno but">Yes</span> <span class="info">if you work Sunday to Thursday and shift your working day a couple of hours earlier</span>');
							} else {
								display('<span class="yesorno but">Yes</span> <span class="info">if you shift your working day a couple of hours earlier</span>');
							}
						} else if (overlap.lateFinishIncreasesOverlap) {
							if (overlap.workOnSaturday) {
								display('<span class="yesorno but">Yes</span> <span class="info">if you work Tuesday to Saturday shift your working day a couple of hours later</span>');
							} else if (overlap.workOnSunday) {
								display('<span class="yesorno but">Yes</span> <span class="info">if you work Sunday to Thurdsay and shift your working day a couple of hours later</span>');
							} else {
								display('<span class="yesorno but">Yes</span> <span class="info">if you shift your working day a couple of hours later</span>');
							}
						} else {
							display('No <span class="because">There is not enough overlap between the two timezones (' + overlap.hours + ' hours at min)</span>');
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