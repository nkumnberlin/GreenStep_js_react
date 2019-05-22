# -*- coding: utf-8 -*-
"""
Created on Tue May 14 16:38:13 2019

@author: tristanwachtel
"""

import json
from .flightdistcalc import flightdistcalc

class airportfinder:

    def find_next_airport(self, arr_lat, arr_lng, jsonload):
        olddist = 10000000;
        #arr_lat = 47.4962048
        #arr_lng= 19.0395666
        #print (jsonload.values())
        for d in jsonload.values():
            lat= d["lat"]
            lng= d["lon"]
            newdistance = flightdistcalc().distanceInKmBetweenEarthCoordinates(arr_lat, arr_lng, lat, lng)
            if newdistance<olddist:
                #print (d["iata"]+"lat:" + str(lat)+"\tlng:"+str(lng))
                #shortest_lat = lat
                #shortest_lng = lng
                #iata = d["iata"]
                #airport_city = d["city"]
                nearest_airport = d
                olddist=newdistance
        return nearest_airport#iata, airport_city , shortest_lat, shortest_lng

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