from rest_framework import serializers
from .models import Notes
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from . import string_to_JSX



class NotesInfoSerializer(serializers.ModelSerializer):
    """This serializer just gives a brief description of a Note"""
    
    # A custom serializer field
    owner_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Notes
        # all the field we want to be returned
        fields = ['id','title','owner_name','created_on','last_modified','favourite','global_file']
        
    def get_owner_name(self,obj):
        """owner_name should contain name of the owner of the Note"""
        return obj.owner.username
    
class NotesDetailSerializer(serializers.ModelSerializer):
    """Detail description of the Note"""
    
    graph_content = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Notes
        fields = '__all__'
        extra_fields = ['graph_content']
        extra_kwargs={
            "owner":{"read_only":True}
        }
        
    def get_field_names(self, declared_fields, info):
        """Overriding get_field_names function to include the extra_fields in the list of fields
            **implementation taken from 
            https://stackoverflow.com/questions/38245414/django-rest-framework-how-to-include-all-fields-and-a-related-field-in-mo
            **
        """
        expanded_fields = super(NotesDetailSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields
        
    def get_graph_content(self,obj):
        """graph_content is the JSX string of user content"""
        return string_to_JSX.convert_to_JSX_string(obj.content)
        
class UserSerializer(serializers.ModelSerializer):
    """Serializer for User"""
    full_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','full_name','image']
        extra_kwargs = {
            'password':{
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }
        
    def get_full_name(self,obj):
        """full_name is combination of first and last name"""
        full_name = f"{obj.first_name} {obj.last_name}"
        return full_name        
                
class UserSerializerWithToken(serializers.ModelSerializer):
    """Same as UserSerializer but will have one additional field for JWT token """
    token = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','token','full_name','image']
        extra_kwargs = {
            'password':{
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }
        
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_full_name(self,obj):
        full_name = f"{obj.first_name} {obj.last_name}"
        return full_name