# -*- coding: utf-8 -*-
"""
Created on Thu May  9 09:22:41 2019

@author: tristanwachtel
"""
#Umbau man kann von der Google directions Api die Koordinaten nehmen, von der ZugPlanung und dieses dann der anderen API stecken
# from threading import Thread
import requests
import json

class APIrequest:
    def callGooglePointAPI(self, address):
        dist_response = requests.get(
            "https://maps.googleapis.com/maps/api/geocode/json?address="+address+" &key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
        json_decode_dist = json.loads(dist_response.text)
        return json_decode_dist["results"][0]["address_components"][3]["long_name"], json_decode_dist["results"][0]["geometry"]["location"]["lat"], json_decode_dist["results"][0]["geometry"]["location"]["lng"]
    #berechnet auto und radstrecke
    #address = Koordinaten Fortmat: lng,lat;lng,lat

    def callMapBox(self, mode, address):
        dist_response = requests.get(
        "https://api.mapbox.com/directions/v5/mapbox/"+mode+"/"+address+".json?access_token=pk.eyJ1IjoiZ3JlZW5zdGVwIiwiYSI6ImNqdmgydWRjcTBlN2YzenMyMGpzZDV4YngifQ.FvoK7EqazIuCYmLpaF_BXg")
        json_decode_dist = json.loads(dist_response.text)
        return json_decode_dist["routes"][0]["distance"], json_decode_dist["routes"][0]["duration"]

    #berechnet auto und radstrecke
    def callGoogleDirectionsAPI(self, origin, destination, mode):
        dist_response = requests.get(
            "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + " &destination=" + destination
            + " &mode=" + mode + "&key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
        #print (dist_response.raw_body)
        json_decode_dist = json.loads(dist_response.text)
        #print (json_decode_dist)
        return json_decode_dist["routes"][0]["legs"][0]["distance"]["value"], json_decode_dist["routes"][0]["legs"][0]["duration"]["value"]

    #deprecated, schnelle antowrten von Google jedoch in Europa nur fuer Fahrzeuge
    def callGoogleDistanceAPI(self, origin, destination, mode):
        flight_dist_response = requests.get(
            "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + origin + " &destinations="
            + destination + " &mode=" + mode + " &key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM")
        #print (flight_dist_response.text)
        json_decode_flight_dist = json.loads(flight_dist_response.text)
        return json_decode_flight_dist["rows"][0]["elements"][0]["distance"]["value"]

