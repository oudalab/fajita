
import pymongo import MongoClient
import pymongo
import pickle
import logging
import time
import logging.config

client1 =MongoClient('mongodb://user:pswd@portland.cs.ou.edu:port',maxPoolSize=5)
db1 = client1['lexisnexis']
largestory = db1.disk_stories_full
logging.basicConfig(filename='logging.python')
dic = {}
count = 0
dic["errorout"]=0;
dic["goodrecord"]=0;

cur = largestory.find()

sleep = 1
done = False
#the total number of records in the collections
while(count<=109672706):
        try:
                    i=cur.next();
                            try:
                                            count = count + 1
                                                        if count % 100000 == 0:
                                                                            print (str(count), 'finished processing')
                                                                                        lan = i['language']
                                                                                                    if not lan in dic:
                                                                                                                        dic[lan] = 0
                                                                                                                                    dic[lan] = dic[lan] + 1
                                                                                                                                                dic["goodrecord"]=dic["goodrecord"]+1
                                                                                                                                                        except:
                                                                                                                                                                        print ('record has problems')
                                                                                                                                                                                    dic["errorout"]=dic["errorout"]+1
                                                                                                                                                                                                pass
                                                                                                                                                                                                except pymongo.errors.AutoReconnect:
                                                                                                                                                                                                                logging.info("Error connecting sleeping for {}".format(pow(2, sleep)))
                                                                                                                                                                                                                            time.sleep(pow(2, sleep))
                                                                                                                                                                                                                                        sleep += 1
                                                                                                                                                                                                                                                    logging.info("retrying...")

                                                                                                                                                                                                                                                    with open('language_count.pickle', 'wb') as file1:
                                                                                                                                                                                                                                                            pickle.dump(dic, file1, protocol=pickle.HIGHEST_PROTOCOL)
