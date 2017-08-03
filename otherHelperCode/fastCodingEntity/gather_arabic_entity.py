
from pymongo import MongoClient
import pickle
import time
client=MongoClient()
client=MongoClient('mongodb://hanover.cs.ou.edu:29017/')
db=client['eventData']
sen=db.sentence_arabic

start_time=time.time()
dic={}
count=0
for i in sen.find():
    count=count+1;
    if(count%1000==0):
        print(str(count),"finished processing")
    #if(count<limit):
        id=i["_id"]
        actors=i["actor"]
        for actor in actors:
            if not actor in dic:
                dic[actor]=[]
            dic[actor].append(id)
    #else:
        #break
print(str(count),"total processed")

try:
    with open("arabicEntity.data",'wb') as f:
        pickle.dump(dic,f,pickle.HIGHEST_PROTOCOL)
except Exception as e:
    print(e)
    pass
timepassed=time.time()-start_time
print("time used in seconds ",str(timepassed))

# with open("test1","rb") as f:
#     hey=pickle.load(f)
