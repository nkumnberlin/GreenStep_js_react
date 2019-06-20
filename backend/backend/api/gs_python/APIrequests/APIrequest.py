# -*- coding: utf-8 -*-
"""
Created on Thu May  9 09:22:41 2019

@author: tristanwachtel
"""
#Umbau man kann von der Google directions Api die Koordinaten nehmen, von der ZugPlanung und dieses dann der anderen API stecken
# from threading import Thread
import requests
import json
import time

class APIrequest:
    #deprecatwed, we are getting the coords, form the frontend
    def callGooglePointAPI(self, address):

        #json_decode_dist["results"][0]["address_components"][3]["long_name"],
        try:
            dist_response = requests.get(
                "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + " &key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
            json_decode_dist = dist_response.json()
            return  json_decode_dist["results"][0]["geometry"]["location"]["lng"], json_decode_dist["results"][0]["geometry"]["location"]["lat"]
        except (KeyError, TypeError, requests.exceptions.ConnectionError, requests.exceptions.HTTPError,
                requests.exceptions.Timeout, requests.exceptions.TooManyRedirects):
            return 0,0
    #berechnet auto und radstrecke
    #address = Koordinaten Fortmat: lng,lat;lng,lat

    def callMapBox(self, mode, address):
        try:
            dist_response = requests.get("https://api.mapbox.com/directions/v5/mapbox/" + mode + "/" + address +
                                         ".json?access_token=pk.eyJ1IjoiZ3JlZW5zdGVwIiwiYSI6ImNqdmgydWRjcTBlN2YzenMyMGpzZDV4YngifQ.FvoK7EqazIuCYmLpaF_BXg")
            json_decode_dist = dist_response.json()
            # print(json_decode_dist)
            return json_decode_dist["routes"][0]["distance"], json_decode_dist["routes"][0]["duration"]
        except (KeyError, TypeError, IndexError, requests.exceptions.ConnectionError, requests.exceptions.HTTPError,
                requests.exceptions.Timeout, requests.exceptions.TooManyRedirects):
            return 0, 0

    #used for transit-planning
    #extras = can be used for setting eg a departuretime, if nothing should happen, just send a empty String
    def callGoogleDirectionsAPI(self, origin, destination, mode, extras):
        try:
            response = requests.get(
                "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + " &destination=" + destination
                + " &mode=" + mode + extras + "&key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
            json_decode = response.json()
            if(json_decode["status"]=="ZERO_RESULTS"):
                return 0, 0, 0
            else:
                return json_decode["routes"][0]["legs"][0]["distance"]["value"], json_decode["routes"][0]["legs"][0]["duration"]["value"], json_decode
        except (KeyError, TypeError, requests.exceptions.ConnectionError, requests.exceptions.HTTPError,
                requests.exceptions.Timeout, requests.exceptions.TooManyRedirects):
            return 0, 0, 0


    #deprecated, schnelle antowrten von Google jedoch in Europa nur fuer Fahrzeuge
    def callGoogleDistanceAPI(self, origin, destination, mode):
        try:
            flight_dist_response = requests.get(
                "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + origin + " &destinations="
                + destination + " &mode=" + mode + " &key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
            json_decode_flight_dist = json.loads(flight_dist_response.text)
            return json_decode_flight_dist["rows"][0]["elements"][0]["distance"]["value"]
        except (KeyError, TypeError, requests.exceptions.ConnectionError, requests.exceptions.HTTPError,
                requests.exceptions.Timeout, requests.exceptions.TooManyRedirects):
            return 0

class call_flight_api:
    def check_planned_route(self, iata_origin, iata_dest):
        try:
            flight_route_response = requests.get(
                "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/DE/EUR/"
                "de-DE/" + iata_origin + "/" + iata_dest + "/2019-10-01?inboundpartialdate=2019-10-10",
                headers={
                    "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "X-RapidAPI-Key": "1de2f44c33msh037f72b19990e75p17ddc4jsn11356a6a1be8"
                }
            )
            return flight_route_response.json()
        except (requests.exceptions.ConnectionError, requests.exceptions.HTTPError, requests.exceptions.Timeout,
                requests.exceptions.TooManyRedirects):
            return 0

class get_time:
    reference_time = 1559728800
    def get_next_noon(self):
        # 06/05/2019 @ 10:00am (UTC)
        # timedelta = time from noon away
        #calculates the UTC time for noon tomorrow
        return self.reference_time + (int(int(time.time()) % self.reference_time / 86400) + 1) * 86400