CoffeeScript = require 'coffee-script'
{exec} = require 'child_process'
fs = require 'fs'

SOURCES  = [
  'app',
  'logo',
  'turtle',
  'drawing',
  'line',
  'pen',
  'ink'
]

task 'features', 'Run the cucumber features (with mininal output)', ->
  execOut 'cucumber -f progress'

task 'compile', 'Compile src/*.coffee into public/app.js ', ->
  compile()

task 'spec', 'Run vows specs', ->
  execOut 'vows spec/*.coffee'

task 'server', 'Start a web server to host the static application', ->
  execOut 'coffee server.coffee'
  
task 'watch', 'Compile and run specs (for watchr)', ->
  invoke 'compile'
  invoke 'spec'  
    
task 'build', 'Compile, run specs, then features', ->
  invoke 'compile'
  invoke 'spec'
  invoke 'features'

compile = =>
  compileApp (scripts) ->
    compileParser (parser) ->
      scripts.push parser
      writeAppJavaScript scripts  

writeAppJavaScript = (scripts) ->
  fs.writeFile 'public/app.js', scripts.join('\n\n'), 'utf8', (err) ->
    throw err if err
  console.log "> compiled public/app.js"

compileParser = (withCompiledParser) ->
  fs.readFile "src/logo.jison", 'utf8', (err, jison) ->
    Parser = require("jison").Parser
    js = new Parser(jison).generate()
    withCompiledParser "(function() {\n#{js}\n\nthis.parser = parser;\n}).call(this)"

compileApp = (withCompiledScripts) ->
  compiledCoffee = new Array
  for file, index in SOURCES then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, coffee) ->
      throw err if err
      compiledCoffee.push CoffeeScript.compile(coffee)
      withCompiledScripts(compiledCoffee) if compiledCoffee.length == SOURCES.length

execOut = (commandLine) ->
  exec(commandLine, (err, stdout, stderr) ->
    console.log("> #{commandLine}")
    console.log(stdout)
    console.log(stderr)
  )
