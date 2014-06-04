from django.db import models
from django.conf import settings
# Create your models here.
import os
from uuid import uuid4

def path_and_rename(path):
	def wrapper(instance, filename):
		ext = filename.split('.')[-1]
		if instance.pk:
			filename = '{}.{}'.format(instance.pk, ext)
		else:
			filename = '{}.{}'.format(uuid4().hex, ext)
		return os.path.join(path, filename)
	return wrapper

class TempFile(models.Model):
    temp = models.FileField(upload_to=path_and_rename("uploads"))
