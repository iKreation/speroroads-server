from math import radians, cos, sin, asin, sqrt
from pymongo import MongoClient
client = MongoClient('mongodb://moth.dec.uc.pt:27017')
db = client['speroroads']

# Haversine formula
#
# Sample usage:
# 	p1 = {"lat": 51.5136, "lng": -0.0983}
# 	p2 = {"lat": 51.4778, "lng": -0.0015}
# 	dist = haversine(p1, p2)

def update_route_length(route_id):
	result = { "success":False }
	route = db.levantamentos.find_one({"_id" : ObjectId(route_id)})
	if route != None:
		occurrences = route["occurrences"]
		for occ in occurrences:
			if occ["type"] == "path":
				occ["path_length"] = path_distance(occ["path"])
				print "len: "+str(occ["path_length"])

		result["success"] = True
		return result
	return result


def haversine(p1, p2):
	# radius of earth in kilometres
	radius = 6367 

	lng1, lat1 = p1["lng"], p1["lat"]
	lng2, lat2 = p2["lng"], p2["lat"]

	# convert decimal degrees do radians
	lng1, lat1, lng2, lat2 = map(radians, [lng1, lat1, lng2, lat2])

	dlng = lng2 - lng1
	dlat = lat2 - lat1

	a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
	c = 2 * asin(sqrt(a))

	distance = radius * c

	return distance


def path_distance(path):
	distance = 0
	last = None

	for point in path:
		if last != None:
			p1 = {"lat": last[0], "lng":last[0]}
			p2 = {"lat": point[0], "lng": point[0]}
			d = haversine(p1, p2)
			distance += d
			last = point
		else:
			last = point

	return distance


