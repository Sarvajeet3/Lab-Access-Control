from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

class Lab(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name



class Student(models.Model):
    registration = models.CharField(max_length=12)
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.registration

class AIModel(models.Model):
    path = models.FileField(upload_to='media/aimodels/')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.student.registration

class Authorities(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    authorities = models.CharField(max_length=512)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.student.registration + "(" + self.lab.name + ")"