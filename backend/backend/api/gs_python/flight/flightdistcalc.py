# -*- coding: utf-8 -*-
import math
class flightdistcalc:
    c = 0
    #def __call__(self):
    #    return earthRadiusKm * c

    def degreesToRadians(self, degrees):
      return degrees * math.pi / 180

    #Flugstreckenberechnung - mithilfe von math Funktionen
    def distanceInKmBetweenEarthCoordinates(self, lat1, lon1, lat2, lon2):
        earthRadiusKm = 6371
        dLat = self.degreesToRadians(lat2 - lat1)
        dLon = self.degreesToRadians(lon2 - lon1)
        lat1 = self.degreesToRadians(lat1)
        lat2 = self.degreesToRadians(lat2)
        a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.sin(dLon / 2) * math.sin(dLon / 2) * math.cos(lat1) * \
            math.cos(lat2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return earthRadiusKm * c * 1000