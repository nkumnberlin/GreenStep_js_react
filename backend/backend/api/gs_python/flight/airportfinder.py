# -*- coding: utf-8 -*-
"""
Created on Tue May 14 16:38:13 2019

@author: tristanwachtel
"""

#react-Pfad - not tested in react
#from .distcalc.calc_geographic_points import distcalc

#Pycharm - path
from distcalc.calc_geographic_points import distcalc

class airportfinder:

    def find_next_airport(self, arr_lat, arr_lng, jsonload):
        olddist = 10000000;
        for d in jsonload.values():
            lat= d["lat"]
            lng= d["lng"]
            newdistance = distcalc().distanceInKmBetweenEarthCoordinates(arr_lat, arr_lng, lat, lng)
            if newdistance<olddist:
                nearest_airport = d
                olddist=newdistance
        return nearest_airport

    def find_city_airport(self, city, jsonload):
        airports = []
        for d in jsonload.values():
            if city == d["city"]:
                airports.append(d)
        return airports

    def find_state_airport(self, state, jsonload):
        airports = []
        for d in jsonload.values():
            if state == d["state"]:
                airports.append(d)
        return airports

#a=airportfinder()
#jsonload = json.load(open("/Users/tristanwachtel/Desktop/B5.3 USWS/Scripts/largeairportDB.json"))
#a.find_next_airport(47.4962048, 19.0395666, jsonload)