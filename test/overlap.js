var assert = require('assert'),
	overlap = require('../scripts/overlap'),
	now = new Date().getTime(),
	// Note: none of these times include daylight savings
	honoluluUTCSeconds = -36000,
	sanFranciscoUTCSeconds = -28800,
	chicagoUTCSeconds = -21600,
	torontoUTCSeconds = -18000,
	santiagoUTCSeconds = -14400,
	riodejaneiroUTCSeconds = -10800,
	londonUTCSeconds = 0,
	berlinUTCSeconds = 3600,
	istanbulUTCSeconds = 7200,
	nairobiUTCSeconds = 10800,
	newDeliUTCSeconds = 19800,
	bangkokUTCSeconds = 25200,
	perthUTCSeconds = 28800,
	darwinUTCSeconds = 34200,
	melbourneUTCSeconds = 36000, // Note: non DST time.
	sydneyUTCSeconds = 36000,
	christchurchUTCSeconds = 43200;

describe('Overlap with Melbourne', function() {

	it('should be 4 hours Tuesday to Saturday for Honolulu, with a late finish option', function(done) {
		var honoluluOverlap = overlap.calcOverlap(honoluluUTCSeconds, melbourneUTCSeconds);
		assert.equal(honoluluOverlap.hours, 4);
		assert.equal(honoluluOverlap.workOnSaturday, true);
		assert.equal(honoluluOverlap.lateFinishIncreasesOverlap, true)
		done();
	});

	it('should be 2 hours Tuesday to Saturday for San Francisco, with a late finish option', function(done) {
		var sanFranciscoOverlap = overlap.calcOverlap(sanFranciscoUTCSeconds, melbourneUTCSeconds);
		assert.equal(sanFranciscoOverlap.hours, 2);
		assert.equal(sanFranciscoOverlap.workOnSaturday, true);
		assert.equal(sanFranciscoOverlap.lateFinishIncreasesOverlap, true)
		done();
	});

	it('should be 0 hours for Chicago', function(done) {
		assert.equal(overlap.calcOverlap(chicagoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for Toronto', function(done) {
		assert.equal(overlap.calcOverlap(torontoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for Santiago', function(done) {
		assert.equal(overlap.calcOverlap(santiagoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for Rio de Janeiro', function(done) {
		assert.equal(overlap.calcOverlap(riodejaneiroUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for London', function(done) {
		assert.equal(overlap.calcOverlap(londonUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for Berlin', function(done) {
		assert.equal(overlap.calcOverlap(berlinUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 0 hours for Istanbul', function(done) {
		assert.equal(overlap.calcOverlap(istanbulUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should be 1 hour for Nairobi', function(done) {
		assert.equal(overlap.calcOverlap(nairobiUTCSeconds, melbourneUTCSeconds).hours, 1);
		done();
	});

	it('should be 3.5 hours for New Deli with an early start option', function(done) {
		var newDeliOverlap = overlap.calcOverlap(newDeliUTCSeconds, melbourneUTCSeconds);
		assert.equal(newDeliOverlap.hours, 3.5);
		assert.equal(newDeliOverlap.earlyStartIncreasesOverlap, true);		
		done();
	});

	it('should be 5 hours for Bangkok', function(done) {
		assert.equal(overlap.calcOverlap(bangkokUTCSeconds, melbourneUTCSeconds).hours, 5);
		done();
	});

	it('should be 6 hours for Perth', function(done) {
		assert.equal(overlap.calcOverlap(perthUTCSeconds, melbourneUTCSeconds).hours, 6);
		done();
	});

	it('should be 7.5 hours for Darwin', function(done) {
		assert.equal(overlap.calcOverlap(darwinUTCSeconds, melbourneUTCSeconds).hours, 7.5);
		done();
	});

	it('should be 8 hours if in the same timezone as Melbourne', function(done) {
		assert.equal(overlap.calcOverlap(sydneyUTCSeconds, melbourneUTCSeconds).hours, 8);
		done();
	});

	it('should be 6 hours for Chirstchurch', function(done) {
		assert.equal(overlap.calcOverlap(christchurchUTCSeconds, melbourneUTCSeconds).hours, 6);
		done();
	});

});

describe('Overlap with San Francico', function() {

	it('should be 2 hours Sunday to Thursday for Melbourne', function(done) {
		var christchurchOverlap = overlap.calcOverlap(melbourneUTCSeconds, sanFranciscoUTCSeconds);
		assert.equal(christchurchOverlap.hours, 2);
		assert.equal(christchurchOverlap.workOnSunday, true);
		done();
	});

	it('should be 4 hours Sunday to Thursday for Chirstchurch', function(done) {
		var christchurchOverlap = overlap.calcOverlap(christchurchUTCSeconds, sanFranciscoUTCSeconds);
		assert.equal(christchurchOverlap.hours, 4);
		assert.equal(christchurchOverlap.workOnSunday, true);
		done();
	});

	it('should be 6 hours for Honolulu', function(done) {
		assert.equal(overlap.calcOverlap(honoluluUTCSeconds, sanFranciscoUTCSeconds).hours, 6);
		done();
	});

	it('should be 8 hours if in the same timezone as San Francisco', function(done) {
		assert.equal(overlap.calcOverlap(sanFranciscoUTCSeconds, sanFranciscoUTCSeconds).hours, 8);
		done();
	});

});