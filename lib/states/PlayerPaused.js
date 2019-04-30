const PlayerState = require('./PlayerState.js');

const utils = require('../utils/utils.js');

/**
 * Player Paused state. Is setted to LrcPlayer when is paused.
 *
 * @extends {PlayerState}
 */
class PlayerPaused extends PlayerState {

  /**
   * Player Paused State constructor
   *
   * @param {LrcPlayer} player The instance of LrcPlayer to manipulate
   */
  constructor( player ) {
    super( player );
    this._player = player;
  }

  /**
   * Play. start to stream lyrics
   */
  play() {
    const nextTimeIndex = this._player._times.indexOf( this._player._timer ) + 1;
    const nextTime = this._player._times[ nextTimeIndex ];

    // get the moment where the playes was paused
    const currentTime = this._player._watch.time;
    this._player._timer = currentTime;

    const timeToWait = Math.abs( this._player._times[ nextTimeIndex ] - currentTime );

    this._player._lrc( timeToWait );
  }

  /**
   * It throws an error because the player it's already paused
   *
   */
  pause() {
    throw Error(`Player it's already paused`);
  }

  /**
   * Jumps to given time
   *
   * @param {number | string} newTime the new time to jump
   */
  jumpTo( newTime ) {
    if(typeof time === 'string') {
      newTime = utils.toMs( time );
    }

    if(newTime > this._player._times[ this._player._times.length - 1 ]) {
      throw Error('new time given is greater than lrc duration');
    }

    const { prevTime } = utils.findTime( newTime, this._player );
 
    this._player._timer = prevTime;
    this._player._watch._timer = newTime;
  }

}

module.exports = PlayerPaused;

