from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import CompanyViewSet, AdvertisementViewSet, UnregisterViewSet, UtilisateurViewSet, ApplicationViewSet, SexViewSet, ContractViewSet, PermissionViewSet
from rest_framework.authtoken.views import obtain_auth_token
from api.serializers import UtilisateurSerializer
from rest_framework.generics import RetrieveAPIView

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'advertisements', AdvertisementViewSet)
router.register(r'utilisateurs', UtilisateurViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'unregisters', UnregisterViewSet)
router.register(r'sex', SexViewSet)
router.register(r'contract', ContractViewSet)
router.register(r'permission', PermissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
    path('utilisateurs/auth_token/<str:auth_token>/', UtilisateurViewSet.as_view({'get': 'retrieve'})),
]