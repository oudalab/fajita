from pymongo import MongoClient
import time
import pickle
client=MongoClient()
client=MongoClient('mongodb://hanover.cs.ou.edu:29017/')
db=client['eventData']
sen=db.sentence_arabic

start_time=time.time()
dic={}
count=0
totalEntity=0
for i in sen.find():
    count=count+1;
    if(count%1000==0):
        print(str(count),"finished processing")
    id=i["_id"]
    actors=i["actor"]
    for actor in actors:
        totalEntity=totalEntity+1
        if not actor in dic:
            dic[actor]=[]
        dic[actor].append(id)
print(str(count),"total processed sentences")

try:
    with open("arabicEntity.data",'wb') as f:
        pickle.dump(dic,f,pickle.HIGHEST_PROTOCOL)
except Exception as e:
        print(e)
timepassed=time.time()-start_time
print("time used in seconds ",str(timepassed))
print("total entity found ",str(totalEntity))