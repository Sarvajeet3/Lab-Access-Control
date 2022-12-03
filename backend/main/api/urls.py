from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData, name='getData'),
    path('add/', views.addItem, name='addItem'),
    path('scan/', views.scan, name='scan'),
    path('labs/', views.getLabs, name='labs'),
]