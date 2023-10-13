from rest_framework import viewsets
from .models import Company, Permission, Contract, Sex, Advertisement, Unregister, Utilisateur, Application, LANGUAGE_CHOICES, STYLE_CHOICES
from .serializers import CompanySerializer, AdvertisementSerializer, ContractSerializer, PermissionSerializer, SexSerializer, UnregisterSerializer, UtilisateurSerializer, ApplicationSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer

class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    # permission_classes = [IsAuthenticated]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

class SexViewSet(viewsets.ModelViewSet):
    queryset = Sex.objects.all()
    serializer_class = SexSerializer

class UnregisterViewSet(viewsets.ModelViewSet):
    queryset = Unregister.objects.all()
    serializer_class = UnregisterSerializer