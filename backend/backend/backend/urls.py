from django.urls import path

from api.views import getTravelData, getDistance, getWalkingData, getTransitAndDrivingData, getTransitDrivingAndFlyingData

urlpatterns = [
	path("getWalking/", getWalkingData, name="walkingData"),
	path("getTravelData/", getTravelData, name="travelData"),
	path("getDistance/", getDistance, name="distance")
]