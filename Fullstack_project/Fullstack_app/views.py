from rest_framework import generics
from .models import User
from .serializers import UserSerializer

# Create your views here.

class UserCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer