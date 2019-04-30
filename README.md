# LrcPlayer
A .lrc runner written in JavaScript (NodeJS) that works like a music player.

## Usage

```javascript
const fs = require('fs');
const LrcPlayer = require('./lrcplayer');

const lrc = fs.readFileSync('./hey-jude.lrc').toString();

const myPlayer = new LrcPlayer(lrc);
myPlayer.on('lrc', (line) => {
  console.log(line);
});

myPlayer.play();
```

## Documentation
<a name="LrcPlayer"></a>

## LrcPlayer ⇐ <code>EventEmitter</code>
The .lrc player

**Kind**: global class

* [LrcPlayer](#LrcPlayer)
    * [new LrcPlayer(lrcFile)](#new_LrcPlayer_new)
    * [.play()](#LrcPlayer+play)
    * [.pause()](#LrcPlayer+pause)
    * [.stop()](#LrcPlayer+stop)
    * [.jumpTo(newTime)](#LrcPlayer+jumpTo)

<a name="new_LrcPlayer_new"></a>

### new LrcPlayer(lrcFile)
Creates a new .lrc player


| Param | Type | Description |
| --- | --- | --- |
| lrcFile | <code>string</code> | the .lrc file to run |

<a name="LrcPlayer+play"></a>

### lrcPlayer.play()
Start player

**Kind**: instance method of [<code>LrcPlayer</code>](#LrcPlayer)
<a name="LrcPlayer+pause"></a>

### lrcPlayer.pause()
Pause player

**Kind**: instance method of [<code>LrcPlayer</code>](#LrcPlayer)
<a name="LrcPlayer+stop"></a>

### lrcPlayer.stop()
Stop player

**Kind**: instance method of [<code>LrcPlayer</code>](#LrcPlayer)
<a name="LrcPlayer+jumpTo"></a>

### lrcPlayer.jumpTo(newTime)
Jump to new time

**Kind**: instance method of [<code>LrcPlayer</code>](#LrcPlayer)

| Param | Type | Description |
| --- | --- | --- |
| newTime | <code>string</code> \| <code>number</code> | the new time to jump in. In miliseconds or time string (01:20.00) |

## Events 

### lrcPlayer.on('lrc', cb(line, time))
Event when player streams lyrics

```javascript 
myPlayer.on('lrc', function(line, time) {
    console.log(line);
});

```

### lrcPlayer.on('play', cb(time))
Event when player starts

```javascript 
myPlayer.on('play', function(time) {
    console.log('Player started at: ' + time);
});

```
**similar:*
### lrcPlayer.on('stop', cb(time))
### lrcPlayer.on('pause', cb(time))

