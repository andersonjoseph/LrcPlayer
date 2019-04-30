/**
 * find lyrics and existing time for the time given
 *
 * @param {Number} time the time to find
 * @param {LrcPlayer} player the LrcPlayer instance to manipulate
 * @returns {Object} Previous and next time finded
 */
module.exports = function(time, player) {

  let nextTime = 0;
  let prevTime = 0;

  if(player._times[0] === time) {
    nextTime = player._times[0];
  }
  else if(player._times[player._times.length-1] === time){
    nextTime = player._times[player._times.length-1];
  } else {
    for(let i = 1; i<player._times.length-1; i++) {

      if(player._times[i+1] > time) {
        prevTime = player._times[i];
        nextTime = player._times[i+1];
        break;
      }
    }
  }

  return {
    prevTime: prevTime,
    nextTime: nextTime
  }
}

