//Mrs. Langdon, you must either be very lost or very curious

//Matrix operations
//creates a matrix of a x b that is filled with c
function Mnew(a,b,c){
    C=new Array(a)
    for(i=0;i<C.length;i++){
        C[i]=new Array(b).fill(c)
    }
    return C
}
//multiplies two matrixs
function Mdot(A,B){
    if(A[0].length!=B.length){
        console.log("These Can't be multiplied like this")
        return
    }
    C=Mnew(A.length,B[0].length,0)
    for(i=0;i<C.length;i++){
        for(j=0;j<C[i].length;j++){
            for(k=0;k<A[0].length;k++){
                C[i][j]=C[i][j]+A[i][k]*B[k][j]
            }
        }
    }
    return C
}
//hardy multiplication
function Mhardy(A,B){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=A[i][j]*B[i][j]
        }
    }
    return C
}
//returns the tanh of a matrix
function Mtanh(A){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=Math.tanh(A[i][j])
        }
    }
    return C
}
//returns the sum of two matrix
function Msum(A,B){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=A[i][j]+B[i][j]
        }
    }
    return C
}
//returns the sigmoid of a matrix
function Msigmoid(A){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=1/(1+Math.pow(Math.E,A[i][j]))
        }
    }
    return C
}
function Msigmoid0(A){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=1/(1+Math.pow(Math.E,A[i][j]/5))
        }
    }
    return C
}
//Randomizes a Matrix
function Mrandomize(A){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;i<A.length;i++){
        for(j=0;j<A[i].length;j++){
            C[i][j]=1-(2*Math.random())
        }
    }
    return C
}
//Concatenates two 1x? matrixs in the x direction
function Mconcat(A,B){
    C=Mnew(A.length,A[0].length+B[0].length,0)
    for(i=0;i<C[0].length;i++){
        if(i<A[0].length){
            C[0][i]=A[0][i]
        }else{
            C[0][i]=B[0][i-A[0].length]
        }
    }
    return C
}
//1-A
function Mminus1(A){
    C=Mnew(A.length,A[0].length,0)
    for(i=0;C.length>i;i++){
        for(j=0;C[i].length>j;j++){
            C[i][j]=1-A[i][j]
        }
    }
    return C
}

function objRNN(ILL,HLL,OLL){
    Wxr=Mrandomize(Mnew(ILL,HLL,0));
    Whr=Mrandomize(Mnew(HLL,HLL,0));
    br=Mrandomize(Mnew(1,HLL,0));
    Wxz=Mrandomize(Mnew(ILL,HLL,0));
    Whz=Mrandomize(Mnew(HLL,HLL,0));
    bz=Mrandomize(Mnew(1,HLL,0));
    Wxh=Mrandomize(Mnew(ILL,HLL,0));
    Whh=Mrandomize(Mnew(HLL,HLL,0));
    bh=Mrandomize(Mnew(ILL,HLL,0));
    this.h=Mnew(1,HLL,1);
    out=Mrandomize(Mnew(HLL,OLL,0))
    this.Out=function(X){
        //http://jmlr.org/proceedings/papers/v37/jozefowicz15.pdf
        r=Msigmoid(Msum(Mdot(X,Wxr),Msum(Mdot(this.h,Whr),br)))
        z=Msigmoid(Msum(Mdot(X,Wxz),Msum(Mdot(this.h,Whz),bz)))
        h0=Mtanh(Msum(Mdot(X,Wxh),Msum(Mdot(Mhardy(this.h,r),Whh),bh)))
        this.h=Msum(Mhardy(this.h,z),Mhardy(Mminus1(z),h0))
        return Mdot(this.h,out)
    }
}
function chaos(Num, Iter) {
    Po = [[0, 0, 0, 0, 0]]
    for (a = 0; Num > a; a++) {
    for (b = 0; b < Iter; b++) {
        Po = Msigmoid0(Current.Out(Po))
    }
    Plot(Po[0])
    }
}
    
function Plot(Coords){
    Scale=50
    ctx.fillStyle = "rgb("+Math.floor(Coords[2]*255)+","+Math.floor(Coords[3]*255)+","+Math.floor(Coords[4]*255)+")"
    ctx.fillRect(Coords[0]*200,Coords[1]*200,0.3,0.3)
}

function Rando(Range) {
    return [Range - Math.random() * 2*Range, Range - Math.random() * 2*Range, Range - Math.random() * 2*Range, Range - Math.random() * 2*Range]
}

function RandoP() {
    return [Math.random(), Math.random(), Math.random(), Math.random()]
}

function New(c) {
    ctx = Canvas.getContext("2d");
    Main = Main+1;
    if(Main==10){
        Main=0;
        ctx.clearRect(0,0,200,200);
    }
    if(c==1){Current=new objRNN(5,HLL,5)}else{Po=[[0,0,0,0,0]];Current.h=Mnew(1,HLL,1);}
    clearInterval(Cd)
    Cd=setInterval(function(){chaos(100, 1)},1)
    setTimeout(New,3000,1)
}
Main=0
Cd=0
HLL=50
Canvas=null;

window.onload =  function start(){
    document.getElementById("witchcraft").appendChild(document.createElement("canvas")).id = "Canvas" + Main
    Canvas = document.getElementById("Canvas" + Main)
    Canvas.height = 200
    Canvas.width = 200
    New(1)
}
