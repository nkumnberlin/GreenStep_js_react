# -*- coding: utf-8 -*-
"""
Created on Sat May 25 18:38:13 2019

@author: tristanwachtel
"""
#pyCharm
from APIrequests.APIrequest import APIrequest
import json
#react - not tested in react
# from ..APIrequests.APIrequest import APIrequest

class driving_route:
    emission_car = 0.2125

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        # Laegnengrad W/E
        self.origin_lng = origin_lng
        # Breitengrad N/S
        self.origin_lat = origin_lat
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    def run_flight_planning(self):
        driving_dist, driving_time = APIrequest().callMapBox("driving", str(str(self.origin_lng) + "," + str(self.origin_lat) + ";" + str(self.dest_lng) + "," + str(self.dest_lat)))
        driving_emission_result = driving_dist / 1000 * self.emission_car
        return json.dumps({"driving": {"dist": driving_dist, "time": driving_time, "emission": driving_emission_result}})