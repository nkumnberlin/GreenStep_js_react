# -*- coding: utf-8 -*-
from .flight_info import flight_data
import json
class flight_response:
    emission_flight = 0.18
    def create_response(self, f_data):
        try:
            return json.dumps(
                {"flight": {"dist": f_data.dist_sum, "time": f_data.time_sum, "emission": f_data.emission_sum,
                            "travel_mode": "FLYING", "steps": self.create_step_by_step_route_json(f_data)}})
        except TypeError:
            return json.dumps({"flight": {"dist": 0, "time": 0, "emission": 0, "travel_mode": "FLYING", "steps": 0}})

    def create_step_by_step_route_json(self, f_data):
        step_array = []
        step_array.append(json.loads(f_data.departure_transit_json))
        step_array.append({
            "flight":{
               "dist":f_data.flight_dist,
               "time":f_data.flight_time,
               "emission":f_data.flight_dist / 1000 * self.emission_flight,
                "travel_mode" : "FLYING",
               "steps":[{"travel_mode": "FLYING",
                          "duration": f_data.flight_time,
                          "distance": f_data.flight_dist,
                          "start_location": f_data.origin_airport["iata"],
                          "end_location": f_data.dest_airport["iata"]}]}})
        step_array.append(json.loads(f_data.arrival_transit_json))

        return step_array
