from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from pymongo import MongoClient
import simplejson as json
import time

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


			new_obj['id'] = l['id']
			new_obj['prob_id'] = l['prob_id']
			new_obj['latitude'] = l['position']['coords']['latitude']
			new_obj['longitude'] = l['position']['coords']['longitude']
			new_obj['type'] = l['type']
			new_obj['createddate'] = l['createddate']
			lista.append(new_obj)

		else:

			new_obj['id'] = l['id']
			new_obj['prob_id'] = l['prob_id']
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

		lista=[]

		for l in levantamento:
			new_obj={}
			new_obj['id'] = int(round(time.time() * 1000))
			new_obj['prob_id'] = l['prob_id']
			new_obj['position'] = l['position']
			#new_obj['path'] = l['path']
			new_obj['createddate'] = l['createddate']
			new_obj['type'] = l['type']
			lista.append(new_obj)



		try:
			db.levantamentos.insert(lista)

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

