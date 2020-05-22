INCLUDE bubbles/bubble1


//INCLUDE bubbles/bubble2
//INCLUDE bubbles/bubble3
//INCLUDE bubbles/bubble4
//INCLUDE bubbles/bubble5




VAR R = 0
VAR I = 0
VAR A = 0
VAR S = 0
VAR E = 0
VAR C = 0
VAR name = ""
VAR s = ""
-> start

=== start ===
Wähle deinen Namen

* [Nio]
    ~name = "Nio"
    ~s = true
    -> bubble1
    
* [Nera]
    ~name = "Nera"
    ~s = false
    -> bubble1



=== ending ===
story end

-> END