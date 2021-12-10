from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

from .models import Notes
from .models import User
from .serializers import NotesInfoSerializer
from .serializers import NotesDetailSerializer
from .serializers import UserSerializerWithToken
from .serializers import UserSerializer
from .permissions import NotesPermissions
from .permissions import UserPermissions
from . import front2back

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Creating our custom serializer for Token"""
    def validate(self,attrs):
        """Overriding the validate function
        This function returns the data that is returned when user is authenticated
        """
        data = super().validate(attrs)
        
        # Serializing the current User
        serializer = UserSerializerWithToken(self.user).data
        
        # Populating the data dictionary with data returned from serializer
        for k,v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    """Creating our own custom view to use our serializer"""
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['GET'])
def get_routes(request):
    """View to display all the endpoints"""
    routes = {
        "login" : "To authenticate a user",
        "notes/" : "All the notes corresponding to user",
        "notes/create" : "Create new Note",
        "note/:id": "Specific note from id",
        "users/" : "All the user in the database",
        "users/create" : "Create a new user",
        "users/user":"Specific user"
    }
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    """Authenticated users can access the list of Users"""
    
    # Get all the users in database
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    """APIView to create User"""
    data = request.data
    
    # Try creating the user with username and password
    try:
        user = User.objects.create(
            username = data['username'],
            password = make_password(data['password'])
        )
    except:
        message = {'detail':"User with this username already exists"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    # If first name and last name provided then update the user
    user.first_name = data.get('first_name','')
    user.last_name = data.get('last_name','')
    user.save()
    
    # Once the user has been created return the information of user with token
    serializer = UserSerializerWithToken(user)
    return Response(serializer.data)

class UserAPIView(APIView):
    permission_classes = [IsAuthenticated,UserPermissions]
    def get(self,request):
        """for GET http request on this view"""
        
        # get the user with the same id
        user = User.objects.get(id=request.user.id)
        
        # check for permission on the user
        self.check_object_permissions(request, user)
        
        # return the serialized data
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self,request):
        """For PUT http request on this view"""
        
        # get data from the request
        data = request.data
        
        # get user with the sameid
        user = User.objects.get(id=request.user.id)
        
        # check for permission on the user
        self.check_object_permissions(request, user)
        
        user.username = data["username"]
        
        # If first and last name are provided then update it
        # else use the previous first and last name
        user.first_name = data.get('first_name',user.first_name)
        user.last_name = data.get('last_name',user.last_name)
        
        # If password has been provided then update the password
        if data.get('password'):
            user.password = make_password(data['password'])
        user.save()
        
        # return the user data with token
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    
    def delete(self,request):
        """for http DELETE request on this view"""
        
        # get the user with the same id and delete it
        user = User.objects.get(id=request.user.id)
        
        # check for permission on the user
        self.check_object_permissions(request, user)
        
        user.delete()
        return Response({"Message":"Deleted Successfully"},status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    """View to deal with updating user image"""
    
    # get the user with the same id
    user = User.objects.get(id=request.user.id)
        
    # update the image of the user
    user.image = request.FILES.get('image')
    user.save()
    
    # return the new serialized data with token
    serializer = UserSerializerWithToken(user)
    return Response(serializer.data)
    
@api_view(['GET'])
def get_notes(request):
    """APIView to get all the notes related to a user"""
    
    # get the user from the request
    user = request.user
    
    # get all the global notes from the database and serialize it
    global_notes = Notes.objects.filter(global_file=True)
    global_data = NotesInfoSerializer(global_notes,many=True).data
    
    # if user is authenticated get notes shared with him and his own notes
    if user.is_authenticated:
        shared_notes = user.shared_with
        own_notes = user.get_own_notes()
        shared_data = NotesInfoSerializer(shared_notes,many=True).data
        own_data = NotesInfoSerializer(own_notes,many=True).data
        
    # if user is not authenticated set shared notes and own to empty list
    else:
        shared_data = []
        own_data = []
        
    # create a dictionary with of all the notes and return it
    data = {"own":own_data,"shared":shared_data,"global":global_data}
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_notes(request):
    """APIView to create notes"""
    
    # First create a note with minimal information
    note = Notes.objects.create(
        owner = request.user,
        title = "Untitled",
        content =" "
    )
    
    # Get data from the request
    data = request.data
    
    # If data has title then this means that user is creating a new note by 
    # creating a copy. So update the created note title with copy of + the title
    if data.get("title"):
        data["title"] = "Copy of "+data["title"]
        
    # Convert data in the form in which it can be easily stored in database
    backend_friendly = front2back.convert_data_to_backend_friendly(data)
    
    # Update the created note with the serialized data
    serializer = NotesDetailSerializer(note,data=backend_friendly,partial=True)
    if serializer.is_valid():
        serializer.save()
        
        # Convert the note in the form we want it in frontend and send it
        front_friendly_data = front2back.convert_data_to_frontend_friendly(serializer.data)
        front_friendly_data["shared_with"] = note.get_shared_user()
        return Response(front_friendly_data)
    
    # If serializer is not valid than return error code
    message = {'detail':'Some error occured check field names'}
    return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
class NotesAPIView(APIView):
    permission_classes = [NotesPermissions]
    def get(self,request,pk):
        """For GET request on this view"""
        
        # try to get the notes with id
        # if note doesn't exist return error detail
        try:
            note = Notes.objects.get(id=pk)
        except:
            message = {'detail':"Notes does not exist"}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
        
        # check for permission on the note
        self.check_object_permissions(request, note)
        
        # serialize the note and the convert the data in the form we want to send
        serializer = NotesDetailSerializer(note,many=False)
        front_friendly_data = front2back.convert_data_to_frontend_friendly(serializer.data)
        
        # add shared user to the data and then return it
        front_friendly_data["shared_with"] = note.get_shared_user()
        return Response(front_friendly_data)
    
    def put(self,request,pk):
        """For PUT request on this APIView"""
        
        # Get the note with that specific id
        note = Notes.objects.get(id=pk)
        
        # Check if this user has permission on this note
        self.check_object_permissions(request, note)
        
        # get data from request
        data = request.data
        
        # get the list of previous shared user of the notes from note
        old_shared_user = note.get_shared_user()
        
        # get list of current shared user of the notes from data
        new_shared_user = data.get("shared_with",[])
        
        # Now go to all the previous shared users and removes this note from their shared_with
        # and add this note to the shared_with field of new shared users
        for shared_user in old_shared_user:
            user = User.objects.get(username=shared_user)
            user.shared_with.remove(note)
        for shared_user in new_shared_user:
            user = User.objects.get(username=shared_user)
            user.shared_with.add(note)
            
        # Convert the data to backend friendly and the update the database
        # once updated return the new data in the form we want in frontend 
        # by calling self.get method
        backend_friendly = front2back.convert_data_to_backend_friendly(data)
        serializer = NotesDetailSerializer(note,data=backend_friendly)
        if serializer.is_valid():
            serializer.save()
            return self.get(request=request,pk=pk)
        message = {'detail':'Some error occured check field names'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request,pk):
        """For http request PATCH on this view"""
        
        # get the note with the id
        note = Notes.objects.get(id=pk)
        
        # check for permission of user on this note
        self.check_object_permissions(request, note)
        
        # get data from the request
        data = request.data
        
        # get old and new shared user from note and data respectively
        old_shared_user = note.get_shared_user()
        new_shared_user = data.get("shared_with")
        
        # if request has new list for shared_user
        # take this note off the shared_with of old_shared_user
        # add this note to shared_with of new shared user
        if new_shared_user!=None:
            for shared_user in old_shared_user:
                user = User.objects.get(username=shared_user)
                user.shared_with.remove(note)
            for shared_user in new_shared_user:
                user = User.objects.get(username=shared_user)
                user.shared_with.add(note)
                
        # convert the data to the form it can be used by serializer
        # update the database if the data is valid
        # return new_data of note by calling self.get method
        backend_friendly = front2back.convert_data_to_backend_friendly(data)
        serializer = NotesDetailSerializer(note,data=backend_friendly,partial=True)
        if serializer.is_valid():
            serializer.save()
            return self.get(request=request,pk=pk)
        message = {'detail':'Some error occured check field names'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        """for http DELETE request on this view"""
        
        # get the note you want to delete
        note = Notes.objects.get(id=pk)
        
        # check permission for user on this note and if permitted delete the note
        self.check_object_permissions(request, note)
        note.delete()
        return Response({"Message":"Deleted Successfully"},status=status.HTTP_200_OK)
