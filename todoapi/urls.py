from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('todo-list/', views.todoList, name="todo-list"),
	path('add-todo/', views.addTodo, name="add-todo"),

	path('edit-todo/<int:pk>/', views.editTodo, name="edit-todo"),
	path('delete-todo/<int:pk>/', views.deleteTodo, name="delete-todo"),
]