from rest_framework.authtoken.models import Token
from rest_framework import serializers
from .models import Company, Permission, Contract, Sex, Advertisement, Unregister, Utilisateur, Application, LANGUAGE_CHOICES, STYLE_CHOICES

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
    cv = serializers.FileField(required=False)
    sex = SexSerializer(read_only=True)
    sex_id = serializers.PrimaryKeyRelatedField(queryset=Sex.objects.all(), source='sex', write_only=True)
    class Meta:
        model = Unregister
        fields = '__all__'


class UtilisateurSerializer(serializers.ModelSerializer):
    cv = serializers.FileField(required=False)
    sex = SexSerializer(read_only=True)
    sex_id = serializers.PrimaryKeyRelatedField(queryset=Sex.objects.all(), source='sex', write_only=True)
    permission = PermissionSerializer(read_only=True)
    permission_id = serializers.PrimaryKeyRelatedField(queryset=Permission.objects.all(), source='permission', write_only=True)
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

class CompanySerializer(serializers.ModelSerializer):
    user = UtilisateurSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=Utilisateur.objects.all(), source='user', write_only=True)
    class Meta:
        model = Company
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), source='company', write_only=True)
    contract = ContractSerializer(read_only=True)
    contract_id = serializers.PrimaryKeyRelatedField(queryset=Contract.objects.all(), source='contract', write_only=True)
    class Meta:
        model = Advertisement
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    user = UtilisateurSerializer(read_only=True, required=False)
    user_id = serializers.PrimaryKeyRelatedField(queryset=Utilisateur.objects.all(), source='user', write_only=True, required=False)
    unregisterUser = UnregisterSerializer(read_only=True, required=False)
    unregisterUser_id = serializers.PrimaryKeyRelatedField(queryset=Unregister.objects.all(), source='unregisterUser', write_only=True, required=False)
    advertisement = AdvertisementSerializer(read_only=True)
    advertisement_id = serializers.PrimaryKeyRelatedField(queryset=Advertisement.objects.all(), source='advertisement', write_only=True)
    class Meta:
        model = Application
        fields = '__all__'