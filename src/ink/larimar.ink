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
    -> bubble5
    
* [Nera]
    ~name = "Nera"
    ~s = false
    -> bubble5



=== ending ===
story end

-> END