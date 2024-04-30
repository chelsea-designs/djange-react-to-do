from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=100)
    is_complete = models.BooleanField(default=False, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    def __str__(self):
        return self.title