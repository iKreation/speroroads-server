from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from pymongo import MongoClient
import simplejson as json
import csv
from django.utils.encoding import smart_str

import time
from random import randrange

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
			return update(request, ident)

	elif request.method == 'DELETE':
		return delete(request, ident)

	else:
		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Invalid request method.'
								}), content_type='json')


def roads_list(request):

	
	lista=[]

	for l in db.levantamentos.find():
		
		new_obj = {}

		if l.has_key("id"):
			new_obj['id'] = l['id']
		if l.has_key("name"):
			new_obj['name'] = l['name']
		if l.has_key("subRoutes"):
			new_obj['subRoutes'] = l['subRoutes']
		if l.has_key("occurrences"):
			new_obj['occurrences'] = l['occurrences']

		
		# if l['type'] == 'single':


		# 	new_obj['id'] = l['id']
		# 	new_obj['prob_id'] = l['prob_id']
		# 	new_obj['latitude'] = l['position']['coords']['latitude']
		# 	new_obj['longitude'] = l['position']['coords']['longitude']
		# 	new_obj['type'] = l['type']
		# 	new_obj['createddate'] = l['createddate']
		# 	lista.append(new_obj)

		# else:

		# 	new_obj['id'] = l['id']
		# 	new_obj['prob_id'] = l['prob_id']
		# 	new_obj['type'] = l['type']
		# 	new_obj['createddate'] = l['createddate']
		# 	new_obj['path'] = l['path']
		# 	lista.append(new_obj)

		lista.append(new_obj)

		


	return HttpResponse(json.dumps(lista), content_type='json')


@csrf_exempt
def create(request):
	# grant it's a post
	# read the POSTed data

	if request.method == 'POST':

		data = request.POST['route']

		route = json.loads(data)

		lista=[]

		for l in route:
			
			new_obj={}
			#new_obj['id'] = int(round(time.time() * 1000))
			new_obj['id'] = l['id']
			new_obj['name'] = l['name']


			#for o in l['occurrences']:

				#print o


				#occ_id = {}
				#occ_id['id'] = int(round(time.time() * 1000)+randrange(1,1000000)+randrange(1000000,2000000))
				#o['id'] = occ_id['id']



			new_obj['subRoutes'] = l['subRoutes']
			new_obj['occurrences'] = l['occurrences']
			lista.append(new_obj)




		try:
			db.levantamentos.insert(lista)

			return HttpResponse(json.dumps({
									'success': True, 
									'msg': 'Success'
								}), content_type='json')
		except Exception as e:
			print "deu bode"
			print str(e)
			return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'An error has occurred.'
								}), content_type='json')
	else:
		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Invalid request method.'
								}), content_type='json')

def export_csv(request):
    
    #data = request.POST['levantamento']

    #data = [{'type' : 'single' , 'position' : {'coords' : {'latitude' : '99' , 'longitude' : '9999'}} , 'createddate' : 'laparamarco'}]
    


    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=export.csv'
    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8'))

    writer.writerow([

    	smart_str(u"ID"),
    	#smart_str(u"Type"),
    	#smart_str(u"Latitude"),
    	#smart_str(u"Longitude"),
    	#smart_str(u"Path"),
    	#smart_str(u"Created Date"),
    	smart_str(u"Name"),
    	smart_str(u"subRoutes"),
    	smart_str(u"occurrences"),

    ])
    


    for l in db.levantamentos.find():

    	new_obj = {}

    	new_obj['id'] = l['id']
    	new_obj['name'] = l['name']



    	for o in l['occurrences']:
		
			#new_obj = {}

			
			if o['type'] == 'single':

				new_obj['id'] = o['id']
				new_obj['latitude'] = o['position']['coords']['latitude']
				new_obj['longitude'] = o['position']['coords']['longitude']
				new_obj['type'] = o['type']
				new_obj['createddate'] = o['createddate']

				writer.writerow([
					smart_str(new_obj['id']),
	        		smart_str(new_obj['type']),
	        		smart_str(new_obj['latitude']),
	        		smart_str(new_obj['longitude']),
	        		smart_str(''),
	        		smart_str(new_obj['createddate']),
	    		])

			else:
				new_obj['id'] = o['id']
				new_obj['type'] = o['type']
				new_obj['createddate'] = o['createddate']
				new_obj['path'] = o['path']

				writer.writerow([
					smart_str(new_obj['id']),
					smart_str(new_obj['type']),
					smart_str(''),
					smart_str(''),
					smart_str(new_obj['path']),
	        		smart_str(new_obj['createddate']),
	    		])

    return response

def delete(request, ident):
	try:

		db.levantamentos.remove({"id" : int(ident) })

		return HttpResponse(json.dumps({'success': True}), 
	 				content_type="json")
	except:
 		return HttpResponse(json.dumps({
								'success': False, 
								'msg': 'Does not exist.'
							}), content_type='json')


@csrf_exempt
def update(request, ident):
	# find the object and check if exists
 	# update the object

 	if request.method == 'POST':

 		data = request.POST['route']

		route = json.loads(data)

		#for l in route:

 		
		#keeps the same id
		id = int(ident)
 		name = route['name']
		subRoutes = route['subRoutes']
		occurrences = route['occurrences']


	 	try:

	 		db.levantamentos.update(
	 			
	 			{"id" : int(ident)},
	 			{
	 				"id" : id,
		 			"name" : name,
		 			"subRoutes" : subRoutes,
		 			"occurrences" : occurrences
		 		},

	 		)


	 		return HttpResponse(json.dumps({'success': True}), 
	 				content_type="json")
	 	except:
	 		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Does not exist.'
								}), content_type='json')













