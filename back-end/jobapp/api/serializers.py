from rest_framework.authtoken.models import Token
from rest_framework import serializers
from .models import Company, Permission, Contract, Sex, Advertisement, Utilisateur, Application, Work, LANGUAGE_CHOICES, STYLE_CHOICES

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class SexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sex
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    contract = ContractSerializer()
    class Meta:
        model = Advertisement
        fields = '__all__'

class UtilisateurSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = Utilisateur
        fields = '__all__'

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'
