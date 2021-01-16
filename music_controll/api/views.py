from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        print(code)
        if code:
            room = Room.objects.filter(code=code)
            if room:
                data = RoomSerializer(room[0]).data
                data['isHost'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'Room Not Found': 'Invalid Code'}, status.HTTP_404_NOT_FOUND)
        return Response({'Bad request': 'code not found in request'}, status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    print(5)
    lookup_url_kwarg = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup_url_kwarg)
        if code:
            room_exist = Room.objects.filter(code=code)
            if room_exist:
                room = room_exist[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)



class CreateView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        #print(request.data)
        if serializer.is_valid():
            guess_can_pause = serializer.data.get('guess_can_pause')
            vote_to_skip = serializer.data.get('vote_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guess_can_pause = guess_can_pause
                room.vote_to_skip = vote_to_skip
                room.save(update_fields=['guess_can_pause','vote_to_skip'])
                self.request.session['room_code'] = room.code
                print(6)
            else:
                room = Room(host=host, guess_can_pause=guess_can_pause, vote_to_skip=vote_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
        print(RoomSerializer(room).data)
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class UserRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(7)
        data = {
            'code': self.request.session['room_code']
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_res = Room.objects.filter(host=host_id)
            if room_res:
                room = room_res[0]
                room.delete()
        return Response({'message':'success'}, status=status.HTTP_200_OK)

class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guess_can_pause = serializer.data.get('guess_can_pause')
            vote_to_skip = serializer.data.get('vote_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
    
            if not queryset.exists():
                return Response({'msg':'Room Not Found'}, status=status.HTTP_400_BAD_REQUEST)
            room = queryset[0]
            if room.host != self.request.session.session_key:
                return Response({'msg':'You are not the host'}, status=status.HTTP_403_FORBIDDEN)
            room.guess_can_pause = guess_can_pause
            room.vote_to_skip = vote_to_skip
            room.save(update_fields=['guess_can_pause','vote_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response({'Bad Resquest':'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)





  
