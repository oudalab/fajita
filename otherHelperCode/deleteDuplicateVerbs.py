import pymongo
from pymongo import MongoClient
client=MongoClient()
client = MongoClient('portland.cs.ou.edu', portnumber)
db=client.lexisnexis
db.authenticate('user','password')
verbs=db.verbs

idList2=[]
duplist=[]
for item in verbs.find():
	idtest=item["id"]
	if(idtest in idList2):
		duplist.append(idtest)
		verbs.remove(item)
	else:
		idList2.append(idtest)
		continue
