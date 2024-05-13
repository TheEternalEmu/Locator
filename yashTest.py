bigArr = []
sections = []
with open('./gisaid_epiflu_sequence.fasta', 'r') as f:
    p1=0
    p2=0
    text = f.read()
    lines = text.split('\n')
    splits = []
    for x in range(1,len(lines)-1):
        if(lines[x][0] == ">"):            
            p1 = p2
            p2 = x
            splits.append([p1,p2])
    splits.append([p2, len(lines)-1])    
    for x in splits:
        x1 = x[0]
        x2 = x[1]
        head = ""
        body = ""
        for y in range(x1,x2):
            if(lines[y][0] == ">"):
                head = lines[y]
            else:
                body+=lines[y]
        sections.append({"head":head, "body":body})

def getByAnimalName(options, name):
    output = []
    for x in options:
        if(name in x["head"]):
            output.append(x)
    return(output)
def getAtBodyPosition(creature, num):
    return(creature["body"][num])

def getAtBodyPositionFromMany(creatures, num):
    output = []
    for x in creatures:
        output.append({
            "head":x["head"],
            "position":x["body"][num]
        })
    return(output)
def searchByYear(options,year):
    output = []
    for x in options:
        if(str(year) in x["head"]):
            output.append(x)
    return(output)

yearRes = searchByYear(sections,2024)
animalRes = getByAnimalName(yearRes, "chicken")
print(animalRes)