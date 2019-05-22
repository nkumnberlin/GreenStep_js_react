# -*- coding: utf-8 -*-
class dataobject:
   time = 0     # in seconds
   distance = 0 # in meter
   emission = 0 # CO2 in kg

   # def __call__(self):
   #     print ("DO got called")

   def __init__(self, distance, time, emission):
      self.distance = distance
      self.time = time
      self.emission = emission