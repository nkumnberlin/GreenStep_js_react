from django.urls import path

from api.views import getTravelData, getDistance

urlpatterns = [
	path("getTravelData/", getTravelData, name="travelData"),
	path("getDistance/", getDistance, name="distance")
]