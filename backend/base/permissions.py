from rest_framework import permissions
from rest_framework import permissions

class NotesPermissions(permissions.BasePermission):
    """Permission class for a Note"""
    def has_permission(self, request, view):
        """All the ip addresses have permission"""
        return True
    
    def has_object_permission(self, request, view, obj):
        """Permissions for a specific Note"""
        
        if request.method in permissions.SAFE_METHODS:
            # If a Note is global and user is not modifying data grant them permission
            if obj.global_file:
                return True
            
            # Grant the shared users permission to view the Notes
            elif request.user.is_authenticated and request.user.username in obj.get_shared_user():
                return True
        
        # The owner of the Note has all the permissions for that note
        return obj.owner == request.user 
    
class UserPermissions(permissions.BasePermission):
    """Permission class for user"""
    def has_permission(self, request, view):
        """All the ip addresses have permission"""
        return True
    
    def has_object_permission(self, request, view, obj):
        """Only user can view/edit their data"""
        return obj == request.user 