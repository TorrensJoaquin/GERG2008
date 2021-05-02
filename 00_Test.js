let GERG={
    Pressure:400, //KPa
    Temperature:273.15, //Kelvin
    MolarMass:0, //g/mol
    Density:1/0.04464, //mol/l
    CompressibilityFactor:0,
    dPdD:0,
    d2PdD2:0,
    d2PdTD:0,
    dPdT:0,
    U:0,
    H:0,
    S:0,
    Cv:0,
    Cp:0,
    SpeedOfSound:0,
    G:0,
    JouleThomson:0,
    IsentropicExponent:0,
    A:0,
};
let x=Array(22).fill(0);
let ierr;
let herr;
let iFlag=1;
let itau=1;
let idel=0;
let ar=zeros([3,3]);
let xarray;
let yarray;
let FuelGas={CalorificValue:0,AirFuelRelationship:0,Density:0}
function setup() {
    SetupGERG();
    fill(255,255,255);
    createCanvas(400, 400).position(250,40);
    x[1]=0.94; x[3]=0.05; x[20]=0.01;
    CreateTheInputs();
    RunGERG2008();
}
function RunGERG2008(){
    [GERG.Density,ierr,herr]=DensityGERG(iFlag,GERG.Temperature,GERG.Pressure,x);
    [GERG.MolarMass,GERG.Pressure,GERG.CompressibilityFactor,GERG.dPdD,GERG.d2PdD2,GERG.d2PdTD,GERG.dPdT,GERG.U,GERG.H,GERG.S,GERG.Cv,GERG.Cp,GERG.SpeedOfSound,GERG.G,GERG.JouleThomson,Kappa,A]=PropertiesGERG(GERG.Temperature,GERG.Density,x);
}
function draw() {
    background(0);
    for(xarray=1;xarray<400;xarray++){
        [D,ierr,herr]=DensityGERG(iFlag,GERG.Temperature,GERG.Pressure,x);
    }
    let aux=15;
    text('Molar Mass: '+ GERG.MolarMass.toFixed(2) + ' g/mol',10,aux);
    aux=aux+15;
    text('Density: '+ GERG.Density.toFixed(3) + ' mol/l',10,aux);
    aux=aux+15;
    text('Pressure: '+ GERG.Pressure.toFixed(0) + ' kPa',10,aux);
    aux=aux+15;
    text('Compressibility Factor: '+ GERG.CompressibilityFactor.toFixed(2),10,aux);
    aux=aux+15;
    text('dPdD: '+ GERG.dPdD.toFixed(0) + ' kPa/(mol/l)',10,aux);
    aux=aux+15;
    text('d2PdD2: '+ GERG.d2PdD2.toFixed(0) + ' kPa/(mol/l)^2',10,aux);
    aux=aux+15;
    text('d2PdTD: '+ GERG.d2PdTD.toFixed(2) + ' kPa/(mol/l)/K',10,aux);
    aux=aux+15;
    text('dPdT: '+ GERG.dPdT.toFixed(0) + ' kPa/K',10,aux);
    aux=aux+15;
    text('Intern Energy: '+ GERG.U.toFixed(0) + ' J/mol',10,aux);
    aux=aux+15;
    text('Entalphy: '+ GERG.H.toFixed(0) + ' J/mol',10,aux);
    aux=aux+15;
    text('Entropy: '+ GERG.S.toFixed(0) + ' J/mol',10,aux);
    aux=aux+15;
    text('Cv: '+ GERG.Cv.toFixed(3) + ' J/(mol-K)',10,aux);
    aux=aux+15;
    text('Cp: '+ GERG.Cp.toFixed(3) + ' J/(mol-K)',10,aux);
    aux=aux+15;
    text('SpeedOfSound: '+ GERG.SpeedOfSound.toFixed(0) + ' (m/s)',10,aux);
    aux=aux+15;
    text('Gibbs Free Energy: '+ GERG.G.toFixed(0) + ' (J/mol)',10,aux);
    aux=aux+15;
    text('Joule Thomson: '+ GERG.JouleThomson.toFixed(0) + ' (K/kPa)',10,aux);
}
function mouseClicked(){
    UploadTheInputs();
    RunGERG2008();
    function UploadTheInputs(){
        GERG.Pressure=parseFloat(inpPressure.value());
        GERG.Temperature=parseFloat(inpTemperature.value());
        x[1]=parseFloat(inpMethane.value());
        x[2]=parseFloat(inpNitrogen.value());
        x[3]=parseFloat(inpCarbonDioxide.value());
        x[4]=parseFloat(inpEthane.value());
        x[5]=parseFloat(inpPropane.value());
        x[6]=parseFloat(inpIsoButane.value());
        x[7]=parseFloat(inpnButane.value());
        x[8]=parseFloat(inpIsopentane.value());
        x[9]=parseFloat(inpnPentane.value());
        x[10]=parseFloat(inpnHexane.value());
        x[11]=parseFloat(inpnHeptane.value());
        x[12]=parseFloat(inpnOctane.value());
        x[13]=parseFloat(inpnNonane.value());
        x[14]=parseFloat(inpnDecane.value());
        x[15]=parseFloat(inpHydrogen.value());
        x[16]=parseFloat(inpOxygen.value());
        x[17]=parseFloat(inpCarbonMonoxide.value());
        x[18]=parseFloat(inpWater.value());
        x[19]=parseFloat(inpHydrogenSulfide.value());
        x[20]=parseFloat(inpHelium.value());
        x[21]=parseFloat(inpArgon.value());
    }
}
function CreateTheInputs(){
    let InitialX=180;
    let InitialY=10;
    let SeparationX=0;
    let SeparationY=25;
    let aux=[InitialX,InitialY];
    let CorrectionForTextX=125;
    let CorrectionForTextY=15;

    inpMethane=createInput(x[1].toString());          //1 - Methane
    inpMethane.size(31,13);
    inpMethane.position(aux[0],aux[1]);
    createP('Methane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpNitrogen=createInput(x[2].toString());         //2 - Nitrogen
    inpNitrogen.size(31,13);
    inpNitrogen.position(aux[0],aux[1]);
    createP('Nitrogen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;   

    inpCarbonDioxide=createInput(x[3].toString());    //3 - CarbonDioxide
    inpCarbonDioxide.size(31,13);
    inpCarbonDioxide.position(aux[0],aux[1]);
    createP('Carbon Dioxide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpEthane=createInput(x[4].toString());           //4 - Ethane
    inpEthane.size(31,13);
    inpEthane.position(aux[0],aux[1]);
    createP('Ethane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpPropane=createInput(x[5].toString());          //5 - Propane
    inpPropane.size(31,13);
    inpPropane.position(aux[0],aux[1]);
    createP('Propane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsoButane=createInput(x[6].toString());        //6 - IsoButane
    inpIsoButane.size(31,13);
    inpIsoButane.position(aux[0],aux[1]);
    createP('IsoButane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpnButane=createInput(x[7].toString());          //7 - nButane
    inpnButane.size(31,13);
    inpnButane.position(aux[0],aux[1]);
    createP('nButane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsopentane=createInput(x[8].toString());       //8 - Isopentane
    inpIsopentane.size(31,13);
    inpIsopentane.position(aux[0],aux[1]);
    createP('Isopentane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnPentane=createInput(x[9].toString());         //9 - nPentane
    inpnPentane.size(31,13);
    inpnPentane.position(aux[0],aux[1]);
    createP('nPentane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHexane=createInput(x[10].toString());         //10 - nHexane
    inpnHexane.size(31,13);
    inpnHexane.position(aux[0],aux[1]);
    createP('nHexane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHeptane=createInput(x[11].toString());        //11 - nHeptane
    inpnHeptane.size(31,13);
    inpnHeptane.position(aux[0],aux[1]);
    createP('nHeptane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnOctane=createInput(x[12].toString());         //12 - nOctane
    inpnOctane.size(31,13);
    inpnOctane.position(aux[0],aux[1]);
    createP('nOctane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnNonane=createInput(x[13].toString());         //13 - nNonane
    inpnNonane.size(31,13);
    inpnNonane.position(aux[0],aux[1]);
    createP('nNonane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnDecane=createInput(x[14].toString());         //14 - nDecane
    inpnDecane.size(31,13);
    inpnDecane.position(aux[0],aux[1]);
    createP('nDecane: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogen=createInput(x[15].toString());        //15 - Hydrogen
    inpHydrogen.size(31,13);
    inpHydrogen.position(aux[0],aux[1]);
    createP('Hydrogen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpOxygen=createInput(x[16].toString());          //16 - Oxygen
    inpOxygen.size(31,13);
    inpOxygen.position(aux[0],aux[1]);
    createP('Oxygen: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpCarbonMonoxide=createInput(x[17].toString());  //17 - CarbonMonoxide
    inpCarbonMonoxide.size(31,13);
    inpCarbonMonoxide.position(aux[0],aux[1]);
    createP('CarbonMonoxide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpWater=createInput(x[18].toString());           //18 - Water
    inpWater.size(31,13);
    inpWater.position(aux[0],aux[1]);
    createP('Water: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogenSulfide=createInput(x[19].toString()); //19 - HydrogenSulfide
    inpHydrogenSulfide.size(31,13);
    inpHydrogenSulfide.position(aux[0],aux[1]);
    createP('Hydrogen Sulfide: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHelium=createInput(x[20].toString());          //20 - Helium
    inpHelium.size(31,13);
    inpHelium.position(aux[0],aux[1]);
    createP('Helium: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpArgon=createInput(x[21].toString());           //21 - Argon
    inpArgon.size(31,13);
    inpArgon.position(aux[0],aux[1]);
    createP('Argon: ').position(aux[0]-CorrectionForTextX,aux[1]-CorrectionForTextY).style('color:white');
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpPressure=createInput(GERG.Pressure.toString());
    inpPressure.size(31,13);
    inpPressure.position(365,15);
    createP('Pressure: ').position(300,0).style('color:white');
    createP(' kPa').position(408,0).style('color:white');

    inpTemperature=createInput(GERG.Temperature.toString());
    inpTemperature.size(31,13);
    inpTemperature.position(590,15);
    createP('Temperature: ').position(500,0).style('color:white');
    createP(' Kelvin').position(635,0).style('color:white');
}
function CalculateCalorificValue(){
    FuelGas.CalorificValue=x[1]*9.97+x[2]*0+x[3]*0+x[4]*17.87+x[5]*25.89+x[6]*34.05+x[7]*34.3+x[8]*43.51+x[9]*45.51+x[10]*52.67+x[11]*54.67+x[12]*54.67+x[13]*54.67+x[14]*54.67+x[15]*2.99+x[16]*0+x[17]*3.51+x[18]*0+x[19]*0+x[20]*0+x[21]*0;
}