let SetPointDialogBox;
let WhichScreenAmISeeing = 0;
function RefreshMains(){
  //No Modificables
  push();
  fill(255,255,255);
  text(GasType,85,163);
  Lambda.WithoutNoise(2,85,218);
  text(Tecjet.ActualValue.toFixed(1),85,242);
  text(Turbobypass.ActualValue.toFixed(0),75,365);
  ExhaustTemperatureOfCylinder[1].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[2].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[3].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[4].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[5].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[6].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[7].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[8].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[9].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[10].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[11].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[12].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[13].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[14].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[15].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[16].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[17].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[18].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[19].JustAddNoise(xoffNoise,0);
  ExhaustTemperatureOfCylinder[20].JustAddNoise(xoffNoise,0);
  text(MinAvgMaxExhaustTemperatureOfCylinder[1].toFixed(0),350,371);
  if(StageOfOperation>2){
    //Is CB Closed
    push()
    fill(0,159,95,210);
    noStroke();
    rect(658,165,26,37);
    pop()
    text(ThrottleValvePower.ActualValue.toFixed(0),195,433);
  }else{
    text(ThrottleValveIdle.ActualValue.toFixed(0),195,433);  
  }
  if(GridMonitoringRelayTrip==false){
    push()
    fill(0,159,95,210);
    noStroke();
    rect(754,224,22,22);
    pop()
  }
  ChargeTemperature.AddNoise(xoffNoise, 1 , 255, 484);
  ChargePressure.AddNoise(xoffNoise, 2, 255, 509);
  PrimaryWaterTemperatureBeforeEngine.AddNoise(xoffNoise,1,370,198);
  PrimaryWaterTemperature.AddNoise(xoffNoise,1,400,433);
  PrimaryWaterPressure.AddNoise(xoffNoise,2,400,400);
  Velocity.WithoutNoise(0,520,383);
  OilTemperature.AddNoise(xoffNoise,1,400,484);
  OilPressure.AddNoiseIfNotNull(xoffNoise,2,400,507);
  ElectricIa.AddNoiseIfNotNull(xoffNoise,0,745,306);
  ElectricUa.AddNoiseIfNotNull(xoffNoise,0,745,330);
  ElectricPa.AddNoiseIfNotNull(xoffNoise,0,745,354);
  text(ElectricQa.ActualValue.toFixed(0),745,378);
  text(ElectricSa.ActualValue.toFixed(0),745,402);
  Electricf.AddNoiseIfNotNull(xoffNoise,1,745,426);
  text(ElectricCosPhi.ActualValue.toFixed(2),745,450);
  text(SetPointPower.EqValue,670,490);
  text(PowerReduction,670,514);
  pop()
}
function RefreshELE(){
  push();
  fill(255,255,255);
  ElectricI1.AddNoiseIfNotNull(xoffNoise,0,110,125);
  text(ElectricI1max,229,125);
  ElectricI2.AddNoiseIfNotNull(xoffNoise,0,385,125);
  text(ElectricI2max,503,125);
  ElectricI3.AddNoiseIfNotNull(xoffNoise,0,663,125);
  text(ElectricI3max,780,125);
  ElectricU12.AddNoiseIfNotNull(xoffNoise,0,110,158);
  ElectricU23.AddNoiseIfNotNull(xoffNoise,0,385,158);
  ElectricU31.AddNoiseIfNotNull(xoffNoise,0,663,158);
  ElectricU1N.AddNoiseIfNotNull(xoffNoise,0,110,192);
  ElectricU2N.AddNoiseIfNotNull(xoffNoise,0,385,192);
  ElectricU3N.AddNoiseIfNotNull(xoffNoise,0,663,192);
  ElectricIn.AddNoiseIfNotNull(xoffNoise,0,390,239);
  ElectricUe.AddNoiseIfNotNull(xoffNoise,0,390,306);
  ElectricWinding1.AddNoiseIfNotNull(xoffNoise,0,88,381);
  ElectricWinding2.AddNoiseIfNotNull(xoffNoise,0,187,381);
  ElectricWinding3.AddNoiseIfNotNull(xoffNoise,0,288,381);
  ElectricBearingDE.AddNoiseIfNotNull(xoffNoise,0,94,454);
  ElectricBearingNDE.AddNoiseIfNotNull(xoffNoise,0,203,454);
  ElectricPa.AddNoiseIfNotNull(xoffNoise,0,110,239);
  text(ElectricPmax,228,239);
  ElectricQa.AddNoiseIfNotNull(xoffNoise,0,110,272);
  ElectricSa.AddNoiseIfNotNull(xoffNoise,0,110,307);
  Electricf.AddNoiseIfNotNull(xoffNoise,0,675,239);
  ElectricCosPhi.WithoutNoise(2,675,273);
  ElectricIaDyn.WithoutNoise(0,390,273);
  ElectricIunbal.WithoutNoise(0,508,273);
  text(ElectricInmax,508,238);
  pop()
  OilTemperature.JustAddNoise(xoffNoise,0); //I need Printed Value for Leanox
}
function RefreshHYD(){
  push();
  fill(255,255,255);
  OilPressure.AddNoiseIfNotNull(xoffNoise,2,354,110);
  OilTemperature.AddNoise(xoffNoise,1,118,330);
  PrimaryWaterTemperatureBeforeEngine.AddNoise(xoffNoise,1,723,478);
  PrimaryWaterTemperatureAfterEngine.AddNoise(xoffNoise,1,457,171);
  PrimaryWaterTemperature.AddNoise(xoffNoise,1,723,448);
  PrimaryWaterPressure.AddNoise(xoffNoise,2,456,440);
  pop()
  ElectricPa.JustAddNoise(xoffNoise,0); //I need Printed Value for Leanox
}
function RefreshGAS(){
  push();
  fill(255,255,255);
  text(GasType,107,198);
  AmbientTemperature.AddNoise(xoffNoise,0,297,120);
  Lambda.WithoutNoise(2,62,312);
  text(Tecjet.ActualValue.toFixed(1),63,342);
  text(GASmbar,62,372);
  text(GASTemperature,62,403);
  text(GASFlow.toFixed(1),62,432);
  text(GASDeltaPressure.toFixed(0),62,462);
  pop()
  OilTemperature.JustAddNoise(xoffNoise,0); //I need Printed Value for Leanox
  ElectricPa.JustAddNoise(xoffNoise,0); //I need Printed Value for Leanox
}
function RefreshENG(){
  push();
  fill(255,255,255);
  text(GasType,90,174);
  text(Turbobypass.ActualValue.toFixed(0),277,236);
  text(ThrottleValveIdle.ActualValue.toFixed(0),511,174);
  ElectricPa.AddNoiseIfNotNull(xoffNoise,0,756,273);
  Electricf.WithoutNoise(0,698,197);
  ChargeTemperature.AddNoise(xoffNoise, 1 ,620, 280);
  ChargePressure.AddNoise(xoffNoise, 2, 581, 241);
  text(LeanoxError.toFixed(3),504,342);
  text(Tecjet.ActualValue.toFixed(1),139,290);
  Lambda.WithoutNoise(2,138,239);
  fill(0,0,0);
  text(SetPointLambda.toFixed(2),137,264);
  pop();
  OilTemperature.JustAddNoise(xoffNoise,0); //I need Printed Value for Leanox
}
function RefreshCYL(){
  push();
  fill(255,255,255);
  ValveNoise[1].AddNoiseIfNotNull(xoffNoise,0,259,462);
  ValveNoise[2].AddNoiseIfNotNull(xoffNoise,0,283,487);
  ValveNoise[3].AddNoiseIfNotNull(xoffNoise,0,307,462);
  ValveNoise[4].AddNoiseIfNotNull(xoffNoise,0,332,487);
  ValveNoise[5].AddNoiseIfNotNull(xoffNoise,0,356,462);
  ValveNoise[6].AddNoiseIfNotNull(xoffNoise,0,380,487);
  ValveNoise[7].AddNoiseIfNotNull(xoffNoise,0,404,462);
  ValveNoise[8].AddNoiseIfNotNull(xoffNoise,0,428,487);
  ValveNoise[9].AddNoiseIfNotNull(xoffNoise,0,452,462);
  ValveNoise[10].AddNoiseIfNotNull(xoffNoise,0,476,487);
  ValveNoise[11].AddNoiseIfNotNull(xoffNoise,0,500,462);
  ValveNoise[12].AddNoiseIfNotNull(xoffNoise,0,524,487);
  ValveNoise[13].AddNoiseIfNotNull(xoffNoise,0,548,462);
  ValveNoise[14].AddNoiseIfNotNull(xoffNoise,0,572,487);
  ValveNoise[15].AddNoiseIfNotNull(xoffNoise,0,596,462);
  ValveNoise[16].AddNoiseIfNotNull(xoffNoise,0,620,487);
  ValveNoise[17].AddNoiseIfNotNull(xoffNoise,0,644,462);
  ValveNoise[18].AddNoiseIfNotNull(xoffNoise,0,668,487);
  ValveNoise[19].AddNoiseIfNotNull(xoffNoise,0,692,462);
  ValveNoise[20].AddNoiseIfNotNull(xoffNoise,0,716,487);
  text((MinAvgMaxValveNoise[1]).toFixed(0),135,116);
  text((MinAvgMaxValveNoise[2]).toFixed(0),135,144);
  text((MinAvgMaxValveNoise[0]).toFixed(0),137,168);
  pop();
  DrawTheRectangle(262,426,ValveNoise[1],0,10000);
  DrawTheRectangle(286,426,ValveNoise[2],0,10000);
  DrawTheRectangle(310.5,426,ValveNoise[3],0,10000);
  DrawTheRectangle(334.5,426,ValveNoise[4],0,10000);
  DrawTheRectangle(358.5,426,ValveNoise[5],0,10000);
  DrawTheRectangle(382.5,426,ValveNoise[6],0,10000);
  DrawTheRectangle(406.5,426,ValveNoise[7],0,10000);
  DrawTheRectangle(430.5,426,ValveNoise[8],0,10000);
  DrawTheRectangle(454.5,426,ValveNoise[9],0,10000);
  DrawTheRectangle(478.5,426,ValveNoise[10],0,10000);
  DrawTheRectangle(502.5,426,ValveNoise[11],0,10000);
  DrawTheRectangle(526.5,426,ValveNoise[12],0,10000);
  DrawTheRectangle(550.5,426,ValveNoise[13],0,10000);
  DrawTheRectangle(574.5,426,ValveNoise[14],0,10000);
  DrawTheRectangle(598.5,426,ValveNoise[15],0,10000);
  DrawTheRectangle(623,426,ValveNoise[16],0,10000);
  DrawTheRectangle(647,426,ValveNoise[17],0,10000);
  DrawTheRectangle(671.5,426,ValveNoise[18],0,10000);
  DrawTheRectangle(695.5,426,ValveNoise[19],0,10000);
  DrawTheRectangle(719.5,426,ValveNoise[20],0,10000);
  OilTemperature.JustAddNoise(0.09+xoffNoise,0); //I need Printed Value for Leanox
  ElectricPa.JustAddNoise(0.09+xoffNoise,0); //I need Printed Value for Leanox
}
function DrawTheRectangle(X,Y,Value,X1,X2){
  push();
  noStroke();
  fill(200,200,200,200);
  let ValueToPrint
  ValueToPrint=map(Value.PrintedValue,X1,X2,0,234);
  rect(X,Y-ValueToPrint+1,18,ValueToPrint);
  pop();
}
function RefreshEXH(){
  push();
  fill(255,255,255);
  ExhaustTemperatureOfCylinder[1].AddNoise(xoffNoise,0,264,420);
  ExhaustTemperatureOfCylinder[2].AddNoise(xoffNoise,0,288,445);
  ExhaustTemperatureOfCylinder[3].AddNoise(xoffNoise,0,312,420);
  ExhaustTemperatureOfCylinder[4].AddNoise(xoffNoise,0,336,445);
  ExhaustTemperatureOfCylinder[5].AddNoise(xoffNoise,0,360,420);
  ExhaustTemperatureOfCylinder[6].AddNoise(xoffNoise,0,384,445);
  ExhaustTemperatureOfCylinder[7].AddNoise(xoffNoise,0,408,420);
  ExhaustTemperatureOfCylinder[8].AddNoise(xoffNoise,0,432,445);
  ExhaustTemperatureOfCylinder[9].AddNoise(xoffNoise,0,456,420);
  ExhaustTemperatureOfCylinder[10].AddNoise(xoffNoise,0,480,445);
  ExhaustTemperatureOfCylinder[11].AddNoise(xoffNoise,0,504,420);
  ExhaustTemperatureOfCylinder[12].AddNoise(xoffNoise,0,528,445);
  ExhaustTemperatureOfCylinder[13].AddNoise(xoffNoise,0,552,420);
  ExhaustTemperatureOfCylinder[14].AddNoise(xoffNoise,0,576,445);
  ExhaustTemperatureOfCylinder[15].AddNoise(xoffNoise,0,600,420);
  ExhaustTemperatureOfCylinder[16].AddNoise(xoffNoise,0,624,445);
  ExhaustTemperatureOfCylinder[17].AddNoise(xoffNoise,0,648,420);
  ExhaustTemperatureOfCylinder[18].AddNoise(xoffNoise,0,672,445);
  ExhaustTemperatureOfCylinder[19].AddNoise(xoffNoise,0,696,420);
  ExhaustTemperatureOfCylinder[20].AddNoise(xoffNoise,0,720,445);
  text((MinAvgMaxExhaustTemperatureOfCylinder[1]).toFixed(0),115,457);
  text((MinAvgMaxExhaustTemperatureOfCylinder[2]).toFixed(0),115,485);
  text((MinAvgMaxExhaustTemperatureOfCylinder[0]).toFixed(0),115,510);
  pop();
  DrawTheRectangle(266,386,ExhaustTemperatureOfCylinder[1],0,636);
  DrawTheRectangle(290,386,ExhaustTemperatureOfCylinder[2],0,636);
  DrawTheRectangle(314.5,386,ExhaustTemperatureOfCylinder[3],0,636);
  DrawTheRectangle(338.5,386,ExhaustTemperatureOfCylinder[4],0,636);
  DrawTheRectangle(362.5,386,ExhaustTemperatureOfCylinder[5],0,636);
  DrawTheRectangle(386.5,386,ExhaustTemperatureOfCylinder[6],0,636);
  DrawTheRectangle(410.5,386,ExhaustTemperatureOfCylinder[7],0,636);
  DrawTheRectangle(434.5,386,ExhaustTemperatureOfCylinder[8],0,636);
  DrawTheRectangle(459,386,ExhaustTemperatureOfCylinder[9],0,636);
  DrawTheRectangle(483,386,ExhaustTemperatureOfCylinder[10],0,636);
  DrawTheRectangle(507,386,ExhaustTemperatureOfCylinder[11],0,636);
  DrawTheRectangle(531,386,ExhaustTemperatureOfCylinder[12],0,636);
  DrawTheRectangle(554.75,386,ExhaustTemperatureOfCylinder[13],0,636);
  DrawTheRectangle(578.5,386,ExhaustTemperatureOfCylinder[14],0,636);
  DrawTheRectangle(602.5,386,ExhaustTemperatureOfCylinder[15],0,636);
  DrawTheRectangle(626.5,386,ExhaustTemperatureOfCylinder[16],0,636);
  DrawTheRectangle(650.5,386,ExhaustTemperatureOfCylinder[17],0,636);
  DrawTheRectangle(675.5,386,ExhaustTemperatureOfCylinder[18],0,636);
  DrawTheRectangle(699.5,386,ExhaustTemperatureOfCylinder[19],0,636);
  DrawTheRectangle(723.5,386,ExhaustTemperatureOfCylinder[20],0,636);
}
function RefreshTESTO(){
  if(StageOfOperation>2){
    push();
    textStyle(BOLD);
    textSize(9);
    text('NOx '+Emissions.NOx.toFixed(0)+' mg/Nm3',400,165);
    text('O2    '+Emissions.O2.toFixed(2)+'   %',400,185);
    text('CO2  '+Emissions.CO2.toFixed(2)+'   %',400,205);
    pop();
  }
}
function RefreshSEG(){
  push();
  textStyle(BOLD);
  fill(255,54,33);
  textSize(25);
  if(GridMonitoringRelayTrip==false){text('I SEG',450,210)}else{text('TRIP',454,210)}
  pop();  
}
function RefreshXRAY(){

}
function RefreshBROKEN(){

}
function DrawTheCircle(X,Y){
  push();
  noStroke();
  fill(12,245,30,254);
  circle(X,Y,12)
  pop();
}
function SetThePowerSetPoint(){
  SetPointDialogBox = createInput(str(707));
  SetPointDialogBox.size(31,13);
  SetPointDialogBox.position(424, 278);
}
function CheckThePowerSetPoint(){
  if (SetPointDialogBox.value() > 1415 || SetPointDialogBox.value() < 0){
    SetPointDialogBox.value(707);
  }
}
//Adding another DOMs
function SetLEANOXP1(){
  LEANOXP1DialogBox = createInput(str(1415));
  LEANOXP1DialogBox.size(31,13);
  LEANOXP1DialogBox.position(150, 358);
}
function SetLEANOXP2(){
  LEANOXP2DialogBox = createInput(str(707));
  LEANOXP2DialogBox.size(31,13);
  LEANOXP2DialogBox.position(195, 358);
}
function SetLEANOXp21(){
  LEANOXp21DialogBox = createInput(str(3850));
  LEANOXp21DialogBox.size(31,13);
  LEANOXp21DialogBox.position(150, 386);
}
function SetLEANOXp22(){
  LEANOXp22DialogBox = createInput(str(2025));
  LEANOXp22DialogBox.size(31,13);
  LEANOXp22DialogBox.position(195, 386);
}
function SetLEANOXt11(){
  LEANOXt11DialogBox = createInput(str(30));
  LEANOXt11DialogBox.size(31,11);
  LEANOXt11DialogBox.position(826, 106);
}
function SetLEANOXt12(){
  LEANOXt12DialogBox = createInput(str(1.42));
  LEANOXt12DialogBox.size(31,11);
  LEANOXt12DialogBox.position(826, 132);
}
function SetLEANOXt21(){
  LEANOXt21DialogBox = createInput(str(70));
  LEANOXt21DialogBox.size(31,11);
  LEANOXt21DialogBox.position(826, 158);
}
function SetLEANOXt22(){
  LEANOXt22DialogBox = createInput(str(1.56));
  LEANOXt22DialogBox.size(31,11);
  LEANOXt22DialogBox.position(826, 184);
}
function SetLEANOXt1Offset(){
  LEANOXt1OffsetDialogBox = createInput(str(0.1));
  LEANOXt1OffsetDialogBox.size(31,11);
  LEANOXt1OffsetDialogBox.position(826, 211);
}