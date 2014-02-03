(function(exports){

	// Daylight savings not currently considered
    exports.calcOverlap = function (remoteUTC, localUTC) {
		var now = new Date().getTime(),
			localTime = new Date(now + localUTC).getTime(),
			remoteTime = new Date(now + remoteUTC).getTime(),
			offsetHours = (remoteTime - localTime) / 60 / 60,
			offsetHoursAbs = Math.abs(offsetHours);

		if (offsetHoursAbs <= 4) {
			return { 'hours': 8 - offsetHoursAbs };
		} else if (offsetHoursAbs >= 16) {
			return {
				'hours': Math.abs(15 - offsetHoursAbs),
				'extended': {
					'start': 9 + 15 - offsetHours,
					'saturday': (offsetHours < 0),
					'sunday': (offsetHours > 0)
				}
			};
		} else if (offsetHoursAbs >= 5) {
			return { 'hours': offsetHoursAbs };
		} else {
			return { 'hours': offsetHoursAbs };
		}
	};

})(typeof exports === 'undefined'? this['overlap'] = {} : exports);