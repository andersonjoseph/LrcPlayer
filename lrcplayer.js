const EventEmitter = require('events').EventEmitter;

const { PlayerStopped, PlayerRunning, PlayerPaused } = require('./lib/states/states');
const Timer = require('./lib/Timer');
const utils = require('./lib/utils/utils');

const defaultStates = {
  playerStopped: (player) => new PlayerStopped( player ),
  playerPaused: (player) => new PlayerPaused( player ),
  playerRunning: (player) => new PlayerRunning( player )
}

/**
 * The .lrc player
 *
 * @extends {EventEmitter}
 */
class LrcPlayer extends EventEmitter {

  /**
   * Creates a new .lrc player
   *
   * @param {string} lrcFile the .lrc file to run
   */
  constructor( lrcFile ) {
    super();

    this._timer = 0;
    this._watch = new Timer();

    this._timeout = undefined;

    this._lrcs = utils.lrcParser( lrcFile );

    this._times = new Array(...this._lrcs.keys());

    this._states = defaultStates;

    this._setState(this._states.playerStopped(this));
  }

  /**
   * Start player
   *
   */
  play() {

    this._state.play();
    this.emit('play', this._timer);

    this._setState(this._states.playerRunning(this));
  }

  /**
   * Pause player
   *
   */
  pause() {

    clearTimeout(this._timeout);
    this._state.pause();
    this.emit('pause', this._timer);

    this._watch.pauseTimer();

    this._setState(this._states.playerPaused(this));

    }

  /**
   * Stop player
   *
   */
  stop() {
    clearTimeout(this._timeout);

    this._state.stop();
    this.emit('stop', this._timer);

    this._watch.resetTimer();
    this._timer = 0;

    this._setState(this._states.playerStopped(this));
  }

  /**
   * Jump to new time
   *
   * @param {string | number} newTime the new time to jump in. In miliseconds or time string (01:20.00)
   */
  jumpTo( newTime ) {
    clearTimeout(this._timeout);

    this._state.jumpTo( newTime );
    this.emit('jump', this._timer, utils.toMs(newTime));
  }

  /**
   * Player state setter
   *
   * @param {Object} playerState
   */
  _setState( playerState ) {
    this._state = playerState;
  }

  /**
   * Lyric stream function
   *
   * @param {Number} timeToWait Time in ms to wait for stream the next lyric
   */
  _lrc( timeToWait ) {
  
    this._timeout = setTimeout( () => {
      // update timer
      this._timer += timeToWait;

      // stream lyrics
      this.emit('lrc', this._lrcs.get( this._timer ));

      const nextTimeIndex = this._times.indexOf( this._timer ) + 1;
      const newTimeToWait = Math.abs( this._times[ nextTimeIndex ] - this._timer );

      if( nextTimeIndex === this._times.length ) {
        this.stop();
        return;
      }
      this._lrc( newTimeToWait );

    }, timeToWait );
  
  }

}

module.exports = LrcPlayer;
