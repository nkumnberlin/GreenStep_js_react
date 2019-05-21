from django.urls import path

from api.views import book

urlpatterns = [
    path("book/", book, name="book"),
]