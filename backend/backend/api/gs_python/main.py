# coding=utf-8
# Pycharm
from APIrequests.APIrequest import APIrequest
from flight.plan_flight_route import flight_route
from cycling.plan_cycling_route import cycling_route
from driving.plan_driving_route import driving_route
from transit.plan_transit_route import transit_route_cords
from walking.plan_walking_route import walking_route


# react
# from .APIrequests.APIrequest import APIrequest
# from .flight.planflightroute import planflightroute

class main:
    # emissions with upstream chain - source: Probas Umweltbundesamt
    # emission_flight = 0.18
    # emission_car = 0.2125
    # emission_transit = 0.04
    # emission_cycling = 0.0032

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        self.origin_lng = origin_lng  # Laegnengrad W/E
        self.origin_lat = origin_lat  # Breitengrad N/S
        # Stockholm Abba Museum
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    # Entry
    def __get__(self):
        print(walking_route(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat).run_walk_planning())
        print(cycling_route(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat).run_cycle_planning())
        print(driving_route(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat).run_drive_planning())
        print(transit_route_cords(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat).run_transit_planning())
        print(flight_route(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat).run_flight_planning())

    # def create_json(self):
    # flight_dist_sum, flight_time_sum, flight_emission_sum = self.call_flight_sth()
    # driving_dist, driving_time, driving_emission = self.call_driving_sth()
    # transit_dist, transit_time, transit_emission = self.call_transit_sth()
    # cycling_dist, cycling_time, cycling_emission = self.call_cycling_sth()
    # return {"flight": {"dist": flight_dist_sum, "time": flight_time_sum, "emission": flight_emission_sum},
    # "driving": {"dist": driving_dist,"time": driving_time,"emission": driving_emission}, "cycling":
    # {"dist": cycling_dist,"time": cycling_time,"emission": cycling_emission}, "transit":
    # {"dist": transit_dist,"time": transit_time,"emission": transit_emission}}


main(13.4662245, 52.5052512, 6.750218299, 51.2214798).__get__()

# print("Emmitted Emission: \n - Cycling: " + str(
#     emission_calc_cycling) + "kg CO2 p.P\t actual distance in meter: " + str(cycling_dist) + "\n - Driving: " + str(
#     emission_calc_driving) + "kg CO2 p.P.\t actual distance in meter: " + str(driving_dist) + "\n - Transit: " + str(
#     emission_calc_transit) + "kg CO2 p.P.\t\t actual distance in meter: " + str(transit_dist) + "\n - Flight: " + str(
#     emission_calc_flight) + "kg CO2 p.P\t actual distance in meter: " + str(
#     flight_dist + arrival_transit_dist + departure_transit_dist))

# Exit
# obj = {"flight": {"dist": flight_dist+arrival_transit_dist+departure_transit_dist, "time":
# flight_time+arrival_transit_time + departure_transit_time, "emission": emission_calc_flight},
# "driving": {"dist": driving_dist,"time": driving_time,"emission": emission_calc_driving}, "cycling":
# {"dist": cycling_dist,"time": cycling_time,"emission": emission_calc_cycling}, "transit": {"dist":
# transit_dist,"time": transit_time,"emission": emission_calc_transit}}
# obj["flight"]["dist"] = flight_dist + arrival_transit_dist + departure_transit_dist
# obj["flight"]["time"] = flight_time + arrival_transit_time + departure_transit_time
# obj["flight"]["emission"] = flight_dist + arrival_transit_dist + emission_calc_flight
# print(obj)
