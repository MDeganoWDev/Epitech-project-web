from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import CompanyViewSet, AdvertisementViewSet, UtilisateurViewSet, ApplicationViewSet, WorkViewSet, SexViewSet, ContractViewSet, PermissionViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'advertisements', AdvertisementViewSet)
router.register(r'utilisateurs', UtilisateurViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'work', WorkViewSet)
router.register(r'sex', SexViewSet)
router.register(r'contract', ContractViewSet)
router.register(r'permission', PermissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
