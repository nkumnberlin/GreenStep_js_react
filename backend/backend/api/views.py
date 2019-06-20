from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from api.gs_python.main import main
from api.gs_python.distcalc.calc_geographic_points import distcalc_coords
from api.gs_python.walking.plan_walking_route import walking_route
from api.gs_python.cycling.plan_cycling_route import cycling_route
from api.gs_python.driving.plan_driving_route import driving_route
from api.gs_python.flight.plan_flight_route import flight_route
from api.gs_python.transit.plan_transit_route import transit_route_cords
import json



@api_view(["POST"])
def getWalkingData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		walking_data = walking_route(d_lng,d_lat,a_lng,a_lat).run_walk_planning()
		walking_data = json.loads(walking_data)
		walking_data = walking_data['walk']
		travelData = {
		"walking": walking_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})
		
@api_view(["POST"])
def getCyclingData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		bicycle_data= cycling_route(d_lng,d_lat,a_lng,a_lat).run_cycle_planning()
		bicycle_data = json.loads(bicycle_data)
		bicycle_data = bicycle_data['cycle']
		travelData = {
		"cycling": bicycle_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})
		
@api_view(["POST"])
def getDrivingData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		car_data = driving_route(d_lng,d_lat,a_lng,a_lat).run_drive_planning()
		car_data = json.loads(car_data)
		car_data = car_data['drive']
		travelData = {
		"driving": car_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})

@api_view(["POST"])
def getTransitData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		train_data = transit_route_cords(d_lng,d_lat,a_lng,a_lat).run_transit_planning()
		train_data = json.loads(train_data)
		train_data = train_data['transit']
		travelData = {
		"transit": train_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})		

@api_view(["POST"])
def getPlaneData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		plane_data = flight_route(d_lng,d_lat,a_lng,a_lat).run_flight_planning()
		plane_data = json.loads(plane_data)	
		plane_data = plane_data['flight']
		travelData = {
		"flight": plane_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})		
		

@api_view(["POST"])
def getTravelData(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		bicycle_data= cycling_route(d_lng,d_lat,a_lng,a_lat).run_cycle_planning()
		bicycle_data = json.loads(bicycle_data)
		bicycle_data = bicycle_data['cycle']
		car_data = driving_route(d_lng,d_lat,a_lng,a_lat).run_drive_planning()
		car_data = json.loads(car_data)
		car_data = car_data['drive']
		plane_data = flight_route(d_lng,d_lat,a_lng,a_lat).run_flight_planning()
		plane_data = json.loads(plane_data)	
		plane_data = plane_data['flight']
		train_data = transit_route_cords(d_lng,d_lat,a_lng,a_lat).run_transit_planning()
		train_data = json.loads(train_data)
		train_data = train_data['transit']
		walking_data = walking_route(d_lng,d_lat,a_lng,a_lat).run_walk_planning()
		walking_data = json.loads(walking_data)
		walking_data = walking_data['walk']
		travelData = {
		"cycling": bicycle_data,
		"driving": car_data,
		"flight": plane_data,
		"transit": train_data,
		"walking": walking_data
		}
		return Response(status=status.HTTP_200_OK, data={"data": travelData})
		
@api_view(["POST"])
def getDistance(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		print("ER IST IN GET DISTANCE")
		distanceData = distcalc_coords(d_lat,d_lng,a_lat,a_lng).__get__()
		return Response(status=status.HTTP_200_OK, data={"distance": distanceData})
		
# @api_view(["POST"])
# def getWalkingCyclingData(request):
	# if request.method == 'POST':
		# info = json.dumps(request.data, ensure_ascii=False)
		# decode = json.loads(info)
		# d_lat = decode['cords']['d_lat']
		# d_lng = decode['cords']['d_lng']
		# a_lat = decode['cords']['a_lat']
		# a_lng = decode['cords']['a_lng']
		# walking_data = walking_route(d_lng,d_lat,a_lng,a_lat).run_walk_planning()
		# walking_data = json.loads(walking_data)
		# walking_data = walking_data['walk']
		# bicycle_data= cycling_route(d_lng,d_lat,a_lng,a_lat).run_cycle_planning()
		# bicycle_data = json.loads(bicycle_data)
		# bicycle_data = bicycle_data['cycle']
		# travelData = {
		# "walking": walking_data,
		# "cycling": bicycle_data
		# }
		# return Response(status=status.HTTP_200_OK, data={"data": travelData})

# @api_view(["POST"])
# def getTransitAndDrivingData(request):
	# if request.method == 'POST':
		# info = json.dumps(request.data, ensure_ascii=False)
		# decode = json.loads(info)
		# d_lat = decode['cords']['d_lat']
		# d_lng = decode['cords']['d_lng']
		# a_lat = decode['cords']['a_lat']
		# a_lng = decode['cords']['a_lng']
		# car_data = driving_route(d_lng,d_lat,a_lng,a_lat).run_drive_planning()
		# car_data = json.loads(car_data)
		# car_data = car_data['drive']
		# train_data = transit_route_cords(d_lng,d_lat,a_lng,a_lat).run_transit_planning()
		# train_data = json.loads(train_data)
		# train_data = train_data['transit']
		# travelData = {
		# "driving": car_data,
		# "transit": train_data,
		# }
		# return Response(status=status.HTTP_200_OK, data={"data": travelData})
		
# @api_view(["POST"])
# def getTransitDrivingAndFlyingData(request):
	# if request.method == 'POST':
		# info = json.dumps(request.data, ensure_ascii=False)
		# decode = json.loads(info)
		# d_lat = decode['cords']['d_lat']
		# d_lng = decode['cords']['d_lng']
		# a_lat = decode['cords']['a_lat']
		# a_lng = decode['cords']['a_lng']
		# car_data = driving_route(d_lng,d_lat,a_lng,a_lat).run_drive_planning()
		# car_data = json.loads(car_data)
		# car_data = car_data['drive']
		# train_data = transit_route_cords(d_lng,d_lat,a_lng,a_lat).run_transit_planning()
		# train_data = json.loads(train_data)
		# train_data = train_data['transit']
		# plane_data = flight_route(d_lng,d_lat,a_lng,a_lat).run_flight_planning()
		# plane_data = json.loads(plane_data)	
		# plane_data = plane_data['flight']
		# travelData = {
		# "driving": car_data,
		# "transit": train_data,
		# "flight": plane_data,
		# }
		# return Response(status=status.HTTP_200_OK, data={"data": travelData})
