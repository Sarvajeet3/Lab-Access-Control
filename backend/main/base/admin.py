from django.contrib import admin
from .models import Lab, Student, AIModel, Authorities

# Register your models here.
admin.site.register(Lab)
admin.site.register(Student)
admin.site.register(AIModel)
admin.site.register(Authorities)