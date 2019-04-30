//TODO: check if time is valid
/**
 * Convert .lrc time to miliseconds
 *
 * @param {String} timeStr time string to be converted. Example: '[00:15.23]'
 * @returns {Number} the time in miliseconds
 */
module.exports = function(timeStr) {
  let msTime = 0;

  const [min, sec, ms] = ( timeStr.match( /\d+/g ) );
  msTime = ( Number( min ) * 60000 ) + ( Number( sec ) * 1000 ) + ( Number( ms ) );

  return msTime;

}
