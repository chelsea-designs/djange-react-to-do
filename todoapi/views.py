from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer

from .models import Todo
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/todo-list/',
		'Add Todo':'/add-Todo/',
		'Edit Todo':'/edit-Todo/<int:pk>/',
		'Delete Todo':'/delete-Todo/<int:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def todoList(request):
	todos = Todo.objects.all().order_by('created_at')
	serializer = TodoSerializer(todos, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def addTodo(request):
	serializer = TodoSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['PATCH'])
def editTodo(request, pk):
	todo = Todo.objects.get(id=pk)
	serializer = TodoSerializer(instance=todo, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def deleteTodo(request, pk):
	todo = Todo.objects.get(id=pk)
	todo.delete()

	return Response('Item succsesfully delete!')


