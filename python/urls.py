# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('like/<int:ad_id>/', views.like_car_ad, name='like_car_ad'),
    path('view/<int:ad_id>/', views.view_car_ad, name='view_car_ad'),
]
