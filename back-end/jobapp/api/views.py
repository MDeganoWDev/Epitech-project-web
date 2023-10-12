from rest_framework import viewsets
from .models import Company, Permission, Contract, Sex, Advertisement, Utilisateur, Application, Work, LANGUAGE_CHOICES, STYLE_CHOICES
from .serializers import CompanySerializer, AdvertisementSerializer, ContractSerializer, PermissionSerializer, SexSerializer, UtilisateurSerializer, ApplicationSerializer, WorkSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

class UserRegistrationAPIView(CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
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

class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer