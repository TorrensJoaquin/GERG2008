//Charts
let PXToDraw=Array(100);
let PYToDraw=Array(10);
let TXToDraw=Array(100);
let TYToDraw=Array(10);
let DZToDraw=zeros([9, 99]);
let VZToDraw=zeros([9, 99]);
let HZToDraw=zeros([9, 99]);
let HZ2ToDraw=zeros([9, 99]);
let SZ2ToDraw=zeros([9, 99]);
let UpLeftCorner=Array(225,78);
let DownRightCorner=Array(662,789);
let maximumValueOfS;
let minimumValueOfS;
let maximumValueOfH;
let minimumValueOfH;
let SizeOfCircle = 0;
let IsCircleIncreasing = true;
function SetupXsOfDrawing(){
    let PMinimum = 50;
    let PMaximum = 1000;
    let TMinimum = 225;
    let TMaximum = 450;
    for(let i=0; i<100; i++){
        PXToDraw[i]= map(i,0,99,PMinimum,PMaximum);
    }
    for(let i=0; i<10; i++){
        PYToDraw[i]= map(i,0,9,PMinimum,PMaximum);
    }
    for(let i=0; i<100; i++){
        TXToDraw[i]= map(i,0,99,TMinimum,TMaximum);
    }
    for(let i=0; i<10; i++){
        TYToDraw[i]= map(i,0,9,TMinimum,TMaximum);
    }
}
function CalculateDrawedData(){
    maximumValueOfS=SZ2ToDraw[0][99];
    minimumValueOfS=SZ2ToDraw[9][0];
    maximumValueOfH=SZ2ToDraw[0][99];
    minimumValueOfH=SZ2ToDraw[9][0];
    GERGDraw.x = x;
    for(let i=0; i<=9; i++){
        for(let j=0; j<=99; j++){
            GERGDraw.Pressure = PXToDraw[j];
            GERGDraw.Temperature = TYToDraw[i];
            GERGDraw.CalculateDensity(iFlag);
            if (GERGDraw.ierr != 1){
                DZToDraw[i][j] = GERGDraw.Density;
                VZToDraw[i][j] = 1 / (GERGDraw.Density + 0.00002);
                HZToDraw[i][j] = GERGDraw.H;
            }
            GERGDraw.Pressure = PYToDraw[i];
            GERGDraw.Temperature = TXToDraw[j];
            GERGDraw.CalculateDensity(iFlag);
            if (GERGDraw.ierr != 1){
                HZ2ToDraw[i][j] = GERGDraw.H;
                SZ2ToDraw[i][j] = GERGDraw.S;
            }
            if(SZ2ToDraw[i][j] < minimumValueOfS){minimumValueOfS=SZ2ToDraw[i][j]}
            if(SZ2ToDraw[i][j] > maximumValueOfS){maximumValueOfS=SZ2ToDraw[i][j]}
            if(HZ2ToDraw[i][j] < minimumValueOfH){minimumValueOfH=HZ2ToDraw[i][j]}
            if(HZ2ToDraw[i][j] > maximumValueOfH){maximumValueOfH=HZ2ToDraw[i][j]}
        }
    }
    //Debugger part
    for(let i=0; i<=9; i++){
        for(let j=1; j<=99; j++){
            if(DZToDraw[i][j-1] > DZToDraw[i][j]){
                DZToDraw[i][j] = DZToDraw[i][j-1];
                VZToDraw[i][j] = 1 / (DZToDraw[i][j-1] + 0.00002);
                HZToDraw[i][j] = HZToDraw[i][j-1];
            }
        }
        for(let j=0; j<100; j++){
            if(HZToDraw[i][j+1] > HZToDraw[i][j]){HZToDraw[i][j+1] = HZToDraw[i][j]}
        }
        for(let j=99; j>=1; j--){
            if(HZ2ToDraw[i][j-1] > HZ2ToDraw[i][j]){HZ2ToDraw[i][j-1] = HZ2ToDraw[i][j]}
            if(SZ2ToDraw[i][j-1] > SZ2ToDraw[i][j]){SZ2ToDraw[i][j-1] = SZ2ToDraw[i][j]}
        }
    }
}
function DrawPD(){
    for(let j=0; j<10; j++){
        for(let i=0; i<99; i++){
            let xi = map(PXToDraw[i],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yi = map(DZToDraw[j][i],DZToDraw[0][99],DZToDraw[9][0],DownRightCorner[1],UpLeftCorner[1], true);
            let xj = map(PXToDraw[i+1],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yj = map(DZToDraw[j][i+1],DZToDraw[0][99],DZToDraw[9][0],DownRightCorner[1],UpLeftCorner[1], true);
            line(yi,xi,yj,xj);
        }
    }
}
function DrawPV(){
    for(let j=0; j<10; j++){
        for(let i=0; i<99; i++){
            let xi = map(PXToDraw[i],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yi = map(VZToDraw[j][i],VZToDraw[9][0],VZToDraw[0][99],DownRightCorner[1],UpLeftCorner[1], true);
            let xj = map(PXToDraw[i+1],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yj = map(VZToDraw[j][i+1],VZToDraw[9][0],VZToDraw[0][99],DownRightCorner[1],UpLeftCorner[1], true);
            line(yi,xi,yj,xj);
        }
    }
}
function DrawPH(){
    for(let j=0; j<10; j++){
        for(let i=0; i<99; i++){
            let xi = map(PXToDraw[i],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yi = map(HZToDraw[j][i],HZToDraw[0][99],HZToDraw[9][0],DownRightCorner[1],UpLeftCorner[1], true);
            let xj = map(PXToDraw[i+1],PXToDraw[0],PXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yj = map(HZToDraw[j][i+1],HZToDraw[0][99],HZToDraw[9][0],DownRightCorner[1],UpLeftCorner[1], true);
            line(yi,xi,yj,xj);
        }
    }
}
function DrawTH(){
    for(let j=0; j<10; j++){
        for(let i=0; i<99; i++){
            let xi = map(TXToDraw[i],TXToDraw[0],TXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yi = map(HZ2ToDraw[j][i],maximumValueOfH,minimumValueOfH,DownRightCorner[1],UpLeftCorner[1], true);
            let xj = map(TXToDraw[i+1],TXToDraw[0],TXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yj = map(HZ2ToDraw[j][i+1],maximumValueOfH,minimumValueOfH,DownRightCorner[1],UpLeftCorner[1], true);
            line(yi,xi,yj,xj);
        }
    }
}
function DrawTS(){
    for(let j=0; j<10; j++){
        for(let i=0; i<99; i++){
            let xi = map(TXToDraw[i],TXToDraw[0],TXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yi = map(SZ2ToDraw[j][i],maximumValueOfS,minimumValueOfS,DownRightCorner[1],UpLeftCorner[1], true);
            let xj = map(TXToDraw[i+1],TXToDraw[0],TXToDraw[99],DownRightCorner[0],UpLeftCorner[0], true);
            let yj = map(SZ2ToDraw[j][i+1],maximumValueOfS,minimumValueOfS,DownRightCorner[1],UpLeftCorner[1], true);
            line(yi,xi,yj,xj);
        }
    }
}
function FindTheClickedPointPD(){
    if(mouseX < DownRightCorner[1] && mouseY < DownRightCorner[0] && mouseX > UpLeftCorner[1] && mouseY > UpLeftCorner[0]){
        GERGDraw.Pressure = map(mouseY,DownRightCorner[0],UpLeftCorner[0],PXToDraw[0],PXToDraw[99]);
        let DesiredDensity=map(mouseX,DownRightCorner[1],UpLeftCorner[1],DZToDraw[0][99],DZToDraw[9][0]);
        //Start Binary Search
        let TemperatureUp=TYToDraw[9];
        let TemperatureDown=TYToDraw[0];
        let TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
        let DensityMiddle=0;
        GERGDraw.x = x;
        for(let i=0; i<=25; i++){
            GERGDraw.Temperature = TemperatureMiddle;
            GERGDraw.CalculateDensity(iFlag);
            DensityMiddle = GERGDraw.Density;
            if (DesiredDensity < DensityMiddle){
                TemperatureDown=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }else{
                TemperatureUp=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }
        }
        if (abs(DesiredDensity - DensityMiddle) < 0.01){
            GERGDraw.Temperature = TemperatureMiddle;
            DrawResultOfMouseData();
            push();
            line(mouseX, mouseY,mouseX, 665);
            line(78, mouseY,mouseX, mouseY);
            noFill();
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;    
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 3 + SizeOfCircle);
            circle(mouseX, mouseY, 7 + SizeOfCircle);
            circle(mouseX, mouseY, 13 + SizeOfCircle);
            textSize(25);
            fill(100);
            text('Press', 5, 220);
            text('Density',700, 700);
            textSize(15);
            text(GERGDraw.Pressure.toFixed(0) + ' kPa', 5, mouseY);
            text(DensityMiddle.toFixed(2) + ' mol/l', mouseX, 700);
            pop();
        }
    }
}
function FindTheClickedPointPV(){
    if(mouseX < DownRightCorner[1] && mouseY < DownRightCorner[0] && mouseX > UpLeftCorner[1] && mouseY > UpLeftCorner[0]){
        GERGDraw.Pressure = map(mouseY,DownRightCorner[0],UpLeftCorner[0],PXToDraw[0],PXToDraw[99]);
        let DesiredDensity=1 / map(mouseX,DownRightCorner[1],UpLeftCorner[1],VZToDraw[9][0],VZToDraw[0][99]);
        //Start Binary Search
        let TemperatureUp=TYToDraw[9];
        let TemperatureDown=TYToDraw[0];
        let TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
        let DensityMiddle=0;
        GERGDraw.x = x;
        for(let i=0; i<=25; i++){
            GERGDraw.Temperature = TemperatureMiddle;
            GERGDraw.CalculateDensity(iFlag);
            DensityMiddle = GERGDraw.Density;
            if (DesiredDensity < DensityMiddle){
                TemperatureDown=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }else{
                TemperatureUp=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }
        }
        if (abs(DesiredDensity - DensityMiddle) < 0.01){
            GERGDraw.Temperature = TemperatureMiddle;
            DrawResultOfMouseData();
            push();
            line(mouseX, mouseY,mouseX, 665);
            line(78, mouseY,mouseX, mouseY);
            noFill();
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;    
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 3 + SizeOfCircle);
            circle(mouseX, mouseY, 7 + SizeOfCircle);
            circle(mouseX, mouseY, 13 + SizeOfCircle);
            textSize(25);
            fill(100);
            text('Press', 5, 220);
            text('Molar Volume',700, 700);
            textSize(15);
            text(GERGDraw.Pressure.toFixed(0) + ' kPa', 5, mouseY);
            text((1 / DensityMiddle).toFixed(2) + ' l/mol', mouseX, 700);
            pop();
        }
    }
}
function FindTheClickedPointPH(){
    if(mouseX < DownRightCorner[1] && mouseY < DownRightCorner[0] && mouseX > UpLeftCorner[1] && mouseY > UpLeftCorner[0]){
        GERGDraw.Pressure = map(mouseY,DownRightCorner[0],UpLeftCorner[0],PXToDraw[0],PXToDraw[99]);
        let DesiredEntalphy=map(mouseX,DownRightCorner[1],UpLeftCorner[1],HZToDraw[9][0],HZToDraw[0][0]);
        //Start Binary Search
        let TemperatureUp=TYToDraw[9];
        let TemperatureDown=TYToDraw[0];
        let TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
        let EntalphyMiddle=0;
        GERGDraw.x = x;
        for(let i=0; i<=25; i++){
            GERGDraw.Temperature = TemperatureMiddle;
            GERGDraw.CalculateDensity(iFlag);
            EntalphyMiddle = GERGDraw.H;
            if (DesiredEntalphy < EntalphyMiddle){
                TemperatureUp=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }else{
                TemperatureDown=TemperatureMiddle;
                TemperatureMiddle=(TemperatureUp+TemperatureDown)/2;
            }
        }
        if (abs(DesiredEntalphy - EntalphyMiddle) < 100){
            GERGDraw.Temperature = TemperatureMiddle;
            DrawResultOfMouseData();
            push();
            line(mouseX, mouseY,mouseX, 665);
            line(78, mouseY,mouseX, mouseY);
            noFill();
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;    
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 3 + SizeOfCircle);
            circle(mouseX, mouseY, 7 + SizeOfCircle);
            circle(mouseX, mouseY, 13 + SizeOfCircle);
            textSize(25);
            fill(100);
            text('Press', 5, 220);
            text('Enthalpy',700, 700);
            textSize(15);
            text(GERGDraw.Pressure.toFixed(0) + ' kPa', 5, mouseY);
            text(EntalphyMiddle.toFixed(0) + ' J/mol', mouseX, 700);
            pop();
        }
    }
}
function FindTheClickedPointTH(){
    if(mouseX < DownRightCorner[1] && mouseY < DownRightCorner[0] && mouseX > UpLeftCorner[1] && mouseY > UpLeftCorner[0]){
        GERGDraw.Temperature = map(mouseY,DownRightCorner[0],UpLeftCorner[0],TXToDraw[0],TXToDraw[99]);
        let DesiredEntalphy=map(mouseX,DownRightCorner[1],UpLeftCorner[1],maximumValueOfH,minimumValueOfH);
        //Start Binary Search
        let PressureUp=PYToDraw[9];
        let PressureDown=PYToDraw[0];
        let PressureMiddle=(PressureUp+PressureDown)/2;
        let EntalphyMiddle=0;
        GERGDraw.x = x;
        for(let i=0; i<=25; i++){
            GERGDraw.Pressure = PressureMiddle;
            GERGDraw.CalculateDensity(iFlag);
            EntalphyMiddle = GERGDraw.H;
            if (DesiredEntalphy < EntalphyMiddle){
                PressureDown=PressureMiddle;
                PressureMiddle=(PressureUp+PressureDown)/2;
            }else{
                PressureUp=PressureMiddle;
                PressureMiddle=(PressureUp+PressureDown)/2;
            }
        }
        if (abs(DesiredEntalphy - EntalphyMiddle) < 100){
            GERGDraw.Pressure = PressureMiddle;
            DrawResultOfMouseData();
            push();
            line(mouseX, mouseY,mouseX, 665);
            line(78, mouseY,mouseX, mouseY);
            noFill();
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;    
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 3 + SizeOfCircle);
            circle(mouseX, mouseY, 7 + SizeOfCircle);
            circle(mouseX, mouseY, 13 + SizeOfCircle);
            textSize(25);
            fill(100);
            text('Temp', 5, 220);
            text('Enthalpy',700, 700);
            textSize(15);
            text(GERGDraw.Temperature.toFixed(0) + ' K', 5, mouseY);
            text(EntalphyMiddle.toFixed(0) + ' J/mol', mouseX, 700);
            pop();
        }
    }
}
function FindTheClickedPointTS(){
    if(mouseX < DownRightCorner[1] && mouseY < DownRightCorner[0] && mouseX > UpLeftCorner[1] && mouseY > UpLeftCorner[0]){
        GERGDraw.Temperature = map(mouseY,DownRightCorner[0],UpLeftCorner[0],TXToDraw[0],TXToDraw[99]);
        let DesiredEntropy=map(mouseX,DownRightCorner[1],UpLeftCorner[1],maximumValueOfS,minimumValueOfS);
        //Start Binary Search
        let PressureUp=PYToDraw[9];
        let PressureDown=PYToDraw[0];
        let PressureMiddle=(PressureUp+PressureDown)/2;
        let EntropyMiddle=0;
        GERGDraw.x = x;
        for(let i=0; i<=25; i++){
            GERGDraw.Pressure = PressureMiddle;
            GERGDraw.CalculateDensity(iFlag);
            EntropyMiddle = GERGDraw.S;
            if (DesiredEntropy < EntropyMiddle){
                PressureDown=PressureMiddle;
                PressureMiddle=(PressureUp+PressureDown)/2;
            }else{
                PressureUp=PressureMiddle;
                PressureMiddle=(PressureUp+PressureDown)/2;
            }
        }
        if (abs(DesiredEntropy - EntropyMiddle) < 2){
            GERGDraw.Pressure = PressureMiddle;
            DrawResultOfMouseData();
            push();
            line(mouseX, mouseY,mouseX, 665);
            line(78, mouseY,mouseX, mouseY);
            noFill();
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;    
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 3 + SizeOfCircle);
            circle(mouseX, mouseY, 7 + SizeOfCircle);
            circle(mouseX, mouseY, 13 + SizeOfCircle);
            textSize(25);
            fill(100);
            text('Temp', 5, 220);
            text('Entropy',700, 700);
            textSize(15);
            text(GERGDraw.Temperature.toFixed(0) + ' K', 5, mouseY);
            text(EntropyMiddle.toFixed(0) + ' J/mol', mouseX, 700);
            pop();
        }
    }
}
function DrawResultOfMouseData(){
    let PositionOfGERGColumn=820;
    let aux=250;
    push();
    fill(CanvasLeterColor);
    textSize(15);
    textFont('Georgia');
    textStyle(NORMAL);
    fill(CanvasLeterColor);
    text('Temperature: '+ GERGDraw.Temperature.toFixed(1) + ' K',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Pressure: '+ GERGDraw.Pressure.toFixed(1) + ' Kpa',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Molar Mass: '+ GERGDraw.MolarMass.toFixed(2) + ' g/mol',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Density: '+ GERGDraw.Density.toFixed(3) + ' mol/l',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Compressibility Factor: '+ GERGDraw.CompressibilityFactor.toFixed(2),PositionOfGERGColumn,aux);
    aux=aux+25;
    text('dPdD: '+ GERGDraw.dPdD.toFixed(0) + ' kPa/(mol/l)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('dPdT: '+ GERGDraw.dPdT.toFixed(2) + ' kPa/K',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Internal Energy: '+ GERGDraw.U.toFixed(1) + ' J/mol',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Entalphy: '+ GERGDraw.H.toFixed(1) + ' J/mol',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Entropy: '+ GERGDraw.S.toFixed(1) + ' J/mol',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Cv: '+ GERGDraw.Cv.toFixed(3) + ' J/(mol-K)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Cp: '+ GERGDraw.Cp.toFixed(3) + ' J/(mol-K)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Speed Of Sound: '+ GERGDraw.SpeedOfSound.toFixed(1) + ' (m/s)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Gibbs Free Energy: '+ GERGDraw.G.toFixed(1) + ' (J/mol)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Joule Thomson: '+ GERGDraw.JouleThomson.toFixed(3) + ' (K/kPa)',PositionOfGERGColumn,aux);
    aux=aux+25;
    text('Isentropic Coefficient (kappa): '+ GERGDraw.IsentropicExponent.toFixed(3),PositionOfGERGColumn,aux);
    if(GERGDraw.ierr>0){
        aux=aux+25;
        text('Errors Found: '+ GERGDraw.herr,PositionOfGERGColumn,aux);
    }
    pop();
}