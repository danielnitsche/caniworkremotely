(function(exports){

    exports.calcOverlap = function (remoteUTC, localUTC) {
		var now = new Date().getTime(),
			localTime = new Date(now + localUTC).getTime(),
			remoteTime = new Date(now + remoteUTC).getTime(),
			remoteOffsetSeconds = localTime - remoteTime,
			remoteOffsetHours = remoteOffsetSeconds / 60 / 60,
			overlap = 0,
			saturday = false,
			sunday = false,
			maxOffsetHours = 8 + 3; // +3 = 6am start or 8pm finish.

		if (remoteOffsetHours >= 0 && remoteOffsetHours <= maxOffsetHours) {
			// Remote time ahead of local time.
			overlap = 8 - remoteOffsetHours;
		} else if (remoteOffsetHours <= 0 && remoteOffsetHours >= -maxOffsetHours) {
			// Remote time is behind local time
			overlap = 8 + remoteOffsetHours;
		} else if (remoteOffsetHours >= 0 && remoteOffsetHours > maxOffsetHours) {
			// Remote time is a day ahead of local time.
			overlap = 8 - (24 - remoteOffsetHours);
			saturday = true;
		} else if (remoteOffsetHours <= 0 && remoteOffsetHours < maxOffsetHours) {
			// Remote time is a day behind of local time.
			overlap = 8 - (24 + remoteOffsetHours);
			sunday = true;
		}

		if (remoteUTC == localUTC) {
			return { 'hours': 8 };
		} else {
			return { 
				'hours': (overlap >= 0) ? overlap : 0,
				'saturday': saturday
			};
		}
	};

})(typeof exports === 'undefined'? this['overlap'] = {} : exports);