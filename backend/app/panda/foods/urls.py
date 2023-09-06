from django.urls import path

from . import views

urlpatterns = [
    path('', views.foods_handler, name='foods_handler'),
    path('<int:id>/', views.food_detail_handler, name='food_detail_handler'),
]

