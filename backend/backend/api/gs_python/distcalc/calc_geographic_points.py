# -*- coding: utf-8 -*-
import math
class distcalc:
    def degreesToRadians(self, degrees):
      return degrees * math.pi / 180

    #Flugstreckenberechnung - mithilfe von math Funktionen
    def distanceInKmBetweenEarthCoordinates(self, lat1, lng1, lat2, lng2):
        earthRadiusKm = 6371
        dLat = self.degreesToRadians(lat2 - lat1)
        dLon = self.degreesToRadians(lng2 - lng1)
        lat1 = self.degreesToRadians(lat1)
        lat2 = self.degreesToRadians(lat2)
        a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.sin(dLon / 2) * math.sin(dLon / 2) * math.cos(lat1) * \
            math.cos(lat2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return earthRadiusKm * c * 1000

class distcalc_coords:
    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        self.lat1 = origin_lat
        self.lng1 = origin_lng
        self.lat2 = dest_lat
        self.lng2 = dest_lng
        
    def __get__(self):
        return distcalc().distanceInKmBetweenEarthCoordinates(self.lat1, self.lng1, self.lat2, self.lng2)