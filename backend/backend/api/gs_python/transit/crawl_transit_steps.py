# -*- coding: utf-8 -*-
import json
class crawl_steps:
    def get_steps(self, travel_json):
        #print(json)
        i = 0
        waypoints = []
        steps = travel_json["routes"][0]["legs"][0]["steps"]
        for i in range(len(steps)):
            if (i == 0):
                #print("i==0")
                waypoints.append({"travel_mode": steps[i]["travel_mode"],
                         "duration": steps[i]["duration"]["value"],
                         "distance": steps[i]["distance"]["value"],
                         "start_location": travel_json["routes"][0]["legs"][0]["start_address"],
                         "end_location": steps[i + 1]["transit_details"]["departure_stop"]["name"]})
            else:
                try:
                    waypoints.append({"travel_mode": steps[i]["travel_mode"],
                        "duration": steps[i]["duration"]["value"],
                        "distance": steps[i]["distance"]["value"],
                        "start_location": steps[i]["transit_details"]["departure_stop"]["name"],
                        "end_location": steps[i]["transit_details"]["arrival_stop"]["name"]})
                except:
                    try:
                        waypoints.append({"travel_mode": steps[i]["travel_mode"],
                                              "duration": steps[i]["duration"]["value"],
                                              "distance": steps[i]["distance"]["value"],
                                              "start_location": steps[i - 1]["transit_details"]["arrival_stop"]["name"],
                                              "end_location": steps[i + 1]["transit_details"]["departure_stop"][
                                                  "name"]})
                    except:
                        waypoints.append({"travel_mode": steps[i]["travel_mode"],
                                              "duration": steps[i]["duration"]["value"],
                                              "distance": steps[i]["distance"]["value"],
                                              "start_location": steps[i - 1]["transit_details"]["arrival_stop"]["name"],
                                              "end_location": travel_json["routes"][0]["legs"][0]["end_address"]})
                        pass
        return waypoints