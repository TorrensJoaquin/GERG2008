let x=Array(22).fill(0);
let CalculateButton;
let itau=1;
let idel=0;
let ar=zeros([3,3]);
let iFlag=1;
const ChartOffset=230;
let FuelGas={CalorificValue:0,AirFuelRelationship:0,Density:0};
let Drawing={
    array:{x:0,y:0},
    P:{Max:2000, Min:50, Current:30, Old:30, PrintedCurrent:0, PrintedOld:0},
    T:{Max:373.15, Min:250, Current:200, Old:200, PrintedCurrent:0, PrintedOld:0},
    D:{Max:0, Min:0, Current:0, Old:0, PrintedCurrent:0, PrintedOld:0},
    ErrorHandling:{ierr:0, herr:''},
};
function setup(){
    GERG.Setup();
    Detail.Setup();
    fill(255,255,255);
    createCanvas(510, 485).position(250,40);
    x[1]=0.94; x[3]=0.05; x[20]=0.01;
    CalculateButton = createButton('Calculate');
    CalculateButton.position(700, 15);
    CalculateButton.mousePressed(CalculateGERG2008);
    CreateTheInputs();
    CalculateGERG2008();
};
function BoundaryOfDrawing(){
    //Find the smallest and biggest value of D
    [Drawing.D.Max,Drawing.ErrorHandling.ierr,Drawing.ErrorHandling.herr]=GERG.CalculateDensity(1,Drawing.T.Min,Drawing.P.Max,x);
    [Drawing.D.Min,Drawing.ErrorHandling.ierr,Drawing.ErrorHandling.herr]=GERG.CalculateDensity(1,Drawing.T.Max,Drawing.P.Min,x);
    text('Density: '+ Drawing.D.Max.toFixed(2) + 'mol/l',20,ChartOffset+20);
    text('Pressure: '+ Drawing.P.Max.toFixed(0) + ' kPa',width - 120, height -20);
};
function RunGERG2008(){
    [GERG.Density,GERG.ierr,GERG.herr]=GERG.CalculateDensity(iFlag,GERG.Temperature,GERG.Pressure,x);
    [GERG.MolarMass,GERG.Pressure,GERG.CompressibilityFactor,GERG.dPdD,GERG.d2PdD2,GERG.d2PdTD,GERG.dPdT,GERG.U,GERG.H,GERG.S,GERG.Cv,GERG.Cp,GERG.SpeedOfSound,GERG.G,GERG.JouleThomson,GERG.Kappa,GERG.A]=GERG.CalculateProperties(GERG.Temperature,GERG.Density,x);
};
function RunDetail(){
    [Detail.Density,Detail.ierr,Detail.herr]=Detail.DensityDetail(Detail.Temperature,Detail.Pressure,x);
    [Detail.MolarMass,Detail.Pressure,Detail.CompressibilityFactor,Detail.dPdD,Detail.d2PdD2,Detail.d2PdTD,Detail.dPdT,Detail.U,Detail.H,Detail.S,Detail.Cv,Detail.Cp,Detail.SpeedOfSound,Detail.G,Detail.JouleThomson,Detail.Kappa,Detail.A]=Detail.PropertiesDetail(Detail.Temperature,Detail.Density,x);
};
function draw(){
    push();
    stroke(255,255,255);
    strokeWeight(5);
    point(map(GERG.Density,Drawing.D.Min,Drawing.D.Max,0,width),map(GERG.Pressure,Drawing.P.Min,Drawing.P.Max,height-ChartOffset,0)+ChartOffset);
    if(Drawing.T.Current<Drawing.T.Max){
        Drawing.P.Current=Drawing.P.Current+10;
        [Drawing.D.Current,Drawing.ErrorHandling.ierr,Drawing.ErrorHandling.herr]=GERG.CalculateDensity(1,Drawing.T.Current,Drawing.P.Current,x);
        stroke(200,200,200);
        strokeWeight(1);
        Drawing.P.PrintedOld=map(Drawing.P.Old,Drawing.P.Min,Drawing.P.Max,height-ChartOffset,0);
        Drawing.T.PrintedOld=map(Drawing.T.Old,Drawing.T.Min,Drawing.T.Max,height-ChartOffset,0);
        Drawing.D.PrintedOld=map(Drawing.D.Old,Drawing.D.Min,Drawing.D.Max,0,width);
        Drawing.P.PrintedCurrent=map(Drawing.P.Current,Drawing.P.Min,Drawing.P.Max,height-ChartOffset,0);
        Drawing.T.PrintedCurrent=map(Drawing.T.Current,Drawing.T.Min,Drawing.T.Max,height-ChartOffset,0);
        Drawing.D.PrintedCurrent=map(Drawing.D.Current,Drawing.D.Min,Drawing.D.Max,0,width);
        if(Drawing.P.Current>=Drawing.P.Max){
            Drawing.T.Current=Drawing.T.Current+15;
            Drawing.P.Current=Drawing.P.Min;
            Drawing.P.Old=Drawing.P.Min;
            Drawing.D.Old=Drawing.D.Min;
        }else{
            if(Drawing.ErrorHandling.ierr == 0){
                line(Drawing.D.PrintedCurrent,Drawing.P.PrintedCurrent+ChartOffset,Drawing.D.PrintedOld,Drawing.P.PrintedOld+ChartOffset);
                //point(Drawing.D.PrintedOld,Drawing.P.PrintedOld+ChartOffset);
                Drawing.P.Old=Drawing.P.Current;
                Drawing.D.Old=Drawing.D.Current;
            }
        }
    }
    pop();
};
function DrawGERGResults(){
    background(0);
    Drawing.P.Current=Drawing.P.Min;
    Drawing.P.Old=Drawing.P.Min;
    Drawing.D.Old=Drawing.D.Min;
    push();
    textSize(20);
    textStyle(BOLD);
    text('GERG 2008',20,25);
    text('DETAIL',250,25);
    pop();
    let aux=45;
    text('Molar Mass: '+ GERG.MolarMass.toFixed(2) + ' g/mol',10,aux);
    text('Molar Mass: '+ Detail.MolarMass.toFixed(2) + ' g/mol',230,aux);
    aux=aux+15;
    text('Density: '+ GERG.Density.toFixed(3) + ' mol/l',10,aux);
    text('Density: '+ Detail.Density.toFixed(3) + ' mol/l',230,aux);
    aux=aux+15;
    text('Compressibility Factor: '+ GERG.CompressibilityFactor.toFixed(2),10,aux);
    text('Compressibility Factor: '+ Detail.CompressibilityFactor.toFixed(2),230,aux);
    aux=aux+15;
    text('dPdD: '+ GERG.dPdD.toFixed(0) + ' kPa/(mol/l)',10,aux);
    text('dPdD: '+ Detail.dPdD.toFixed(0) + ' kPa/(mol/l)',230,aux);
    aux=aux+15;
    text('dPdT: '+ GERG.dPdT.toFixed(2) + ' kPa/K',10,aux);
    text('dPdT: '+ Detail.dPdT.toFixed(2) + ' kPa/K',230,aux);
    aux=aux+15;
    text('Internal Energy: '+ GERG.U.toFixed(1) + ' J/mol',10,aux);
    text('Internal Energy: '+ Detail.U.toFixed(1) + ' J/mol',230,aux);
    aux=aux+15;
    text('Entalphy: '+ GERG.H.toFixed(1) + ' J/mol',10,aux);
    text('Entalphy: '+ Detail.H.toFixed(1) + ' J/mol',230,aux);
    aux=aux+15;
    text('Entropy: '+ GERG.S.toFixed(1) + ' J/mol',10,aux);
    text('Entropy: '+ Detail.S.toFixed(1) + ' J/mol',230,aux);
    aux=aux+15;
    text('Cv: '+ GERG.Cv.toFixed(3) + ' J/(mol-K)',10,aux);
    text('Cv: '+ Detail.Cv.toFixed(3) + ' J/(mol-K)',230,aux);
    aux=aux+15;
    text('Cp: '+ GERG.Cp.toFixed(3) + ' J/(mol-K)',10,aux);
    text('Cp: '+ Detail.Cp.toFixed(3) + ' J/(mol-K)',230,aux);
    aux=aux+15;
    text('Speed Of Sound: '+ GERG.SpeedOfSound.toFixed(1) + ' (m/s)',10,aux);
    text('Speed Of Sound: '+ Detail.SpeedOfSound.toFixed(1) + ' (m/s)',230,aux);
    aux=aux+15;
    text('Gibbs Free Energy: '+ GERG.G.toFixed(1) + ' (J/mol)',10,aux);
    text('Gibbs Free Energy: '+ Detail.G.toFixed(1) + ' (J/mol)',230,aux);
    aux=aux+15;
    text('Joule Thomson: '+ GERG.JouleThomson.toFixed(3) + ' (K/kPa)',10,aux);
    text('Joule Thomson: '+ Detail.JouleThomson.toFixed(3) + ' (K/kPa)',230,aux);
    if(GERG.ierr>0 || Detail.ierr>0){
        aux=aux+15;
        text('Errors Found: '+ GERG.herr,10,aux);
        text('Errors Found: '+ Detail.herr,250,aux);
    }
};
function CalculateGERG2008(){
    UploadTheInputs();
    RunGERG2008();
    RunDetail();
    BoundaryOfDrawing();
    DrawGERGResults();
    Drawing.T.Current=Drawing.T.Min;
    Drawing.P.Current=Drawing.P.Min;
    function UploadTheInputs(){
        GERG.Pressure=parseFloat(inpPressure.value());
        Detail.Pressure=parseFloat(inpPressure.value());
        GERG.Temperature=parseFloat(inpTemperature.value());
        Detail.Temperature=parseFloat(inpTemperature.value());
        x[1]=parseFloat(inpMethane.value())/100;
        x[2]=parseFloat(inpNitrogen.value())/100;
        x[3]=parseFloat(inpCarbonDioxide.value())/100;
        x[4]=parseFloat(inpEthane.value())/100;
        x[5]=parseFloat(inpPropane.value())/100;
        x[6]=parseFloat(inpIsoButane.value())/100;
        x[7]=parseFloat(inpnButane.value())/100;
        x[8]=parseFloat(inpIsopentane.value())/100;
        x[9]=parseFloat(inpnPentane.value())/100;
        x[10]=parseFloat(inpnHexane.value())/100;
        x[11]=parseFloat(inpnHeptane.value())/100;
        x[12]=parseFloat(inpnOctane.value())/100;
        x[13]=parseFloat(inpnNonane.value())/100;
        x[14]=parseFloat(inpnDecane.value())/100;
        x[15]=parseFloat(inpHydrogen.value())/100;
        x[16]=parseFloat(inpOxygen.value())/100;
        x[17]=parseFloat(inpCarbonMonoxide.value())/100;
        x[18]=parseFloat(inpWater.value())/100;
        x[19]=parseFloat(inpHydrogenSulfide.value())/100;
        x[20]=parseFloat(inpHelium.value())/100;
        x[21]=parseFloat(inpArgon.value())/100;
    }
    BoundaryOfDrawing();
};
function CreateTheInputs(){
    let InitialX=180;
    let InitialY=10;
    let SeparationX=0;
    let SeparationY=25;
    let aux=[InitialX,InitialY];
    let CorrectionForTextX=125;
    let CorrectionForTextY=15;

    inpMethane=createInput((x[1]*100).toString());          //1 - Methane
    inpMethane.size(31,13);
    inpMethane.position(aux[0],aux[1]);
    createP('Methane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpNitrogen=createInput((x[2]*100).toString());         //2 - Nitrogen
    inpNitrogen.size(31,13);
    inpNitrogen.position(aux[0],aux[1]);
    createP('Nitrogen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;   

    inpCarbonDioxide=createInput((x[3]*100).toString());    //3 - CarbonDioxide
    inpCarbonDioxide.size(31,13);
    inpCarbonDioxide.position(aux[0],aux[1]);
    createP('Carbon Dioxide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpEthane=createInput((x[4]*100).toString());           //4 - Ethane
    inpEthane.size(31,13);
    inpEthane.position(aux[0],aux[1]);
    createP('Ethane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpPropane=createInput((x[5]*100).toString());          //5 - Propane
    inpPropane.size(31,13);
    inpPropane.position(aux[0],aux[1]);
    createP('Propane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsoButane=createInput((x[6]*100).toString());        //6 - IsoButane
    inpIsoButane.size(31,13);
    inpIsoButane.position(aux[0],aux[1]);
    createP('IsoButane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpnButane=createInput((x[7]*100).toString());          //7 - nButane
    inpnButane.size(31,13);
    inpnButane.position(aux[0],aux[1]);
    createP('nButane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsopentane=createInput((x[8]*100).toString());       //8 - Isopentane
    inpIsopentane.size(31,13);
    inpIsopentane.position(aux[0],aux[1]);
    createP('Isopentane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnPentane=createInput((x[9]*100).toString());         //9 - nPentane
    inpnPentane.size(31,13);
    inpnPentane.position(aux[0],aux[1]);
    createP('nPentane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHexane=createInput((x[10]*100).toString());         //10 - nHexane
    inpnHexane.size(31,13);
    inpnHexane.position(aux[0],aux[1]);
    createP('nHexane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHeptane=createInput((x[11]*100).toString());        //11 - nHeptane
    inpnHeptane.size(31,13);
    inpnHeptane.position(aux[0],aux[1]);
    createP('nHeptane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnOctane=createInput((x[12]*100).toString());         //12 - nOctane
    inpnOctane.size(31,13);
    inpnOctane.position(aux[0],aux[1]);
    createP('nOctane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnNonane=createInput((x[13]*100).toString());         //13 - nNonane
    inpnNonane.size(31,13);
    inpnNonane.position(aux[0],aux[1]);
    createP('nNonane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnDecane=createInput((x[14]*100).toString());         //14 - nDecane
    inpnDecane.size(31,13);
    inpnDecane.position(aux[0],aux[1]);
    createP('nDecane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogen=createInput((x[15]*100).toString());        //15 - Hydrogen
    inpHydrogen.size(31,13);
    inpHydrogen.position(aux[0],aux[1]);
    createP('Hydrogen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpOxygen=createInput((x[16]*100).toString());          //16 - Oxygen
    inpOxygen.size(31,13);
    inpOxygen.position(aux[0],aux[1]);
    createP('Oxygen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpCarbonMonoxide=createInput((x[17]*100).toString());  //17 - CarbonMonoxide
    inpCarbonMonoxide.size(31,13);
    inpCarbonMonoxide.position(aux[0],aux[1]);
    createP('Carbon Monoxide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpWater=createInput((x[18]*100).toString());           //18 - Water
    inpWater.size(31,13);
    inpWater.position(aux[0],aux[1]);
    createP('Water: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogenSulfide=createInput((x[19]*100).toString()); //19 - HydrogenSulfide
    inpHydrogenSulfide.size(31,13);
    inpHydrogenSulfide.position(aux[0],aux[1]);
    createP('Hydrogen Sulfide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHelium=createInput((x[20]*100).toString());          //20 - Helium
    inpHelium.size(31,13);
    inpHelium.position(aux[0],aux[1]);
    createP('Helium: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpArgon=createInput((x[21]*100).toString());           //21 - Argon
    inpArgon.size(31,13);
    inpArgon.position(aux[0],aux[1]);
    createP('Argon: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    createP(' %').position(aux[0]+40,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpPressure=createInput(GERG.Pressure.toString());
    inpPressure.size(41,13);
    inpPressure.position(365,15);
    createP('Pressure: ').position(300,0).style('color:white');
    createP(' kPa').position(419,0).style('color:white');

    inpTemperature=createInput(GERG.Temperature.toString());
    inpTemperature.size(41,13);
    inpTemperature.position(590,15);
    createP('Temperature: ').position(500,0).style('color:white');
    createP(' Kelvin').position(643,0).style('color:white');
};
function RunFuelGas(){
    FuelGas.CalorificValue=x[1]*9.97+x[2]*0+x[3]*0+x[4]*17.87+x[5]*25.89+x[6]*34.05+x[7]*34.3+x[8]*43.51+x[9]*45.51+x[10]*52.67+x[11]*54.67+x[12]*54.67+x[13]*54.67+x[14]*54.67+x[15]*2.99+x[16]*0+x[17]*3.51+x[18]*0+x[19]*0+x[20]*0+x[21]*0;
};