/**
 * This library generates non-standard InnoDB-optimized UUIDs
 *
 * If you are using MySQL, uuids can add overhead. We can create
 * more performant, but non-standard UUIDs that help speed up insets
 * and is sized to fit inside a binary(16) column.
 *
 * For more info see:
 *   http://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/
 *
 * Here are the steps involved in this process:
 *
 *   UUID1:      13341cb5-c1f8-11e4-91e7-080027880ca6
 *   Transpose:  11e4-c1f8-13341cb5-91e7-080027880ca6
 *   Resize:     11E4C1F813341CB591E7080027880CA6
 *
 **/
var uuid = require('uuid');

module.exports.generate = function() {

  // Generate v1 uuid
  var unoptimized = uuid.v1();

  // Transpose
  var optimized = unoptimized.substr(14, 4) +
    unoptimized.substr(9, 4) +
    unoptimized.substr(0, 8) +
    unoptimized.substr(19, 17);

  // Resize
  var formatted = optimized.replace('-', '').toUpperCase();

  return formatted;
}
