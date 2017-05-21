import os
import subprocess
import time
import urllib.request
while True:
    time.sleep(30)
    try:
         response=urllib.request.urlopen("http://hanover.cs.ou.edu:9090/polling")
         if(response.getcode()!=200):
           os.system("python3 ./otherHelperCode/synonym_api.py")
    except urllib.error.HTTPError:
           os.system("python3 ./otherHelperCode/synonym_api.py")
    except urllib.error.URLError:
           os.system("python3 ./otherHelperCode/synonym_api.py")

