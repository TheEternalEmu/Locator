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

    def __init__(self, head, seq):
        self.head= head
        self.seq = seq
        self.id = head.split('|')[2]
        self.specie = head.split('/')[1]
        self.year = head.split('/')[4]

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
    def getByFile(self):
        with open(File, "r") as f:
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
                        
    def countCorrectPos(self, check, pos):
        counter=0
        res = []
        for x in self.points:
            y = x.posChecker(check, pos)
            if y!=False:
                counter+=1
                res.append(y)
        return(
            CounterOutput(counter, res)
        )

manager = FastaPointManager()
manager.getByFile()
x = manager.countCorrectPos(Val,Position)
z = manager.countCorrectPos(Ile,Position)
output_Ile = ""
output_Val = ""


for y in x.ids:
    output_Val+=y + "\n"

for y in z.ids:
    output_Ile+=y + "\n"
    

print("109V Sequence IDs:","\n", output_Val)
print("109I Sequence IDs:","\n", output_Ile)
print("File:", File)
print("Number of sequences containing",Position+1,Ile, ":", x.count)
print("Number of sequences containing",Position+1,Val,":", z.count)
print("Total Number of Sequences:", headCount(File))