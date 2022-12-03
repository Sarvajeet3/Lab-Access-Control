from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage, default_storage

import os
import cv2
import threading

from base.models import Item, AIModel, Student, Authorities, Lab
from .serializers import ItemSerializer

face_classifier = cv2.CascadeClassifier(os.path.abspath('./media/haarcascade_frontalface_default.xml'))

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getLabs(request):
    labs = Lab.objects.all()
    serializer = ItemSerializer(labs, many=True)
    return Response(serializer.data)


def face_detector(img, size = 0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    if faces == ():
        return img,[]

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y), (x+w, y+h), (0,255,255), 2)
        roi = img[y: y+h, x: x+w]
        roi = cv2.resize(roi, (200,200))
    return img, roi

def deleteImage(path):
    if default_storage.exists(path):
        default_storage.delete(path)

@api_view(['POST'])
def scan(request):
    models = AIModel.objects.all()
    lab = request.data['lab']
    for model in models:
        recognizer = cv2.face.LBPHFaceRecognizer_create()

        recognizer.read(model.path.path)

        fileObj = request.FILES['image']

        fs = FileSystemStorage()
        filePathName = fs.save(fileObj.name, fileObj)
        filePathName = fs.url(filePathName)
        testimage = '.'+filePathName
        imagepath = os.path.abspath(testimage)
        frame = cv2.imread(imagepath)
        deleteImage(imagepath)
        image, face = face_detector(frame)

        try:
            face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
            result = recognizer.predict(face)

            if result[1] < 500:
                confidence = int(100 * (1 - (result[1]) / 300))
            print(model.student.registration)
            if confidence > 80:
                res = {
                    'status' : 'success',
                    'name': model.student.name,
                    'registration' : model.student.registration,
                    'authorities' : Authorities.objects.get(lab=Lab.objects.get(name=lab), student=model.student).authorities
                }
                return Response(res)
                
        except Exception as e:
            print(e)
            return Response({'status': 'error', 'error': 'FACENOTFOUND'})

    return Response({'status': 'error', 'error': 'NORECORDFOUND'})