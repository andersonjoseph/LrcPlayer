/**
 * Timer watch
 */
class Timer {
  constructor() {
    this._timer = 0;
    this._timerFunction;
  }

  /**
   * Start timer
   *
   */
  startTimer() {
    this._timerFunction = setInterval( () => {
      this._timer += 100;
    }, 100);
  }

  /**
   * Pause timer
   *
   */
  pauseTimer() {
    clearInterval(this._timerFunction);
  }

  /**
   * Reset timer, stop the timer and set it to 0 miliseconds
   *
   */
  resetTimer() {
    clearInterval(this._timerFunction);
    this._timer = 0;
  }


  /**
   * Get current time
   *
   * @returns {Number} Current time in milisencods
   */
  get time() {
    return this._timer;
  }

  /**
   * Set current time
   *
   * @param {Number} newTime the new time
   */
  set time(newTime) {
    this._timer = newTime;
  }

}

module.exports = Timer;

