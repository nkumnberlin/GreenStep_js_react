# -*- coding: utf-8 -*-
"""
Created on Sat May 25 18:38:13 2019

@author: tristanwachtel
"""
#pyCharm
from ..APIrequests.APIrequest import APIrequest
import json
#react - not tested in react
# from ..APIrequests.APIrequest import APIrequest

#tbd: add cycling calls
class walking_route:
    emission_walking = 0;

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        # Laegnengrad W/E
        self.origin_lng = origin_lng
        # Breitengrad N/S
        self.origin_lat = origin_lat
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    def run_walk_planning(self):
        walking_dist, walking_time = APIrequest().callMapBox("walking", str(str(self.origin_lng) + "," +
        str(self.origin_lat) + ";" + str(self.dest_lng) + "," + str(self.dest_lat)))
        walking_emission = walking_dist / 1000 * self.emission_walking
        return json.dumps(
            {"walk": {"dist": walking_dist, "time": walking_time, "emission": walking_emission,
                      "travel_mode": "WALKING", "steps": [{"travel_mode": "WALKING", "duration": walking_time,
                                                            "distance": walking_dist,
                                                            "start_location": str(self.origin_lat) + " " +  str(self.origin_lng),
                                                            "end_location": str(self.dest_lat) + " " + str(self.dest_lng)}]}})