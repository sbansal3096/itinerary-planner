import requests as req 

from bs4 import BeautifulSoup 
import os
import os.path
import shutil

def make_url(name,lprice,hprice,sdate,edate):
	print("hi")


try:
	#url="https://www.hotelscombined.in/Hotels/Search?destination=place%3AJaipur&checkin=2018-03-23&checkout=2018-03-24&Rooms=1&adults_1=2&languageCode=EN&currencyCode=INR#destination=place:Jaipur&radius=0km&checkin=2018-03-23&checkout=2018-03-24&Rooms=1&adults_1=2&pageSize=15&pageIndex=0&sort=Popularity-desc&showSoldOut=false&lowRate=7000&highRate=11000&scroll=245&HotelID=&mapState=expanded%3D0&isNewSRIDesignTarget=true"
	url="https://www.makemytrip.com/mmthtl/site/hotels/search?checkin=03192018&checkout=03212018&city=JAI&country=IN&area=&roomStayQualifier=2e0e&searchText=Jaipur,%20India&sTime=1521468977975"
	r1=req.get(url)
	c1=r1.content

	soup1=BeautifulSoup(c1,"html.parser")
	F1=soup1.find_all("div")
	print(F1)
	#print(F1)
	'''namelist=[]
				#count=0
				for i in F1:
					print (i.text)
					x=i.text
					l=x.split()
					name=""
					url="https://www.youtube.com/results?search_query="
					for j in l:
						url=url+j+"+"
						name=name+j+"_"
					#print(":",url)
					url=url[:-1]
					name=name[:-1]
					namelist.append(name)
					#print(url,name)
					r2=req.get(url)
					c2=r2.content
					soup2=BeautifulSoup(c2,"html.parser")
					#F2=soup2.find_all("a",{"class":"yt-simple-endpoint"})
					#print(F2[0]['href'])
					#print(F2)
					
					#F2 = soup2.find_all('a',href=True)
					#print(link[40]['href'])
					F2 =soup2.findAll(attrs={'class':'yt-uix-tile-link'})
						
			
					
					link="https://www.youtube.com"+F2[0]['href']
					command="youtube-dl --extract-audio --audio-format mp3 "+link+" -o "+name+".mp3"
					os.system(command)
			'''
		

		#count=count+1
except req.exceptions.RequestException as e: 
    print (e)

