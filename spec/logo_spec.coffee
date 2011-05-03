vows = require('vows')
assert = require('assert')
sinon = require('sinon')

{forward,left,right,pencolour,penup,pendown,both,repeat} = require("../public/app.js").Logo

interprets = (expression, expectedMessages...) ->
  calls = []
  turtle =
    pencolour: (colour)   -> calls.push(['pencolour', colour])
    pendown:              -> calls.push(['pendown'])
    penup:                -> calls.push(['penup'])
    forward: (distance)   -> calls.push(['forward', distance])
    left: (radians)       -> calls.push(['left', radians])
    right: (radians)      -> calls.push(['right', radians])
  step = expression
  true while step = step(turtle)
  assert.deepEqual(calls, expectedMessages)
  
vows.describe('logo').addBatch(
  
  'interprets' :
    
    'a single iteration command' : ->
      interprets(
        pencolour(1),
        ['pencolour', 1]
      )
      
    'an iterative command' : ->
      interprets(
        left(2),
        ['left', 1],
        ['left', 1]
      )

    'both commands' : ->
      interprets(
        both(pencolour(1), pencolour(2)), 
        ['pencolour', 1],
        ['pencolour', 2]
      )

    'both with iteration' : ->
      interprets(
        both(pencolour(1), left(2)),
        ['pencolour', 1],
        ['left',    1],
        ['left',    1]
      )
     
    'nested both' : ->
        interprets(
          both(
            both(
              pencolour(1),
              pencolour(2)
            ),
            pencolour(3)
          ), 
          ['pencolour', 1],
          ['pencolour', 2],
          ['pencolour', 3]
        )
   
    'nested both with iteration' : ->
      interprets(
        both(
          both(left(2), pencolour(2)),
          both(pencolour(3), left(2))
        ),
        ['left',    1],
        ['left',    1],
        ['pencolour', 2],
        ['pencolour', 3],
        ['left',    1],
        ['left',    1]
      )
    
    'repeat' : ->
      interprets(
        repeat(2, both(pencolour(1), pencolour(2))),
        ['pencolour', 1],
        ['pencolour', 2],
        ['pencolour', 1],
        ['pencolour', 2]
      )
    
    'repeat iterative' : ->
      interprets(
        repeat(2, both(left(2), pencolour(1))),
        ['left',    1],
        ['left',    1],
        ['pencolour', 1],
        ['left',    1],
        ['left',    1],
        ['pencolour', 1]
      )
      
    'repeat nested iterative' : ->
      interprets(
        repeat(2,
          repeat(2,
            both(
              left(2),
              pencolour('green')
            )
          )
        ),
        [ 'left', 1 ],
        [ 'left', 1 ],
        [ 'pencolour', 'green' ],
        [ 'left', 1 ],
        [ 'left', 1 ],
        [ 'pencolour', 'green' ],
        [ 'left', 1 ],
        [ 'left', 1 ],
        [ 'pencolour', 'green' ],
        [ 'left', 1 ],
        [ 'left', 1 ],
        [ 'pencolour', 'green' ]
      )

    'everything' : ->
      interprets(
        repeat(2,
          both(
            both(
              forward(2),
              right(2)
            ),
            repeat(3,
              both(
                pendown(),
                both(
                  left(1),
                  both(penup(), pencolour('red'))
                )
              )
            )
          )
        ),
        [ 'forward', 1 ],
           [ 'forward', 1 ],
           [ 'right', 1 ],
           [ 'right', 1 ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ],
           [ 'forward', 1 ],
           [ 'forward', 1 ],
           [ 'right', 1 ],
           [ 'right', 1 ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ],
           [ 'pendown' ],
           [ 'left', 1 ],
           [ 'penup' ],
           [ 'pencolour', 'red' ]
      )


).export module