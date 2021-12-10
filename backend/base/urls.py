from django.urls import path
from . import views

urlpatterns = [
    path('',views.get_routes,name="routes"),
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('notes/',views.get_notes,name="notes"),
    path('notes/create',views.create_notes,name="notes-create"),
    path('notes/<slug:pk>',views.NotesAPIView.as_view(),name="notes-specific"),
    path('users/',views.get_users,name="users"),
    path('users/create',views.create_user,name="users-create"),
    path('users/user',views.UserAPIView.as_view(),name="users-specific"),
    path('users/user/upload-image',views.upload_image,name="users-upload-img")
]