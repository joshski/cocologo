vows = require('vows')
assert = require('assert')
parser = require('../public/app.js').parser

parser.yy =
  forward   : (distance)        -> ['forward', distance]
  left      : (radians)         -> ['left', radians]
  right     : (radians)         -> ['right', radians]
  penup     :                   -> ['penup']
  pendown   :                   -> ['pendown']
  pencolour : (colour)          -> ['pencolour', colour]
  repeat    : (times, commands) -> ['repeat', times, commands]
  both      : (a,b)             -> ['both', a, b]

parses = (logo, commands...) ->
  assert.deepEqual(parser.parse(logo), commands)

vows.describe('parser').addBatch(
  'parses' :

    '[empty string]' : ->
      parses('\n')
    
    'forward 20' : ->
      parses('forward 20', 'forward', 20)

    'pencolour red' : ->
      parses('pencolour red', 'pencolour', 'red')
    
    'forward 20\n\npenup' : ->
      parses('forward 20\n\npenup', 'both', ['forward', 20], ['penup'])

    'left 99\n\npendown' : ->
      parses('pendown\n\nleft 99', 'both', ['pendown'], ['left', 99])
    
    'forward 20\npenup\nright 10' : ->
      parses('forward 20\npenup\nright 10', 
        'both',
        ['forward', 20],
        [
          'both',
          ['penup'],
          ['right', 10]
        ]
      )

    'repeat 2\nleft 1\n\nend' : ->
      parses('repeat 2\nleft 1\n\nend',
        'repeat',
        2,
        ['left', 1]
      )
    
    'repeat 9\nleft 1\n\nend\nleft2' : ->
      parses('repeat 9\nleft 1\n\nend\nleft2',
        'both',
        [
          'repeat',
          9,
          ['left', 1]
        ],
        ['left', 2]
      )    
    
    'repeat 2\nrepeat 2\nleft 2\n\nend\nend' : ->
      parses('repeat 2\nrepeat 2\nleft 2\n\nend\nend',
        'repeat',
        2,
        [
          'repeat',
          2,
          ['left', 2]
        ]
      )

).export module