const PlayerState = require('./PlayerState.js');

/**
 * Player stopped state
 *
 * @extends {PlayerState}
 */
class PlayerStopped extends PlayerState {

  /**
   * Player Stopped State constructor
   *
   * @param {LrcPlayer} player The instance of LrcPlayer to manipulate
   */
  constructor( player ) {
    super( player );
    this._player = player;
  }

  /**
   * Start to stream lyrics
   */
  play() {
    this._player._watch.startTimer();
    let timeToWait = this._player._times[0];
    this._player._lrc( timeToWait );
  }

  /**
   * Throws an error because the player is not running
   *
   */
  pause() {
    throw Error( `Can not pause because the player is not running` );
  }

  /**
   * Throws an error because the player is already stopped
   *
   */
  stop() {
    throw Error(`The player it's already stopped`);
  }

  /**
   * Throws an error because the player needs to be played before to jump
   *
   */
  JumpTo( time ) {
    throw Error('The player needs to be played before perform any action');
  }
  
}

module.exports = PlayerStopped;

