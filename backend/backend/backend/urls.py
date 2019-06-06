from django.urls import path

from api.views import getTravelData, getDistance, getWalkingData, getCyclingData, getTransitAndDrivingData, getTransitDrivingAndFlyingData

urlpatterns = [
	path("getWalking/", getWalkingData, name="walkingData"),
	path("getCycling/", getCyclingData, name="cyclingData"),
	path("getTransitAndDriving/", getTransitAndDrivingData, name="transitAndDrivingData"),
	path("getTransitDrivingAndFlying/", getTransitDrivingAndFlyingData, name="transitDrivingAndFlyingData"),
	path("getTravelData/", getTravelData, name="travelData"),
	path("getDistance/", getDistance, name="distance")
]