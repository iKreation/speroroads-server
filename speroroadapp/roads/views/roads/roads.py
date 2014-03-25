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



@csrf_exempt
def create(request):
	# grant it's a post
	# read the POSTed data
	# create the object to send to the model

	if request.method == 'POST':
		category = request.POST['category']
		title = request.POST['title']
		description = request.POST['description']
		coordinate = request.POST['coordinate']

		try:
			Places.objects.create(user_id = 1,
								  category_id = category,
								  title = title, 
								  description = description, 
								  coordinate = coordinate)

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




		
