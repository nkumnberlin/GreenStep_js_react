# coding=utf-8
#Pycharm
from APIrequests.APIrequest import APIrequest
from flight.planflightroute import planflightroute
#react
#from .APIrequests.APIrequest import APIrequest
#from .flight.planflightroute import planflightroute

class main:
    # emissions with upstream chain - source: Probas Umweltbundesamt
    emission_flight = 0.18
    emission_car = 0.2125
    emission_transit = 0.04
    emission_cycling = 0.0032

    def __init__(self, origin_lng, origin_lat, dest_lng, dest_lat):
        self.origin_lng = origin_lng #Laegnengrad W/E
        self.origin_lat= origin_lat #Breitengrad N/S
        #Stockholm Abba Museum
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    #Entry
    def setCoordinates(self, origin_lng, origin_lat, dest_lng, dest_lat):
        self.origin_lng = origin_lng #Laegnengrad W/E
        self.origin_lat= origin_lat #Breitengrad N/S
        #Stockholm Abba Museum
        self.dest_lng = dest_lng
        self.dest_lat = dest_lat

    #calls
    def call_flight_sth(self):
        departure_transit_dist, arrival_transit_dist, flight_dist, departure_transit_time, arrival_transit_time, flight_time = planflightroute().planflight(self.origin_lng, self.origin_lat, self.dest_lng, self.dest_lat)
        emission_calc_flight = flight_dist / 1000 * self.emission_flight + ((arrival_transit_dist + departure_transit_dist) / 1000) * self.emission_transit
        return flight_dist+arrival_transit_dist+departure_transit_dist, flight_time+arrival_transit_time + departure_transit_time, emission_calc_flight

    def call_driving_sth(self):
        driving_dist, driving_time = APIrequest().callMapBox("driving", str(str(self.origin_lng) + "," + str(self.origin_lat) + ";" + str(self.dest_lng) + "," + str(self.dest_lat)))
        emission_calc_driving = driving_dist / 1000 * self.emission_car
        return driving_dist, driving_time, emission_calc_driving

    def call_transit_sth(self):
        transit_dist, transit_time= APIrequest().callGoogleDirectionsAPI(str(str(self.origin_lat) + " " + str(self.origin_lng)), str(str(self.dest_lat) + " " + str(self.dest_lng)), "transit")
        emission_calc_transit = transit_dist / 1000 * self.emission_transit
        return transit_dist, transit_time, emission_calc_transit

    def call_cycling_sth(self):
        cycling_dist, cycling_time = APIrequest().callMapBox("cycling", str(str(self.origin_lng) + "," + str(self.origin_lat) + ";" + str(self.dest_lng) + "," + str(self.dest_lat)))
        emission_calc_cycling = cycling_dist / 1000 * self.emission_cycling
        return cycling_dist, cycling_time, emission_calc_cycling

    #Exit
    def create_json(self):
        flight_dist_sum, flight_time_sum, flight_emission_sum = self.call_flight_sth()
        driving_dist, driving_time, driving_emission = self.call_driving_sth()
        transit_dist, transit_time, transit_emission = self.call_transit_sth()
        cycling_dist, cycling_time, cycling_emission = self.call_cycling_sth()
        return {"flight": {"dist": flight_dist_sum, "time": flight_time_sum, "emission": flight_emission_sum}, "driving": {"dist": driving_dist,"time": driving_time,"emission": driving_emission}, "cycling": {"dist": cycling_dist,"time": cycling_time,"emission": cycling_emission}, "transit": {"dist": transit_dist,"time": transit_time,"emission": transit_emission}}

m=main(13.4662245, 52.5052512, 18.0965639, 59.324893)
print(m.create_json())
# print("Emmitted Emission: \n - Cycling: " + str(
#     emission_calc_cycling) + "kg CO2 p.P\t actual distance in meter: " + str(cycling_dist) + "\n - Driving: " + str(
#     emission_calc_driving) + "kg CO2 p.P.\t actual distance in meter: " + str(driving_dist) + "\n - Transit: " + str(
#     emission_calc_transit) + "kg CO2 p.P.\t\t actual distance in meter: " + str(transit_dist) + "\n - Flight: " + str(
#     emission_calc_flight) + "kg CO2 p.P\t actual distance in meter: " + str(
#     flight_dist + arrival_transit_dist + departure_transit_dist))

    #Exit
    #obj = {"flight": {"dist": flight_dist+arrival_transit_dist+departure_transit_dist, "time": flight_time+arrival_transit_time + departure_transit_time, "emission": emission_calc_flight}, "driving": {"dist": driving_dist,"time": driving_time,"emission": emission_calc_driving}, "cycling": {"dist": cycling_dist,"time": cycling_time,"emission": emission_calc_cycling}, "transit": {"dist": transit_dist,"time": transit_time,"emission": emission_calc_transit}}
    #obj["flight"]["dist"] = flight_dist + arrival_transit_dist + departure_transit_dist
    #obj["flight"]["time"] = flight_time + arrival_transit_time + departure_transit_time
    #obj["flight"]["emission"] = flight_dist + arrival_transit_dist + emission_calc_flight
    #print(obj)