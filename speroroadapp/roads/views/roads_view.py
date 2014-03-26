from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from pymongo import MongoClient
import simplejson as json

client = MongoClient('mongodb://moth.dec.uc.pt:27017')
db = client['speroroads']


def index(request):
	return render(request,'index.html')

@csrf_exempt
def rest(request, ident):
	if request.method == 'GET':
		if int(ident) == 0:
			return roads_list(request)
		else:
			return get(request,ident)
	elif request.method == 'POST':
		if int(ident) == 0:
			return create(request)

	else:
		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Invalid request method.'
								}), content_type='json')


def roads_list(request):

	
	lista=[]

	for l in db.levantamentos.find():
		
		new_obj = {}

		
		if l['type'] == 'single':

			new_obj['latitude'] = l['position']['coords']['latitude']
			new_obj['longitude'] = l['position']['coords']['longitude']
			new_obj['type'] = l['type']
			new_obj['createddate'] = l['createddate']
			lista.append(new_obj)

		else:

			new_obj['type'] = l['type']
			new_obj['createddate'] = l['createddate']
			new_obj['path'] = l['path']
			lista.append(new_obj)

		


	return HttpResponse(json.dumps(lista), content_type='json')


@csrf_exempt
def create(request):
	# grant it's a post
	# read the POSTed data

	if request.method == 'POST':

		data = request.POST['levantamento']

		levantamento = json.loads(data)

		new_obj={}

		new_obj['latitude'] = levantamento['position']['coords']['latitude']
		new_obj['longitude'] = levantamento['position']['coords']['longitude']
		new_obj['type'] = levantamento['type']
		new_obj['createddate'] = levantamento['createddate']


		try:
			db.levantamentos.insert(new_obj)

			return HttpResponse(json.dumps({
									'success': True, 
									'msg': 'Success'
								}), content_type='json')
		except:
			return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'An error has occurred.'
								}), content_type='json')
	else:
		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Invalid request method.'
								}), content_type='json')

