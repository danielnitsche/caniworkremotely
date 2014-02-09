(function(exports){

    exports.calcOverlap = function (remoteUTC, localUTC) {
		var now = new Date().getTime(),
			localTime = new Date(now + localUTC).getTime(),
			remoteTime = new Date(now + remoteUTC).getTime(),
			remoteOffsetSeconds = -1 * (localTime - remoteTime),
			remoteOffsetHours = remoteOffsetSeconds / 60 / 60,
			overlap = 0,
			workOnSaturday = false,
			workOnSunday = false,
			earlyStartIncreasesOverlap = false,
			lateFinishIncreasesOverlap = false,
			maxOffsetHours = 8 + 3; // +3 = 6am start or 8pm finish.

		// Remote time ahead of local time, and is within range for an overlap.
		if (remoteOffsetHours >= 0 && remoteOffsetHours <= maxOffsetHours) {
			overlap = 8 - remoteOffsetHours;
			lateFinishIncreasesOverlap = true;

		// Remote time is behind local time, and is within range for an overlap.			
		} else if (remoteOffsetHours <= 0 && remoteOffsetHours >= -maxOffsetHours) {
			overlap = 8 + remoteOffsetHours;
			earlyStartIncreasesOverlap = true;

		// Remote time is a day ahead local time.
		} else if (remoteOffsetHours >= (24 - maxOffsetHours)) {
			overlap = 8 - (24 - remoteOffsetHours);
			earlyStartIncreasesOverlap = true;
			workOnSunday = true;
		
		// Remote time is a day behind local time.			
		} else if (remoteOffsetHours <= -1 * (24 - maxOffsetHours)) {
			overlap = 8 - (24 + remoteOffsetHours);
			lateFinishIncreasesOverlap = true;
			workOnSaturday = true;
		}

		if (remoteUTC == localUTC) {
			return { 'hours': 8 };
		} else {
			return {
				'hours': (overlap >= 0) ? overlap : 0,
				'workOnSaturday': workOnSaturday,
				'workOnSunday': workOnSunday,
				'earlyStartIncreasesOverlap': earlyStartIncreasesOverlap,
				'lateFinishIncreasesOverlap': lateFinishIncreasesOverlap
			};
		}
	};

})(typeof exports === 'undefined'? this['overlap'] = {} : exports);