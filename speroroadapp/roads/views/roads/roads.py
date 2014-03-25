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

