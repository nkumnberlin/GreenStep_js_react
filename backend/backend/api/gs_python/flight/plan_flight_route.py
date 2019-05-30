# -*- coding: utf-8 -*-

import json
# Pycharm
from flight.airportfinder import airportfinder
from flight.flight_response_creator import flight_response
from flight.flight_info import flight_data
from distcalc.calc_geographic_points import distcalc
from APIrequests.APIrequest import call_flight_api
from transit.plan_transit_route import transit_route_address


# react
# from .airportfinder import airportfinder
# not tested in react
# from .distcalc.calc_geographic_points import distcalc
# from ..APIrequests.APIrequest import APIrequest, call_flight_api
class planflightroute:
    emission_flight_1000 = 0.2794
    emission_flight_5000 = 0.2439
    emission_flight_9999 = 0.3234

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        # Laegnengrad W/E
        self.origin_lng = origin_lng
        # Breitengrad N/S
        self.origin_lat = origin_lat
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    def run_flight_planning(self):
        f_data = flight_data()
        self.planflight(f_data)
        self.calc_emission(f_data)
        return flight_response().create_response(f_data)

    def calc_emission(self, f_data):
        if(f_data.flight_dist<1000000):
            f_data.flight_emission_result = f_data.flight_dist / 1000 * self.emission_flight_1000
        elif(f_data.flight_dist<5000000):
            f_data.flight_emission_result = f_data.flight_dist / 1000 * self.emission_flight_5000
        else:
            f_data.flight_emission_result = f_data.flight_dist / 1000 * self.emission_flight_9999

    def planflight(self, f_data):
        # react
        # jsonload = json.load(open("api/gs_python/flight/airport_db.json"))
        # pycharm
        jsonload = json.load(open(
            "/Users/tristanwachtel/PycharmProjects/GreenStep_js_react/backend/backend/api/gs_python/flight/airport_db.json"))
        # origin_iata, origin_city, origin_airport_lat, origin_airport_lng \
        f_data.origin_airport = airportfinder().find_next_airport(self.origin_lat, self.origin_lng, jsonload)
        # dest_iata, dest_city, dest_airport_lat, dest_airport_lng \
        f_data.dest_airport = airportfinder().find_next_airport(self.dest_lat, self.dest_lng, jsonload)
        # print ((origin_airport["iata"]+"\t"+ dest_airport["iata"]))
        flight_possible = call_flight_api().check_planned_route(f_data.origin_airport["iata"], f_data.dest_airport["iata"])
        # print (flight_possible)
        if flight_possible == True:
            return self.getValues(f_data)
        # tbd: else ist mit Fehlern behaftet - erledigt ?
        # - mgl Anpassung des Algorithmus, dass er weniger Anfragen durchführen muss
        else:
            return self.search_for_alt_city_airports(f_data.origin_airport, f_data.dest_airport,
                                                     jsonload, f_data)

    def getValues(self, f_data):
        f_data.flight_dist = self.correct_values_for_stopover(distcalc().distanceInKmBetweenEarthCoordinates(f_data.origin_airport["lat"], f_data.origin_airport["lng"],
                                                                     f_data.dest_airport["lat"], f_data.dest_airport["lng"]))
        takeoff_time = 30  # min
        f_data.flight_time = (f_data.flight_dist / 800 + takeoff_time) * 60  # time is always in seconds
        f_data.departure_transit_json = transit_route_address(str(self.origin_lat) + " " + str(self.origin_lng),
                                                       str(f_data.origin_airport["iata"]) + " airport").run_transit_planning()
        f_data.arrival_transit_json = transit_route_address(str(f_data.dest_airport["iata"]) + " airport",
                                                     str(self.dest_lat) + " " + str(
                                                         self.dest_lng)).run_transit_planning()

        #return f_data.departure_transit_json["transit"]["dist"], arrival_transit_json["transit"]["dist"], flight_dist, \
        #       departure_transit_json["transit"]["time"], \
        #       arrival_transit_json["transit"]["time"], flight_time, arrival_transit_json["transit"]["steps"], \
        #       departure_transit_json["transit"]["steps"], \
        #       origin_airport, dest_airport

    def search_for_alt_city_airports(self, origin_airport, dest_airport, jsonload, f_data):
        # Alternative Planung mit o^d SkyScanner-Aufrufen
        origin_airports = airportfinder().find_city_airport(origin_airport["city"], jsonload)
        dest_airports = airportfinder().find_city_airport(dest_airport["city"], jsonload)
        flight_possible = False
        for o_airport in origin_airports:
            for d_airport in dest_airports:
                flight_possible = call_flight_api().check_planned_route(o_airport["iata"], d_airport["iata"])
                f_data.origin_airport=o_airport
                f_data.dest_airport=d_airport
                if flight_possible:
                    # print(flight_possible)
                    return self.getValues(f_data)
        if flight_possible == False:
            # print ("Nothing found")
            return 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

    #https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v7-2014.pdf
    #adding flight
    def correct_values_for_stopover(self, distance):
        if (distance<550000):
            distance += 50000
        elif (distance<5500000):
            distance += 100000
        else:
            distance += 125000
        return distance