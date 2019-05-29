# -*- coding: utf-8 -*-
from flight.flight_info import flight_data
class flight_response:
    def create_response(self, f_data):

                    # (self, arrival_transit_json, departure_transit_json,
                    #     flight_time, flight_dist, origin_airport,
                    #     dest_airport, flight_dist_sum, flight_time_sum, flight_emission_result):
        return {"flight": {"dist": f_data.flight_dist + f_data.departure_transit_json["transit"]["dist"] + f_data.arrival_transit_json["transit"]["dist"],
                           "time": f_data.flight_time + f_data.departure_transit_json["transit"]["time"]+ f_data.arrival_transit_json["transit"]["time"],
                           "emission": f_data.flight_emission_result,
                           "steps": self.create_step_by_step_route_json(f_data)}}

    def create_step_by_step_route_json(self, f_data):
        json = []
        json.append(f_data.departure_transit_json)
        json.append([{"travel_mode": "FLYING",
                      "Values": {
                          "duration": f_data.flight_time,
                          "distance": f_data.flight_dist,
                          "start_location": f_data.origin_airport["iata"],
                          "end_location": f_data.dest_airport["iata"]}}])
        json.append(f_data.arrival_transit_json)
        return json
