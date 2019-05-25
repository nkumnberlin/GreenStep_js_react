# -*- coding: utf-8 -*-

import requests
import json
#Pycharm
from flight.airportfinder import airportfinder
from flight.flightdistcalc import flightdistcalc
from APIrequests.APIrequest import APIrequest, call_flight_api
#react
# from .airportfinder import airportfinder
# from .flightdistcalc import flightdistcalc
# from ..APIrequests.APIrequest import APIrequest, call_flight_api
class planflightroute:

    def planflight(self, arr_lng, arr_lat, dest_lng, dest_lat):
        #react
        #jsonload = json.load(open("api/gs_python/flight/largeairportDB.json"))
        #pycharm
        jsonload = json.load(open("/Users/tristanwachtel/PycharmProjects/GreenStep_js_react/backend/backend/api/gs_python/flight/largeairportDB.json"))
        #origin_iata, origin_city, origin_airport_lat, origin_airport_lng \
        origin_airport = airportfinder().find_next_airport(arr_lat, arr_lng, jsonload)
        #dest_iata, dest_city, dest_airport_lat, dest_airport_lng \
        dest_airport = airportfinder().find_next_airport(dest_lat, dest_lng, jsonload)
        #print ((origin_airport["iata"]+"\t"+ dest_airport["iata"]))
        flight_possible = call_flight_api().check_planned_route(origin_airport["iata"], dest_airport["iata"])
        #print (flight_possible)
        if flight_possible == True:
            return self.getValues(origin_airport, dest_airport)
        #tbd: else ist mit Fehlern behaftet - erledigt ?
        # - mgl Anpassung des Algorithmus, dass er weniger Anfragen durchführen muss
        else:
            #Alternative Planung mit o^d SkyScanner-Aufrufen
            origin_airports = airportfinder().find_city_airport(origin_airport["city"], jsonload)
            dest_airports = airportfinder().find_city_airport(dest_airport["city"], jsonload)
            for o_airport in origin_airports:
                for d_airport in dest_airports:
                    flight_possible = call_flight_api().check_planned_route(o_airport["iata"], d_airport["iata"])
                    if flight_possible:
                        #print(flight_possible)
                        return self.getValues(o_airport, d_airport)
            if flight_possible == False:
                #print ("Nothing found")
                return 0, 0, 0, 0, 0, 0

    def getValues(self, origin_airport, dest_airport):
        flight_dist = flightdistcalc().distanceInKmBetweenEarthCoordinates(origin_airport["lat"], origin_airport["lng"],
                                                                            dest_airport["lat"], dest_airport["lng"])
        takeoff_time= 30 #min
        flight_time = (flight_dist/800+takeoff_time)*60 #time is always in seconds
        arrival_transit_dist, arrival_transit_time = APIrequest().callGoogleDirectionsAPI(str(origin_airport["lat"])
                                    + " " + str(origin_airport["lng"]), origin_airport["iata"] + " airport", "transit")
        departure_transit_dist, departure_transit_time = APIrequest().callGoogleDirectionsAPI(
            str(dest_airport["lat"]) + " " + str(dest_airport["lng"]), dest_airport["iata"] + " airport",
            "transit")
        return departure_transit_dist, arrival_transit_dist, flight_dist, departure_transit_time, \
               arrival_transit_time, flight_time