from django.urls import path
from .views import UserCreate, UserEdit

urlpatterns = [
    path('', UserCreate.as_view(), name='UserCreate'),
    path('<int:pk>/', UserEdit.as_view(), name='UserEdit'),
]