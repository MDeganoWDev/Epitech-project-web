'''
Here are custom permissions classes using our permission field attribute from the Utilisateur.
Use them in your views and get a boolean value if the user has the permission or not.
Including ReadOnly in the permission_classes list will allow all users to access the view using safe methods (GET, HEAD, OPTIONS).
'''

from rest_framework import permissions

class PermissionRoles:
    SEARCH = 'worker'
    OFFER = 'company'
    ADMIN = 'admin'

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class HasAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user and request.user.permission.name == PermissionRoles.ADMIN
        return False

class HasOfferingPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            user_permission = request.user.permission.name if request.user else None
            return user_permission in [PermissionRoles.ADMIN, PermissionRoles.OFFER]
        return False

class HasSearchingPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            user_permission = request.user.permission.name if request.user else None
            return user_permission in [PermissionRoles.ADMIN, PermissionRoles.SEARCH]
        return False

class HasUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            user_permission = request.user.permission.name if request.user else None
            return user_permission in [PermissionRoles.ADMIN, PermissionRoles.SEARCH]
        return False