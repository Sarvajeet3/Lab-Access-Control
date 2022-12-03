from rest_framework import serializers
from base.models import Item, Student, Authorities, Lab


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class AuthoritiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authorities
        fields = "__all__"


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = "__all__"