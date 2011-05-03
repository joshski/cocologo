(function() {
  var App, exampleScript;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  exampleScript = ["forward 50", "right 90", "forward 50", "right 90", "penup", "forward 25", "pendown", "forward 25", "right 90", "forward 50"].join("\n");
  App = (function() {
    function App(document) {
      var drawing, ink, pen;
      this.codeArea = document.getElementById("code");
      this.codeArea.value = exampleScript;
      pen = new Pen(document.getElementById("turtleCanvas").getContext("2d"));
      ink = new Ink(document.getElementById("lineCanvas").getContext("2d"));
      drawing = new Drawing(pen, ink, plotLine);
      this.turtle = new Turtle(drawing);
      parser.yy = Logo;
      this.command = parser.parse("left 1\nright 1");
      document.getElementById("go").onclick = __bind(function() {
        this.go();
        return false;
      }, this);
      document.getElementById("reset").onclick = __bind(function() {
        this.reset();
        return false;
      }, this);
      setInterval(__bind(function() {
        return this.tick();
      }, this), 20);
    }
    App.prototype.go = function() {
      try {
        return this.command = parser.parse(this.codeArea.value);
      } catch (error) {
        return alert(error);
      }
    };
    App.prototype.tick = function() {
      var i, _results;
      _results = [];
      for (i = 1; i <= 20; i++) {
        _results.push(typeof this.command === 'function' ? this.command = this.command(this.turtle) : void 0);
      }
      return _results;
    };
    App.prototype.reset = function() {
      this.command = false;
      return this.turtle.reset();
    };
    return App;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).App = App;
}).call(this);


(function() {
  var animate, both, immediate, repeat;
  immediate = function(name) {
    return function() {
      var a;
      a = arguments;
      return function(turtle) {
        turtle[name].apply(turtle, a);
        return false;
      };
    };
  };
  animate = function(name) {
    var f;
    return f = function(frames) {
      return function(turtle) {
        if (frames === 0) {
          return false;
        }
        turtle[name].call(turtle, 1);
        return f(frames - 1);
      };
    };
  };
  both = function(a, b) {
    return function(turtle) {
      if (a) {
        return both(a(turtle), b);
      }
      return b(turtle);
    };
  };
  repeat = function(times, command) {
    return function(turtle) {
      var n;
      n = command(turtle);
      if (times === 1) {
        return n;
      }
      return both(n, repeat(times - 1, command));
    };
  };
  (typeof exports != "undefined" && exports !== null ? exports : this).Logo = {
    both: both,
    repeat: repeat,
    pencolour: immediate('pencolour'),
    penup: immediate('penup'),
    pendown: immediate('pendown'),
    forward: animate('forward'),
    left: animate('left'),
    right: animate('right')
  };
}).call(this);


(function() {
  var COLOURS, Turtle;
  Turtle = (function() {
    function Turtle(drawing) {
      this.drawing = drawing;
      this.reset();
    }
    Turtle.prototype.reset = function() {
      this.x = 0;
      this.y = 0;
      this.rotation = 0;
      this.pendown();
      return this.drawing.clear();
    };
    Turtle.prototype.forward = function(distance) {
      this.x += Math.cos(this.rotation) * distance;
      this.y += Math.sin(this.rotation) * distance;
      if (this.isPenDown) {
        return this.drawing.drawTo(Math.round(this.x), Math.round(this.y));
      } else {
        return this.drawing.moveTo(Math.round(this.x), Math.round(this.y));
      }
    };
    Turtle.prototype.left = function(degrees) {
      return this.right(degrees * -1);
    };
    Turtle.prototype.right = function(degrees) {
      this.rotation += degrees * (Math.PI / 180);
      return this.drawing.rotateTo(Math.round(this.rotation * Math.pow(10, 2)) / Math.pow(10, 2));
    };
    Turtle.prototype.penup = function() {
      return this.isPenDown = false;
    };
    Turtle.prototype.pendown = function() {
      return this.isPenDown = true;
    };
    Turtle.prototype.pencolour = function(colour) {
      return this.drawing.setPenColour.apply(this.drawing, COLOURS[colour] || COLOURS.black);
    };
    return Turtle;
  })();
  COLOURS = {
    'red': [255, 0, 0],
    'green': [34, 139, 34],
    'blue': [25, 25, 112],
    'yellow': [255, 215, 0],
    'grey': [139, 134, 130],
    'black': [0, 0, 0],
    'brown': [139, 69, 19],
    'pink': [255, 20, 147],
    'orange': [255, 140, 0],
    'purple': [160, 32, 240],
    'white': [255, 255, 255]
  };
  (typeof exports != "undefined" && exports !== null ? exports : this).Turtle = Turtle;
}).call(this);


(function() {
  var Drawing;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Drawing = (function() {
    function Drawing(pen, ink, plotLine) {
      this.pen = pen;
      this.ink = ink;
      this.plotLine = plotLine;
      this.penColour = [0, 0, 0];
      this.rotation = 0;
      this.moveTo(0, 0);
    }
    Drawing.prototype.drawTo = function(x, y) {
      this.plotLine(this.y, -this.x, y, -x, __bind(function(px, py) {
        return this.ink.draw(px, py, this.penColour);
      }, this));
      return this.moveTo(x, y);
    };
    Drawing.prototype.moveTo = function(x, y) {
      this.x = x;
      this.y = y;
      return this.redraw();
    };
    Drawing.prototype.rotateTo = function(radians) {
      this.rotation = radians;
      return this.redraw();
    };
    Drawing.prototype.redraw = function() {
      return this.pen.redraw(this.y, -this.x, this.rotation);
    };
    Drawing.prototype.clear = function() {
      this.ink.clear();
      this.penColour = [0, 0, 0];
      this.moveTo(0, 0);
      return this.rotateTo(0);
    };
    Drawing.prototype.setPenColour = function(r, g, b) {
      return this.penColour = [r, g, b];
    };
    return Drawing;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Drawing = Drawing;
}).call(this);


(function() {
  (typeof exports != "undefined" && exports !== null ? exports : this).plotLine = function(x0, y0, x1, y1, plot) {
    var dx, dy, fraction, sx, sy;
    dx = x1 - x0;
    sx = 1;
    dy = y1 - y0;
    sy = 1;
    if (dx < 0) {
      sx = -1;
      dx = -dx;
    }
    if (dy < 0) {
      sy = -1;
      dy = -dy;
    }
    dx = dx << 1;
    dy = dy << 1;
    plot(x0, y0);
    if (dy < dx) {
      fraction = dy - (dx >> 1);
      while (x0 !== x1) {
        if (fraction >= 0) {
          y0 += sy;
          fraction -= dx;
        }
        fraction += dy;
        x0 += sx;
        plot(x0, y0);
      }
    } else {
      fraction = dx - (dy >> 1);
      while (y0 !== y1) {
        if (fraction >= 0) {
          x0 += sx;
          fraction -= dy;
        }
        fraction += dx;
        y0 += sy;
        plot(x0, y0);
      }
    }
  };
}).call(this);


(function() {
  var Pen;
  Pen = (function() {
    function Pen(context) {
      this.context = context;
      this.image = new Image();
      this.image.src = "turtle.png";
      this.image.width = 24;
      this.image.height = 40;
    }
    Pen.prototype.redraw = function(x, y, rotation) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.save();
      this.context.translate(x + (this.context.canvas.width / 2), y + (this.context.canvas.height / 2));
      this.context.rotate(rotation);
      this.context.drawImage(this.image, -1 * (this.image.width / 2), -1 * (this.image.height / 2));
      return this.context.restore();
    };
    return Pen;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Pen = Pen;
}).call(this);


(function() {
  var Ink;
  Ink = (function() {
    function Ink(context) {
      this.context = context;
    }
    Ink.prototype.draw = function(x, y, rgb) {
      this.context.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
      return this.context.fillRect(x + (this.context.canvas.width / 2), y + (this.context.canvas.height / 2), 1, 1);
    };
    Ink.prototype.clear = function() {
      return this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };
    return Ink;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Ink = Ink;
}).call(this);


(function() {
/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"script":3,"lines":4,"expr":5,"block":6,"NEWLINE":7,"EOF":8,"END_REPEAT":9,"START_REPEAT":10,"NUMBER":11,"NUMBER_COMMAND":12,"COLOUR_COMMAND":13,"COLOUR":14,"COMMAND":15,"$accept":0,"$end":1},
terminals_: {2:"error",7:"NEWLINE",8:"EOF",9:"END_REPEAT",10:"START_REPEAT",11:"NUMBER",12:"NUMBER_COMMAND",13:"COLOUR_COMMAND",14:"COLOUR",15:"COMMAND"},
productions_: [0,[3,0],[3,1],[4,2],[4,2],[4,2],[4,1],[4,1],[6,3],[5,2],[5,2],[5,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 2: $$[$0]; return $$[$0] ? $$[$0] : []; 
break;
case 3: this.$ = $$[$0] ? yy.both($$[$0-1], $$[$0]) : $$[$0-1]; 
break;
case 4: this.$ = $$[$0] ? yy.both($$[$0-1], $$[$0]) : $$[$0-1]; 
break;
case 5: this.$ = $$[$0]; 
break;
case 6: this.$ = false; 
break;
case 7: this.$ = false; 
break;
case 8: this.$ = yy.repeat(Number($$[$0-1]), $$[$0]); 
break;
case 9: this.$ = yy[$$[$0-1]](Number($$[$0])); 
break;
case 10: this.$ = yy[$$[$0-1]]($$[$0]); 
break;
case 11: this.$ = yy[$$[$0]](); 
break;
}
},
table: [{1:[2,1],3:1,4:2,5:3,6:4,7:[1,5],8:[1,6],9:[1,7],10:[1,11],12:[1,8],13:[1,9],15:[1,10]},{1:[3]},{1:[2,2]},{4:12,5:3,6:4,7:[1,5],8:[1,6],9:[1,7],10:[1,11],12:[1,8],13:[1,9],15:[1,10]},{4:13,5:3,6:4,7:[1,5],8:[1,6],9:[1,7],10:[1,11],12:[1,8],13:[1,9],15:[1,10]},{4:14,5:3,6:4,7:[1,5],8:[1,6],9:[1,7],10:[1,11],12:[1,8],13:[1,9],15:[1,10]},{1:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],12:[2,6],13:[2,6],15:[2,6]},{1:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],12:[2,7],13:[2,7],15:[2,7]},{11:[1,15]},{14:[1,16]},{7:[2,11],8:[2,11],9:[2,11],10:[2,11],12:[2,11],13:[2,11],15:[2,11]},{11:[1,17]},{1:[2,3],7:[2,3],8:[2,3],9:[2,3],10:[2,3],12:[2,3],13:[2,3],15:[2,3]},{1:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[2,4],12:[2,4],13:[2,4],15:[2,4]},{1:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[2,5],12:[2,5],13:[2,5],15:[2,5]},{7:[2,9],8:[2,9],9:[2,9],10:[2,9],12:[2,9],13:[2,9],15:[2,9]},{7:[2,10],8:[2,10],9:[2,10],10:[2,10],12:[2,10],13:[2,10],15:[2,10]},{4:18,5:3,6:4,7:[1,5],8:[1,6],9:[1,7],10:[1,11],12:[1,8],13:[1,9],15:[1,10]},{7:[2,8],8:[2,8],9:[2,8],10:[2,8],12:[2,8],13:[2,8],15:[2,8]}],
defaultActions: {2:[2,2]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 7;
break;
case 2:return 11;
break;
case 3:return 15;
break;
case 4:return 12;
break;
case 5:return 13;
break;
case 6:return "START_REPEAT";
break;
case 7:return "END_REPEAT";
break;
case 8:return 8;
break;
case 9:return 14;
break;
}
};
lexer.rules = [/^\s+/,/^\n\b/,/^[0-9]+(\.[0-9]+)?\b\b/,/^(penup|pendown)/,/^(forward|left|right)/,/^pencolour\b/,/^repeat\b/,/^end\b/,/^$/,/^(red|green|blue|yellow|grey|black|brown|pink|purple|orange|white)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}

this.parser = parser;
}).call(this)