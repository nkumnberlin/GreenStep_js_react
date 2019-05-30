# -*- coding: utf-8 -*-
from dataclasses import dataclass

@dataclass
class flight_data:
    def __init__(self):
        pass
    flight_dist: float
    flight_time: float
    flight_emission_result: float
    arrival_transit_json: object
    departure_transit_json: object
    origin_airport: object
    dest_airport: object