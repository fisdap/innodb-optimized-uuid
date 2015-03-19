require('mocha-jscs')();
var assert = require('chai').assert;
var innodbOptimizedUuid = require('../lib/index.js');

describe('innodb optimized uuid', function() {
  describe('#generate', function() {
    var uuid = innodbOptimizedUuid.generate();
    var uuid2 = innodbOptimizedUuid.generate();
    it('returns a 32 character long string', function() {
      var uuidIsAString = (typeof uuid == 'string' || uuid instanceof String);
      assert.isTrue(uuidIsAString);
      assert.lengthOf(uuid, 32);
    });
    it('returns a string without hyphens', function() {
      assert.notInclude(uuid, '-');
    });
    it('returns unique-ish strings when run twice', function() {
      assert.notEqual(uuid, uuid2);
    });
  });
});
