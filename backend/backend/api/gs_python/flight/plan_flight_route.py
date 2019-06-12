# -*- coding: utf-8 -*-

import json
# Pycharm
from flight.airportfinder import airportfinder
from flight.flight_response_creator import flight_response
from flight.flight_info import flight_data
from distcalc.calc_geographic_points import distcalc
from APIrequests.APIrequest import call_flight_api
from transit.plan_transit_route import transit_route_cords
from driving.plan_driving_route import driving_route


# react
# from .airportfinder import airportfinder
# not tested in react
# from .distcalc.calc_geographic_points import distcalc
# from ..APIrequests.APIrequest import APIrequest, call_flight_api
class flight_route:
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
        flight_possible = self.check_planned_route(f_data.origin_airport["iata"], f_data.dest_airport["iata"])
        # print (flight_possible)
        if flight_possible == True:
            self.getValues(f_data)
        # tbd: else ist mit Fehlern behaftet - erledigt ?
        # - mgl Anpassung des Algorithmus, dass er weniger Anfragen durchführen muss
        else:
            self.search_for_alt_airports(jsonload, f_data)

    def getValues(self, f_data):
        f_data.flight_dist = self.correct_values_for_stopover(
            distcalc().distanceInKmBetweenEarthCoordinates(f_data.origin_airport["lat"], f_data.origin_airport["lng"],
                                                           f_data.dest_airport["lat"], f_data.dest_airport["lng"]))
        takeoff_time = 30  # min
        f_data.flight_time = ((f_data.flight_dist / 1000 / 800) * 60 + takeoff_time) * 60  # time is always in seconds
        self.calc_emission(f_data)
        self.sum_travel_values(f_data)

    def sum_travel_values(self, f_data):
        f_data.dist_sum = f_data.flight_dist
        f_data.time_sum = f_data.flight_time
        f_data.emission_sum = f_data.flight_emission_result
        f_data.departure_transit_json = transit_route_cords(self.origin_lng, self.origin_lat,
                                                            f_data.origin_airport["lng"],
                                                            f_data.origin_airport["lat"]).run_transit_planning()
        # print(f_data.departure_transit_json )
        di = "dist"
        dr = "drive"
        e = "emission"
        ti = "time"
        tr = "transit"
        if json.loads(f_data.departure_transit_json)["transit"]["steps"][0]["distance"] == 0:
            f_data.departure_transit_json = driving_route(self.origin_lng, self.origin_lat,
                                                          f_data.origin_airport["lng"],
                                                          f_data.origin_airport["lat"]).run_drive_planning()
            f_data.dist_sum += self.get_param(f_data.departure_transit_json, dr, di)
            f_data.time_sum += self.get_param(f_data.departure_transit_json, dr, ti)
            f_data.emission_sum += self.get_param(f_data.departure_transit_json, dr, e)
        else:
            f_data.dist_sum += self.get_param(f_data.departure_transit_json, tr, di)
            f_data.time_sum += self.get_param(f_data.departure_transit_json, tr, ti)
            f_data.emission_sum += self.get_param(f_data.departure_transit_json, tr, e)

        f_data.arrival_transit_json = transit_route_cords(f_data.dest_airport["lng"], f_data.dest_airport["lat"],
                                                          self.dest_lng, self.dest_lat).run_transit_planning()
        if json.loads(f_data.arrival_transit_json)["transit"]["steps"][0]["distance"] == 0:
            f_data.arrival_transit_json = driving_route(f_data.dest_airport["lng"], f_data.dest_airport["lat"],
                                                        self.dest_lng, self.dest_lat).run_drive_planning()
            f_data.dist_sum += self.get_param(f_data.arrival_transit_json, dr, di)
            f_data.time_sum += self.get_param(f_data.arrival_transit_json, dr, ti)
            f_data.emission_sum += self.get_param(f_data.arrival_transit_json, dr, e)
        else:
            f_data.dist_sum += self.get_param(f_data.arrival_transit_json, tr, di)
            f_data.time_sum += self.get_param(f_data.arrival_transit_json, tr, ti)
            f_data.emission_sum += self.get_param(f_data.arrival_transit_json, tr, e)

    def get_param(self, data_json, f1, f2):
        return json.loads(data_json)[f1][f2]

    def search_for_alt_airports(self, jsonload, f_data):
        # Alternative Planung mit o^d SkyScanner-Aufrufen
        origin_airports = airportfinder().find_alt_airport_list(self.origin_lat, self.origin_lng, jsonload)
        dest_airports = airportfinder().find_alt_airport_list(self.dest_lat, self.dest_lng, jsonload)
        flight_possible = False
        for o_airport in origin_airports:
            for d_airport in dest_airports:
                flight_possible = self.check_planned_route(o_airport[1]["iata"], d_airport[1]["iata"])
                f_data.origin_airport=o_airport
                f_data.dest_airport=d_airport
                if flight_possible:
                    #print(flight_possible)
                    f_data.origin_airport = o_airport[1]
                    f_data.dest_airport = d_airport[1]
                    self.getValues(f_data)
                    break
                else:
                    continue
            if flight_possible:
                break
        if flight_possible == False:
             self.zero_results(f_data)

    # def search_for_alt_airports(self, origin_airport, dest_airport, jsonload, f_data):
    #     # Alternative Planung mit o^d SkyScanner-Aufrufen
    #     origin_airports = airportfinder().find_city_airport(origin_airport["city"], jsonload)
    #     dest_airports = airportfinder().find_city_airport(dest_airport["city"], jsonload)
    #     flight_possible = False
    #     for o_airport in origin_airports:
    #         for d_airport in dest_airports:
    #             print(o_airport)
    #             print(d_airport)
    #             flight_possible = self.check_planned_route(o_airport["iata"], d_airport["iata"])
    #             f_data.origin_airport=o_airport
    #             f_data.dest_airport=d_airport
    #
    #             if flight_possible:
    #                 print("hello")
    #                 self.getValues(f_data)
    #                 break
    #             else:
    #                 print("here")
    #                 continue
    #     if flight_possible == False:
    #         airportfinder().find_alt_airport(self.origin_lat, self.origin_lng, jsonload)
    #         airportfinder().find_alt_airport(self.dest_lat, self.dest_lng, jsonload)
    #         self.zero_results(f_data)

    def zero_results(self, f_data):
        f_data.flight_dist = 0
        f_data.flight_time = 0
        f_data.departure_transit_json = 0
        f_data.arrival_transit_json = 0
        f_data.dist_sum = 0
        f_data.time_sum = 0
        f_data.emission_sum = 0

    # https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v7-2014.pdf
    # adding flight
    def correct_values_for_stopover(self, distance):
        if (distance<550000):
            distance += 50000
        elif (distance<5500000):
            distance += 100000
        else:
            distance += 125000
        return distance

    def check_planned_route(self, origin_iata, destination_iata):
        skyscanner_json = call_flight_api().check_planned_route(origin_iata, destination_iata)
        # print(skyscanner_json)
        try:
            # print (json_decode_flightroute["Quotes"][0]["QuoteId"])
            # wenn "QuoteId":1,  im JSON-Response vorhanden dann: verfügbaren Routen
            if skyscanner_json["Quotes"][0]["QuoteId"] != 0:
                return True
            else:
                return False
        except (KeyError, IndexError, TypeError):
            return False
