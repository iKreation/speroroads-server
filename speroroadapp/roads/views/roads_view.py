from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from pymongo import MongoClient
import simplejson as json
import csv
from django.utils.encoding import smart_str
from roads.models import *
import random
import requests
import simplejson
import time
from bson.objectid import ObjectId
from random import randrange

from roads.helpers.roads import haversine

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

@csrf_exempt
def upload(request, ident):
	if request.method == 'POST':
		route_id = request.POST['route_id']
		occ_id = request.POST['occ_id']

		if request.FILES:
			f = TempFile(temp=request.FILES['file'])
			f.save()
		
		route = db.levantamentos.find_one({'_id':ObjectId(route_id)})
		
		if route != None:
			occs = route["occurrences"]
			for occ in occs:
				if str(occ["id"]) == occ_id:
					occ["photos"].append("/media/"+f.temp.url)
					break

			subRoutes = route["subRoutes"]
			options = route["options"]
			name = route["name"]
			route_fake_id = route["id"]
			
			db.levantamentos.update({
				"_id": ObjectId(route_id)
				},
				{
					"_id": ObjectId(route_id),
					"occurrences": occs,
					"subRoutes": subRoutes,
					"name": name,
					"options": options,
					"id": route_fake_id
				})
			return HttpResponse(simplejson.dumps({'success': True, 'path':"/media/"+f.temp.url, }))
		else:
			return HttpResponse(simplejson.dumps({'success': False, "msg":"Route id unknown	."}), content_type="json")
	else:
		return HttpResponse(simplejson.dumps({'success': False}), content_type="json")

def roads_list(request):

	lista = []

	for l in db.levantamentos.find():
		
		new_obj = {}
		if l.has_key("_id"):
			new_obj["_id"] = str(l["_id"])
		if l.has_key("id"):
			new_obj['id'] = l['id']
		if l.has_key("name"):
			new_obj['name'] = l['name']
		if l.has_key("subRoutes"):
			new_obj['subRoutes'] = l['subRoutes']
		if l.has_key("occurrences"):
			new_obj['occurrences'] = l['occurrences']
		if l.has_key("options"):
			new_obj['options'] = l["options"]
		
		lista.append(new_obj)

	return HttpResponse(json.dumps(lista), content_type='json')


@csrf_exempt
def create(request):
	if request.method == 'POST':

		data = request.POST['route']
		route = json.loads(data)

		new_obj = {}
		new_obj['id'] = int(round(time.time() * 1000))
		new_obj['name'] = route['name']
		new_obj['options'] = route['options']
		new_obj['subRoutes'] = route['subRoutes']
		new_obj['occurrences'] = route['occurrences']

		for occ in new_obj['occurrences']:
			if occ["type"] == "path":
				occ["path_length"] = path_distance(occ["path"])
		
		try:
			route_id = db.levantamentos.insert(new_obj)
			return HttpResponse(json.dumps({
									'success': True, 
									'msg': 'Successfuly added new route',
									'route_id': str(route_id)
								}), content_type='json')
		except Exception as e:
			return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'An error has occurred.'
								}), content_type='json')
	else:
		return HttpResponse(json.dumps({
									'success': False, 
									'msg': 'Invalid request method.'
								}), content_type='json')

def export_csv(request, ident):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename=export.csv'
	writer = csv.writer(response, csv.excel)
	response.write(u'\ufeff'.encode('utf8'))

	routes = db.levantamentos.find_one({"_id" : ObjectId(ident)})
	print routes
	route = routes

	writer.writerow([
    	smart_str(u"ID"),
    	smart_str(u"Name")
    ])

	new_obj = {}
	new_obj['id'] = route['id']
	new_obj['name'] = route['name']

	writer.writerow([
		smart_str(new_obj['id']),
		smart_str(new_obj['name'])
	]) 


	writer.writerow([
		smart_str(u"Name"),
		smart_str(u"Created Date"),
		smart_str(u"Instance ID"),
		smart_str(u"path"),
		smart_str(u"Timestamp"),
		smart_str(u"Coords"),
		smart_str(u"Type"),
		smart_str(u"ID")
	])

	for o in route['occurrences']:
		if o['type'] == "single":
			new_obj['name'] = o['name']
			new_obj['createddate'] = o['createddate']
			new_obj['instance_id'] = o['instance_id']
			new_obj['path'] = o['path']
			if o['position'].has_key('timestamp'):
				new_obj['timestamp'] = o['position']['timestamp']
			else:
				new_obj['timestamp'] = "null"
			if o['position'].has_key('coords'):
				new_obj['coords'] = o['position']['coords']
			else:
				new_obj['coords'] = "null"
			if o.has_key('type'):
				new_obj['type'] = o['type']
			else:
				new_obj['type'] = "null"
			if o.has_key('id'):
				new_obj['id'] = o['id']
			else:
				new_obj['id'] = "null"

			writer.writerow([
						smart_str(new_obj['name']),
		        		smart_str(new_obj['createddate']),
		        		smart_str(new_obj['instance_id']),
		        		smart_str(new_obj['path']),
		        		smart_str(new_obj['timestamp']),
		        		smart_str(str(new_obj['coords'])),
		        		smart_str(new_obj['type']),
		        		smart_str(new_obj['id'])
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













