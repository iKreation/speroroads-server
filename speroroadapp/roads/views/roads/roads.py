from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from pymongo import MongoClient
client = MongoClient('mongodb://moth.dec.uc.pt:27017')
db = client['speroroads']

@csrf_exempt
def rest(request, ident):
	if request.method = 'GET':
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


	#query mongodb....
	

	lista=[]

	for l in db.levantamentos.find():
		
		new_obj = {}

		levantamentos[0]['position']['coords']['latitude']
