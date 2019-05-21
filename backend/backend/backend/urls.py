from django.urls import path

from api.views import book, postLatLng

urlpatterns = [
    path("book/", book, name="book"),
	path("postLatLng/", postLatLng, name="latlng")
]