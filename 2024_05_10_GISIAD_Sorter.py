import glob
import csv
import copy
ILE = "I"
VAL = "V"
POSITION=108
FILE = "gisaid_epiflu_sequence.fasta"
TOTAL_SEQ = 0

def headCount(fileName):
    totalSeq=0
    with open (fileName, "r") as f:
        for line in f:
            if line[0] ==">":
                totalSeq+=1
    return(totalSeq)

class FastaPoint:
    head=""
    seq=""
    specie=""
    loc=""
    year=""
    id=""
    flag=True
    def __init__(self, head, seq):
        self.head= head
        self.seq = seq
        try: 
            self.id = head.split('|')[2]
            self.specie = head.split('/')[1]
            self.year = head.split('/')[4]

        except:
            # print(head, " is causing errors")
            self.flag = False
        

    # Gets the character at a given position from the sequence
    def getSeqPos(self, pos=108):
        return(self.seq[pos])
    
    def posChecker(self, test, pos):
        if self.seq[pos] == test:
            return(self.id)
        else:
            return(False)

class CounterOutput:
    count=0
    ids=[]
    def __init__(self, count, ids):
        self.count=count
        self.ids = ids

class FastaPointManager:
    points = []
    name=''
    # Create fasta points given a fileName
    def getByFile(self, fileName=FILE):
        self.name= fileName
        with open(fileName, "r") as f:
            p1=0
            p2=0
            txt = f.read()
            lines = txt.split('\n')
            splits = []
            for x in range(1,len(lines)-1):
                if(lines[x][0] == '>'):
                    p1 = p2
                    p2 = x
                    splits.append([p1,p2])
            splits.append([p2, len(lines)-1])
            for x in splits:
                x1 = x[0]
                x2 = x[1]
                head=""
                body=""
                for y in range(x1, x2):
                    if(lines[y][0] == '>'):
                        head = lines[y]
                    else:
                        body+=lines[y]
                self.points.append(FastaPoint(head, body))
    # Check how many points have a given letter at a given pos                    
    def countCorrectPos(self, check, pos):
        counter=0
        res = []
        for x in self.points:
            if(x.flag == True):
                y = x.posChecker(check, pos)
                if y!=False:
                    counter+=1
                    res.append(y)
        return(
            CounterOutput(counter, res)
        )


def GetDataFromFiles():
    files = glob.glob('*.fasta', root_dir='./Analyzed')
    fileManagers = []
    outcome = []
    for y  in files:
        manager = FastaPointManager()
        manager.getByFile('./Analyzed/'+y.title())
        data = y.title().split('_')
        animal = data[1]
        year = data[2]
        loc = data[3].split('.')[0]
        out1 = manager.countCorrectPos(VAL, POSITION)
        out2 = manager.countCorrectPos(ILE,POSITION)
        test = [year, animal, loc, len(manager.points) , out1.count, out2.count]
        outcome.append(test)
        fileManagers.append(manager)
    for x in fileManagers:
        print(x.name)
    return(outcome)

def makeCSV():
    filename='output.csv'
    fields = ["Year","Specie", "Location", "Total Seq", "VAL", "ILE"]
    with open(filename, 'w') as f:
        outcome = GetDataFromFiles()
        writer = csv.writer(f)
        writer.writerow(fields)
        for x in outcome:
            writer.writerow(x)

makeCSV()