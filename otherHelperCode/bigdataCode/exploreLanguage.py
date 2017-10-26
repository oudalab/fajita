from pymongo import MongoClient
import pymongo
import pickle
import logging
import time
import logging.config

start_time = time.time()
client1 =MongoClient('mongodb://user:passcode@portland.cs.ou.edu:port',maxPoolSize=5)
db1 = client1['lexisnexis']
largestory = db1.disk_stories_full
logging.basicConfig(filename='logging.python')
dic = {}
count = 0
dic["errorout"]=0;
dic["goodrecord"]=1;

sleep = 1
done = False

while not done:
        try:
                    #skip whatever is already loopthorugh
                            for i in largestory.find().skip(count):
                                            try:
                                                                count = count + 1
                                                                                if count % 100000 == 0:
                                                                                                        print (str(count), 'finished processing')
                                                                                                                        lan = i['language']
                                                                                                                                        if not lan in dic:
                                                                                                                                                                dic[lan] = []
                                                                                                                                                                                dic[lan].append(i["doc_id"])
                                                                                                                                                                                                dic["goodrecord"]=dic["goodrecord"]+1
                                                                                                                                                                                                            except:
                                                                                                                                                                                                                                print ('record has problems')
                                                                                                                                                                                                                                                dic["errorout"]=dic["errorout"]+1
                                                                                                                                                                                                                                                                pass
                                                                                                                                                                                                                                                                    done=True;
                                                                                                                                                                                                                                                                        except pymongo.errors.AutoReconnect:
                                                                                                                                                                                                                                                                                        logging.info("Error connecting sleeping for {}".format(pow(2, sleep)))
                                                                                                                                                                                                                                                                                                    time.sleep(pow(2, sleep))
                                                                                                                                                                                                                                                                                                                sleep += 1
                                                                                                                                                                                                                                                                                                                            logging.info("retrying...")

                                                                                                                                                                                                                                                                                                                            dic["timetaken"]=time.time() - start_time
                                                                                                                                                                                                                                                                                                                            with open('language_analysis.json', 'w') as fp:
                                                                                                                                                                                                                                                                                                                                    json.dump(dic, fp)


