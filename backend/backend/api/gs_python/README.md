# pythonRequest
###Anleitung - Code starten in PyCharm
####1. Dateipfade der Imports anpassen
#####!!! For react, do the following steps in reverse order !!!
######Alle imports stehen immer nach der Codierung zu Beginn des Moduls
```
#react-Pfad
from .flightdistcalc import flightdistcalc
#Pycharm - Pfad
#from flight.flightdistcalc import flightdistcalc
```
.1 mit React markierte Pfade auskommentieren mit '#'
```
#react-Pfad
#from .flightdistcalc import flightdistcalc
#Pycharm - Pfad
#from flight.flightdistcalc import flightdistcalc
```
.2 mit Pycharm markierte Pfade einkommentieren
```
#react-Pfad
#from .flightdistcalc import flightdistcalc
#Pycharm - Pfad
from flight.flightdistcalc import flightdistcalc
```
####2. Python 3.7.3 als Interpreter einstellen
1. press Cmd + ,
2. Project > Project Interpreter
3. Choose Python 3.7 Interpreter or follow:
https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html