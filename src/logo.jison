%lex

%%
\s+                                            /* skip whitespace */
\n                                             return 'NEWLINE';
[0-9]+("."[0-9]+)?\b                           return 'NUMBER';
("penup"|"pendown")                            return 'COMMAND';
("forward"|"left"|"right")                     return 'NUMBER_COMMAND';
"pencolour"                                    return 'COLOUR_COMMAND';
"repeat"                                       return "START_REPEAT";
"end"                                          return "END_REPEAT";
<<EOF>>                                        return 'EOF';

("red"|"green"|"blue"|"yellow"|"grey"|"black"|"brown"|"pink"|"purple"|"orange"|"white") return 'COLOUR';

/lex

%start script

%%

script
    : 
    | lines
      { $1; return $1 ? $1 : []; }
    ;

lines
    : expr lines
      { $$ = $2 ? yy.both($1, $2) : $1; }
    | block lines
      { $$ = $2 ? yy.both($1, $2) : $1; }
    | NEWLINE lines
      { $$ = $2; }
    | EOF
      { $$ = false; }
    | END_REPEAT
      { $$ = false; }
    ;
    
block
    : START_REPEAT NUMBER lines
      { $$ = yy.repeat(Number($2), $3); }
    ;

expr  
    : NUMBER_COMMAND NUMBER
      { $$ = yy[$1](Number($2)); }
    | COLOUR_COMMAND COLOUR
      { $$ = yy[$1]($2); }
    | COMMAND
      { $$ = yy[$1](); }
    ;