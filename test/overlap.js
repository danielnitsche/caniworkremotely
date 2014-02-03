describe('overlap', function() {

	var assert = require('assert'),
		overlap = require('../scripts/overlap'),
		now = new Date().getTime(),
		honoluluUTCSeconds = -36000,
		sanFranciscoUTCSeconds = -28800,
		chicagoUTCSeconds = -21600,
		torontoUTCSeconds = -18000,
		perthUTCSeconds = 28800,
		darwinUTCSeconds = 34200,
		melbourneUTCSeconds = 36000,
		sydneyUTCSeconds = 36000,
		christchurchUTCSeconds = 43200;

	it('should return 5 hours Tuesday - Saturday when comparing Melbourne and Honolulu', function(done) {
		var honoluluOverlap = overlap.calcOverlap(honoluluUTCSeconds, melbourneUTCSeconds);
		assert.equal(honoluluOverlap.hours, 5);
		assert.equal(honoluluOverlap.extended.saturday, true);
		done();
	});

	it('should return 3 hours Tuesday - Saturday when comparing Melbourne and San Francisco', function(done) {
		var sanFranciscoOverlap = overlap.calcOverlap(sanFranciscoUTCSeconds, melbourneUTCSeconds);
		assert.equal(sanFranciscoOverlap.hours, 3);
		assert.equal(sanFranciscoOverlap.extended.saturday, true);
		done();
	});

	it('should return 1 hour Tuesday - Saturday when comparing Melbourne and Chicago', function(done) {
		var chicagoOverlap = overlap.calcOverlap(chicagoUTCSeconds, melbourneUTCSeconds);
		assert.equal(chicagoOverlap.hours, 1);
		assert.equal(chicagoOverlap.extended.saturday, true);
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