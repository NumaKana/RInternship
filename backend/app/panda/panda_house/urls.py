from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_panda_status, name="get_panda_status"),
]