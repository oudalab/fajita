import requests
from bs4 import BeautifulSoup
import re
import json
import pickle
import datetime
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from multiprocessing import Process


def formatOriginalNameToWikiName(originalname):
    """
    return goodname if we return a better format from wiki
    if not we just return empty string
    we need this function,since if not formated yet, most of the time when you search wiki with the bad 
    name in the url it will return nothing.
    """
    wikipedia.set_lang("en")
    allWikiResults=wikipedia.search(originalname)
    if(len(allWikiResults)==0):
        return ""
    else:
        return str(wikipedia.search(originalname)[0])

#inorder to be parallel we need to pass in a new driver
def MakeSeleniumToSearchWithOriginalName(originalname,driver):
    wikiname=formatOriginalNameToWikiName(originalname)
    nametosearch=originalname if(wikiname=="") else wikiname
    driver.get("https://en.wikipedia.org/wiki/"+str(nametosearch))
    result={}
    result["findresult"]={}
    result["nofind"]={}
    try:
        elem = driver.find_element_by_css_selector(".interwiki-ar a")
        """
        these two lines of code needs to run before elem.click(), since it will goto
        another page never find it any more.
        """
        tempdic={}
        #print("me"+str(elem.get_attribute("href")))
        tempdic["arurl"]=str(elem.get_attribute("href"))
        elem.click()
        tempdic["originalname"]=originalname
        tempdic["wikiname"]=wikiname
        firstheading=driver.find_element_by_id("firstHeading")
        #arabic is from left to right that why u need to get the first one that returns.
        tempdic["arname"]=firstheading.text.split("\n")[0]
        #print(tempdic["arname"])
        result["findresult"]=tempdic
    except Exception as e:
        #print(e)
        tempno={}
        tempno["originalname"]=originalname
        result["nofind"]=tempno
        pass
    return result

def clean_line(line):
    # Take out extra space, underscores, comments, etc.
    cleaned = re.sub("_* .+", "", line).strip()
    cleaned = re.sub("_$", "", cleaned, flags=re.MULTILINE)
    return cleaned

def ingest_dictionary(dict_path):
    """
    Read in the country (or other) actor dictionaries.
    """
    with open(dict_path) as f:
        country_file = f.read()
    split_file = country_file.split("\n")
    
    dict_dict = []
    key_name = ""
    alt_names = [] 
    roles = []

    for line in split_file:
        if not line:
            pass
        elif line[0] == "#":
            pass
        elif re.match("[A-Z]", line[0]):
            # handle the previous
            entry = {"actor_en" : key_name,
                    "alt_names_en" : alt_names,
                    "roles" : roles}
            dict_dict.append(entry)
            # zero everything out
            alt_names = []
            roles = []
            # make new key name
            key_name = clean_line(line)
            # check to see if the role is built in
            if bool(re.search("\[[A-Z]{3}\]", line)):
                roles = re.findall("\[(.+?)\]", line)
        elif line[0] == "+":
            cleaned = clean_line(line[1:])
            alt_names.append(cleaned)
        elif re.match("\s", line):
            roles.append(line.strip())
    return dict_dict 

def buildMultiLanguageActorDictionary(dict_dict):
    finalResult={}
    finalResult["goodones"]=[]
    finalResult["badones"]=[]
    driver = webdriver.Firefox(firefox_binary=binary,capabilities=caps)
    driver.wait = WebDriverWait(driver, 5)
    for item in dict_dict:
        originalname=item["actor_en"]
        if(originalname!=""):
            temp=MakeSeleniumToSearchWithOriginalName(originalname,driver)
            if(temp["findresult"]):
                finalResult["goodones"].append(temp["findresult"])
            else:
                finalResult["badones"].append(temp["nofind"])
    return finalResult

def writeResultToDisk(content,filename):
	try:
    	with open(filename, 'wb') as f:
            	pickle.dump(content, f, pickle.HIGHEST_PROTOCOL)
	except:
    	print("failed to save the result to disk")
    	pass

def func1():
      print('driver 1 start')
      rst1=buildMultiLanguageActorDictionary(dict_dict[0:40])
      wholeresults.append(rst1)
      print('driver 1 finish')

def func2():
      print('driver 2 start')
      rst2=buildMultiLanguageActorDictionary(dict_dict[40:80])
      wholeresults.append(rst2)
      print('driver 2 finish')
def func3():
      print('driver 3 start')
      rst3=buildMultiLanguageActorDictionary(dict_dict[80:120])
      wholeresults.append(rst3)
      print('driver 3 finish')
def func4():
      print('driver 4 start')
      rst4=buildMultiLanguageActorDictionary(dict_dict[120:160])#len(dict_dict)])
      wholeresults.append(rst4)
      print('driver 4 finish')
        

if __name__ == '__main__':
		binary = FirefoxBinary(r'/usr/bin/firefox')
		caps = DesiredCapabilities.FIREFOX.copy()
		caps['marionette'] = True
		dp = "./Phoenix.Countries.actors.txt"
		dict_dict = ingest_dictionary(dp)
		wholeresults=[]
		p1 = Process(target=func1)
		p1.start()
		p2 = Process(target=func2)
		p2.start()
		p3= Process(target=func3)
		p3.start()
		p4 = Process(target=func4)
		p4.start()

		p1.join()
		p2.join()
		p3.join()
		p4.join()
		writeResultToDisk(wholeresults,"wholeresult.pkl")

