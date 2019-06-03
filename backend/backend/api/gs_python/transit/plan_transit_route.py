# -*- coding: utf-8 -*-
"""
Created on Sat May 25 18:38:13 2019

@author: tristanwachtel
"""
#pyCharm
from APIrequests.APIrequest import APIrequest
from transit.crawl_transit_steps import crawl_steps
import json
#react - not tested in react
# from ..APIrequests.APIrequest import APIrequest
# from transit.crawl_trainsit_steps import crawl_steps

class transit_route_cords:
    emission_transit = 0.04

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        # Laegnengrad W/E
        self.origin_lng = origin_lng
        # Breitengrad N/S
        self.origin_lat = origin_lat
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    def run_transit_planning(self):
        transit_dist, transit_time, json_response= APIrequest().callGoogleDirectionsAPI(str(str(self.origin_lat) + " " + str(self.origin_lng)), str(str(self.dest_lat) + " " + str(self.dest_lng)), "transit", "&departure_time=1558951200")
        transit_emission_result = transit_dist / 1000 * self.emission_transit
        if(transit_dist==0 & transit_time==0 & json_response==0):
            return json.dumps(0)
        else:
            return json.dumps({"transit": {"dist": transit_dist, "time": transit_time, "emission": transit_emission_result, "steps": crawl_steps().get_steps(json_response)}})

class transit_route_address:
    emission_transit = 0.04
    def __init__(self, origin, dest):
        self.origin = origin
        self.dest = dest

    def run_transit_planning(self):
        transit_dist, transit_time , json_response = APIrequest().callGoogleDirectionsAPI(self.origin, self.dest, "transit", "&departure_time=1558951200")
        transit_emission_result = transit_dist / 1000 * self.emission_transit
        return {"transit": {"dist": transit_dist, "time": transit_time, "emission": transit_emission_result, "travel_mode": "TRANSIT", "steps": crawl_steps().get_steps(json_response)}}