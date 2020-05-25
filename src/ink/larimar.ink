INCLUDE bubbles/bubble1



VAR R = 0
VAR I = 0
VAR A = 0
VAR S = 0
VAR E = 0
VAR C = 0

VAR name = ""
VAR s = ""
VAR item = ""

-> start

=== start ===

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