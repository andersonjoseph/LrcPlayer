const PlayerState = require('./PlayerState.js');

const utils = require('../utils/utils.js');

/**
 * Player Running state. Is setted to LrcPlayer while the player is running and streaming lyrics
 *
 * @extends {PlayerState}
 */
class PlayerRunning extends PlayerState {

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
   * It throws an error because the player it's already running
   */
  play() {
    throw Error(`Player it's already running`);
  }

  /**
   * Jump to new time given
   *
   * @param {number | string} newTime the new time to jump
   */
  jumpTo( newTime ) {

    if(typeof newTime === 'string' ) {
      newTime = utils.toMs( newTime );
    }

    if(newTime > this._player._times[ this._player._times.length - 1 ]) {
      throw Error( 'new time given is greater than lrc duration');
    }

    
    // get the next time and lyric for the new time
    const { nextTime } =  utils.findTime( newTime, this._player );
   
    const timeToWait = Math.abs( nextTime - newTime );
    this._player._timer = newTime;
    this._player._watch._timer = newTime;

    this._player._lrc( timeToWait );

  }

}

module.exports = PlayerRunning;

