from rest_framework.authtoken.models import Token
from rest_framework import serializers
from .models import Company, Permission, Contract, Sex, Advertisement, Unregister, Utilisateur, Application, LANGUAGE_CHOICES, STYLE_CHOICES

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

class UnregisterSerializer(serializers.ModelSerializer):
    sex = SexSerializer()
    class Meta:
        model = Unregister
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    contract = ContractSerializer()
    class Meta:
        model = Advertisement
        fields = '__all__'

class UtilisateurSerializer(serializers.ModelSerializer):
    sex = SexSerializer()
    permission = PermissionSerializer()
    token = serializers.SerializerMethodField()
    class Meta:
        model = Utilisateur
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Utilisateur(**validated_data)
        if password:
            user.set_password(password) # Set the password and hash it
        user.save()
        return user

class ApplicationSerializer(serializers.ModelSerializer):
    user = UtilisateurSerializer()
    unregisterUser = UnregisterSerializer()
    advertisement = AdvertisementSerializer()
    class Meta:
        model = Application
        fields = '__all__'
