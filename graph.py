
def grph(b):
	city=["Jaipur, Rajasthan", "Jaisalmer, Rajasthan", "Jodhpur, Rajasthan","Ajmer, Rajasthan","Udaipur, Rajasthan"]

	dist =[[0, 560, 350, 135,400],
			[560, 0, 290, 480, 530],
			[350, 290, 0, 200, 260], 	
			[135, 480, 200, 0, 265], 
			[400, 530, 260, 265, 0]
			]

	time=[[0, 9.5, 6, 2.5,6.5],
			[9.5, 0,  4.5, 8, 8.5],
			[6, 4.5, 0, 4, 5],
			[2.5, 8, 4, 0, 4.5],
			[6.5, 8.5, 5, 4.5, 0]
			]
	st=0
	en=0

	for i in range(0,5):
		if i in b:
			st=i;
			mi=0
			pos=i
			for j in range(i+1,5):
				if j in b:
					if mi<time[i][j]:
						pos=j
						mi=time[i][j]
			en=pos;
			break;
	start=city[st]
	end=city[en]
	fixed=[start,end]
	waypts=[]
	for i in b:
		if i!=st and i!=en:
			waypts.append(city[i])
	return {'fixedpts':fixed , 'waypts':waypts}
