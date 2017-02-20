import os
import subprocess
import time
import urllib.request
while True:
    time.sleep(30)
    try: 
         response=urllib.request.urlopen("http://hanover.cs.ou.edu:8084")
         if(response.getcode()!=200):
           os.system("forever start server.js")       
    except urllib.error.HTTPError:
           os.system("forever start server.js")
    except urllib.error.URLError:
           os.system("forever start server.js")
    
