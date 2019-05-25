# -*- coding: utf-8 -*-
"""
Created on Sat May 25 18:38:13 2019

@author: tristanwachtel
"""
#pyCharm
from APIrequests.APIrequest import APIrequest
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

    def run_walking_planning(self):
        cycling_dist, cycling_time = APIrequest().callMapBox("cycling", str(str(self.origin_lng) + "," +
        str(self.origin_lat) + ";" + str(self.dest_lng) + "," + str(self.dest_lat)))
        cycling_emission = cycling_dist / 1000 * self.emission_cycling
        return {"walking": {"dist": 0, "time": 0, "emission": 0}}