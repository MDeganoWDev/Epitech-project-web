from rest_framework import viewsets
from .models import Company, Permission, Contract, Sex, Advertisement, Unregister, Utilisateur, Application, LANGUAGE_CHOICES, STYLE_CHOICES
from .serializers import CompanySerializer, AdvertisementSerializer, ContractSerializer, PermissionSerializer, SexSerializer, UnregisterSerializer, UtilisateurSerializer, ApplicationSerializer
from .permissions import ReadOnly, HasAdminPermission, HasOfferingPermission, HasSearchingPermission
from .mixins import MultipleFieldLookupMixin

class UtilisateurViewSet(MultipleFieldLookupMixin, viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    lookup_fields = ['auth_token', 'pk']
    # permission_classes = [IsAuthenticated]

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

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    #permission_classes = [HasSearchingPermission|ReadOnly]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer