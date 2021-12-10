from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    """
    Custom user model 
    """
    image = models.ImageField(blank=True,null=True,default='default.jpg') # Image of the user
    shared_with = models.ManyToManyField('Notes',blank=True) # Connection with the table notes
    
    def get_own_notes(self):
        """ Returns all the notes owned by this user

        Returns:
            [QuerySet]: [Notes with foreign connection to this user]
        """
        return self.notes_set.all()
    
class Notes(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True,editable=False)
    last_modified = models.DateTimeField(auto_now=True)
    favourite = models.BooleanField(default=False)
    global_file = models.BooleanField(default=False)
    content = models.TextField(default=" ")
    
    # List of styling property in the form f"style_{componentName}_{JS_style_property_name}"
    style_screen_backgroundColor = models.CharField(max_length=8,default='#ffc7c7')
    style_screen_paddingTop = models.CharField(max_length=8,default='20px')
    
    style_box_backgroundColor = models.CharField(max_length=8,default='#80ffd4')
    style_box_maxWidth = models.CharField(max_length=8,default='200px')
    style_box_padding = models.CharField(max_length=8,default='10px')
    style_box_borderWidth = models.CharField(max_length=8,default='5px')
    style_box_borderColor = models.CharField(max_length=8,default='#008066')
    style_box_borderTopLeftRadius = models.CharField(max_length=8,default='20px')
    style_box_borderTopRightRadius = models.CharField(max_length=8,default='20px')
    style_box_borderBottomLeftRadius = models.CharField(max_length=8,default='20px')
    style_box_borderBottomRightRadius = models.CharField(max_length=8,default='20px')

    style_line_backgroundColor = models.CharField(max_length=8,default='#80ffd4')
    style_line_width = models.CharField(max_length=8,default='10px')

    style_text_color = models.CharField(max_length=8,default='#121212')
    style_text_fontSize = models.CharField(max_length=8,default='25px')
    style_text_fontWeight = models.CharField(max_length=8,default='2px')
    
    def get_shared_user(self):
        """All the users with whom this notes is shared

        Returns:
            [list]: [username of the users with whom this notes is shared]
        """
        shared_user = []
        users = self.user_set.all()
        for user in users:
            shared_user.append(user.username)
            
        return shared_user
        
    def __str__(self):
        """String representation of notes"""
        return self.title
        


