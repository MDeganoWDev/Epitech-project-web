from rest_framework import viewsets
from .models import Company, Permission, Contract, Sex, Advertisement, Unregister, Utilisateur, Application, LANGUAGE_CHOICES, STYLE_CHOICES
from .serializers import CompanySerializer, AdvertisementSerializer, ContractSerializer, PermissionSerializer, SexSerializer, UnregisterSerializer, UtilisateurSerializer, ApplicationSerializer
from .permissions import ReadOnly, HasAdminPermission, HasOfferingPermission, HasSearchingPermission
from .mixins import MultipleFieldLookupMixin
from rest_framework.response import Response
from rest_framework import status

class UtilisateurViewSet(MultipleFieldLookupMixin, viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    lookup_fields = ['auth_token', 'pk']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            password = request.data.get('password')
            user.set_password(password)
            user.groups.set(request.data.get('groups', []))
            user.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UnregisterViewSet(viewsets.ModelViewSet):
    queryset = Unregister.objects.all().order_by('id')
    serializer_class = UnregisterSerializer

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all().order_by('id')
    serializer_class = PermissionSerializer
    permission_classes = [HasAdminPermission|ReadOnly]

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all().order_by('id')
    serializer_class = ContractSerializer
    permission_classes = [HasAdminPermission|ReadOnly]

class SexViewSet(viewsets.ModelViewSet):
    queryset = Sex.objects.all().order_by('id')
    serializer_class = SexSerializer
    permission_classes = [HasAdminPermission|ReadOnly]

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('id')
    serializer_class = CompanySerializer

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer
    permission_classes = [HasOfferingPermission|ReadOnly]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('id')
    serializer_class = ApplicationSerializer


# View with prefix All to get all objects without pagination

class AllCompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('id')
    serializer_class = CompanySerializer
    pagination_class = None

class AllPermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all().order_by('id')
    serializer_class = PermissionSerializer
    pagination_class = None
    permission_classes = [HasAdminPermission|ReadOnly]

class AllContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all().order_by('id')
    serializer_class = ContractSerializer
    pagination_class = None
    permission_classes = [HasAdminPermission|ReadOnly]

class AllSexViewSet(viewsets.ModelViewSet):
    queryset = Sex.objects.all().order_by('id')
    serializer_class = SexSerializer
    pagination_class = None
    permission_classes = [HasAdminPermission|ReadOnly]

class AllAdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    pagination_class = None
    permission_classes = [HasOfferingPermission|ReadOnly]

class AllApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    pagination_class = None
