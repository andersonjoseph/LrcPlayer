const toMs = require('./toMs');

/**
 * Lyrics file parser
 *
 * @param {String} lrc .lrc string file
 * @returns {Map} Lyric Map. Example: [01:09.15] => 'Hey Jude'
 */
module.exports = function (lrc) {
  
  if( lrc.split( '\n' ).length < 2) {
    throw Error(`.lrc file is empty`);
  }

  const lrcRegExp = new RegExp( /\[\d+:\d+\.\d+\][\w,.!?]*/ );
  const timeRegExp = new RegExp( /\[\d+:\d+\.\d+\]/ );

  const LrcMap = new Map();

  lrc.split('\n').forEach( ( line, i ) => {
    if( lrcRegExp.test( line ) ) {
      const time = toMs( timeRegExp.exec( line )[0] );
      const lrc = line.substr( line.indexOf( ']' )+1 );

      if( LrcMap.has( time ) ) {
        const existingLrc = LrcMap.get(time);
        LrcMap.set( time, existingLrc + '\n' + lrc );
      } else {
        LrcMap.set( time, lrc );
      }

    } else if( line === '' ) {
      // ok
    } else {
      throw Error(`.lrc line not match pattern, expecting: [MM:SS.mm] | instead got: ${line}`);
    }

  });

  const times = new Array(...LrcMap.keys());

  for(let i=1; i<times.length-1; i++) {
    if(times[i] > times[i+1]) {
      throw Error(`times are not in order | line: ${i} of .lrc file: ${LrcMap.get(times[i])}`);
    }
  
  }

  return LrcMap;
}

