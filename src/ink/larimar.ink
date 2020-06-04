INCLUDE bubbles/bubble1




VAR R = 0
VAR I = 0
VAR A = 0
VAR S = 0
VAR E = 0
VAR C = 0

VAR q1 = 0
VAR q2 = 0
VAR q3 = 0
VAR q4 = 0
VAR q5 = 0
VAR q6 = 0
VAR q7 = 0
VAR q8 = 0
VAR q9 = 0
VAR q10 = 0
VAR q11 = 0
VAR q12 = 0
VAR q13 = 0
VAR q14 = 0
VAR q15 = 0

VAR name = ""
VAR s = ""
VAR item = ""

-> start

=== start ===

//character
#CONTENT: {"type":"image","images":[{"src":"start/background.gif","classes":["background"]},{"src":"start/character.gif","classes":["character"]}],"container":"start"}

Wähle deinen Namen


* [Nio]
    ~name = "Nio"
    ~s = true
    -> bubbles
    
* [Nera]
    ~name = "Nera"
    ~s = false
    -> bubbles

=bubbles
*[bubble1]
    ->bubble1
*[bubble2]
    ->bubble2
*[bubble3]
    ->bubble3
*[bubble4]
    ->bubble4
*[bubble5]
    ->bubble5
*[bubble6]
    ->bubble6
*[bubble7]
    ->bubble7

=== ending ===
story end

-> END