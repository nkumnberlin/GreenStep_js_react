# -*- coding: utf-8 -*-
from flight.flight_info import flight_data
import json
class flight_response:
    emission_flight = 0.18
    def create_response(self, f_data):

                    # (self, arrival_transit_json, departure_transit_json,
                    #     flight_time, flight_dist, origin_airport,
                    #     dest_airport, flight_dist_sum, flight_time_sum, flight_emission_result):
        return json.dumps({"flight": {"dist": f_data.flight_dist + f_data.departure_transit_json["transit"]["dist"] + f_data.arrival_transit_json["transit"]["dist"],
                           "time": f_data.flight_time + f_data.departure_transit_json["transit"]["time"]+ f_data.arrival_transit_json["transit"]["time"],
                           "emission": f_data.flight_emission_result + f_data.departure_transit_json["transit"]["emission"]+ f_data.arrival_transit_json["transit"]["emission"],
                           "steps": self.create_step_by_step_route_json(f_data)}})

    def create_step_by_step_route_json(self, f_data):
        step_array = []
        step_array.append(f_data.departure_transit_json)
        step_array.append({
            "flying":{
               "dist":f_data.flight_dist,
               "time":f_data.flight_time,
               "emission":f_data.flight_dist / 1000 * self.emission_flight,
               "steps":[{"travel_mode": "FLYING",
                      "Values": {
                          "duration": f_data.flight_time,
                          "distance": f_data.flight_dist,
                          "start_location": f_data.origin_airport["iata"],
                          "end_location": f_data.dest_airport["iata"]}}]}})
        step_array.append(f_data.arrival_transit_json)

        return step_array
