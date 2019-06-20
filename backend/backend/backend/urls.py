from django.urls import path

from api.views import getTravelData, getDistance, getWalkingData, getTransitData, getPlaneData, getCyclingData, getDrivingData

urlpatterns = [
	path("getWalking/", getWalkingData, name="walkingData"),
	path("getCycling/", getCyclingData, name="cyclingData"),
	path("getDriving/", getDrivingData, name="drivingData"),
	path("getTransit/", getTransitData, name="transitData"),
	path("getPlane/", getPlaneData, name="planeData"),
	path("getTravelData/", getTravelData, name="travelData"),
	path("getDistance/", getDistance, name="distance")
]