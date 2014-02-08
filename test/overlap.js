describe('overlap', function() {

	var assert = require('assert'),
		overlap = require('../scripts/overlap'),
		now = new Date().getTime(),
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

	it('should return 4 hours Tuesday - Saturday when comparing Melbourne and Honolulu', function(done) {
		var honoluluOverlap = overlap.calcOverlap(honoluluUTCSeconds, melbourneUTCSeconds);
		assert.equal(honoluluOverlap.hours, 4);
		assert.equal(honoluluOverlap.saturday, true);
		done();
	});

	it('should return 2 hours Tuesday - Saturday when comparing Melbourne and San Francisco', function(done) {
		var sanFranciscoOverlap = overlap.calcOverlap(sanFranciscoUTCSeconds, melbourneUTCSeconds);
		assert.equal(sanFranciscoOverlap.hours, 2);
		assert.equal(sanFranciscoOverlap.saturday, true);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Chicago', function(done) {
		assert.equal(overlap.calcOverlap(chicagoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Toronto', function(done) {
		assert.equal(overlap.calcOverlap(torontoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Santiago', function(done) {
		assert.equal(overlap.calcOverlap(santiagoUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Rio de Janeiro', function(done) {
		assert.equal(overlap.calcOverlap(riodejaneiroUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and London', function(done) {
		assert.equal(overlap.calcOverlap(londonUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Berlin', function(done) {
		assert.equal(overlap.calcOverlap(berlinUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 0 hours when comparing Melbourne and Istanbul', function(done) {
		assert.equal(overlap.calcOverlap(istanbulUTCSeconds, melbourneUTCSeconds).hours, 0);
		done();
	});

	it('should return 1 hour when comparing Melbourne and Nairobi', function(done) {
		assert.equal(overlap.calcOverlap(nairobiUTCSeconds, melbourneUTCSeconds).hours, 1);
		done();
	});

	it('should return 3.5 hours when comparing Melbourne and New Deli', function(done) {
		assert.equal(overlap.calcOverlap(newDeliUTCSeconds, melbourneUTCSeconds).hours, 3.5);
		done();
	});

	it('should return 5 hours when comparing Melbourne and Bangkok', function(done) {
		assert.equal(overlap.calcOverlap(bangkokUTCSeconds, melbourneUTCSeconds).hours, 5);
		done();
	});

	it('should return 6 hours when comparing Melbourne and Perth', function(done) {
		assert.equal(overlap.calcOverlap(perthUTCSeconds, melbourneUTCSeconds).hours, 6);
		done();
	});

	it('should return 7.5 hours when comparing Melbourne and Darwin', function(done) {
		assert.equal(overlap.calcOverlap(darwinUTCSeconds, melbourneUTCSeconds).hours, 7.5);
		done();
	});

	it('should return 8 hours if in the same timezone as Melbourne', function(done) {
		assert.equal(overlap.calcOverlap(sydneyUTCSeconds, melbourneUTCSeconds).hours, 8);
		done();
	});

	it('should return 6 hours when comparing Melbourne and Chirstchurch', function(done) {
		assert.equal(overlap.calcOverlap(christchurchUTCSeconds, melbourneUTCSeconds).hours, 6);
		done();
	});

});