from django.urls import path
from .views import RoomView, CreateView, GetRoom, JoinRoom, UserRoom, LeaveRoom, UpdateRoom

urlpatterns = [
    path('', RoomView.as_view()),
    path('create/',CreateView.as_view()),
    path('getroom/',GetRoom.as_view()),
    path('joinroom/',JoinRoom.as_view()),
    path('userroom/',UserRoom.as_view()),
    path('leaveroom/',LeaveRoom.as_view()),
    path('updateroom/',UpdateRoom.as_view())
]