// StageOfOperation = 0 Engine is in service, alarmed or not requested. Not Working.
// StageOfOperation = 1 Engine is prelubricated and ready to run.
// StageOfOperation = 2 Engine is idling or trying to.rpm>0.
// StageOfOperation = 3 Engine with less than 400 kW.
// StageOfOperation = 4 Engine with more than 400 kw.
function ShouldIChangeTheStageOfOperation(){
  if(StageOfOperation==0){
    //It can only go to stage 1 if selection mode is On (there is no request in here)
    if(KnobDemand.P==0 && KnobRequest.P==2 && PrimaryWaterTemperature.ActualValue > 40){
      GoingToStage1();
    }
    if(KnobDemand.P==0 && KnobRequest.P==1 && StartButtomPushed==true && PrimaryWaterTemperature.ActualValue > 40){
      GoingToStage1();
    }
    return;
  }
  if(StageOfOperation==1){
    if(KnobDemand.P==0 && KnobRequest.P==2 && OilPressure.ActualValue>1.1){
      GoingToStage2();
    }
    if(KnobDemand.P==0 && KnobRequest.P==1 && StartButtomPushed==true && OilPressure.ActualValue>1){
      GoingToStage2();
    }
    return;
  }
  if(StageOfOperation==2){
    if(KnobDemand.P==0 && KnobRequest.P==1 && StartButtomPushed==false && Velocity.ActualValue<800){
      GoingToStage0();
      ThrottleValveIdle.ActualValue=7;
    }
    if(KnobRequest.P==0){
      GoingToStage0();
      ThrottleValveIdle.ActualValue=7;
    }
    if(KnobDemand.P !== 0 && PostlubricationIsActive.AmIOn==false){
      GoingToStage0();
      ThrottleValveIdle.ActualValue=7;
      PostrefrigerationIsActive.ActivateTimer();
    }
    if(Velocity.ActualValue>1499 && Velocity.ActualValue<1501 && abs(Aceleration) < 0.001 && KnobDemand.P == 0 && PostlubricationIsActive.AmIOn==false){
      if (KnobSyncronization.P==2 || TheCBProccessIsRequested==true){GoingToStage3()}
    }
    return;
  }
  if(StageOfOperation==3){
    if(KnobRequest.P==0){
      GoingToStage0();
    }
    if(ElectricPa.ActualValue>400){
      GoingToStage4();
    }
    if(KnobDemand.P !== 0 & ElectricPa.ActualValue < 141){
      GoingToStage2();
      PostlubricationIsActive.ActivateTimer();
    }
    return;
  }
  if(StageOfOperation==4){
    if(KnobRequest.P==0){
      GoingToStage0();
    }
    if(ElectricPa.ActualValue<399){
      GoingToStage3();
      ThrottleValvePower.ActualValue=10;
    }
    if(KnobDemand.P !== 0){
      SetPointPower.EqValue=0;
      SetPointPower.ActualValue=0;
    }
    return;
  }
}
function UploadTheEqValues(){
  if(KnobRequest.P==0){PrimaryWaterTemperature.EqValue[0]=15}else{PrimaryWaterTemperature.EqValue[0]=55}
  OilPressure.EqValue[1]=1.33+Velocity.ActualValue*0.003;
  if (OilPressure.EqValue[1]>3.6){OilPressure.EqValue[1]=3.6}
  POWERSimulation()
  OilPressure.EqValue[2]=1.33+Velocity.ActualValue*0.003;
  if (OilPressure.EqValue[2]>3.6){OilPressure.EqValue[2]=3.6}
  ElectricIa.EqValue[3]=map(ElectricPa.ActualValue,0,1415,0,2340);
  ElectricQa.EqValue[3]=map(ElectricPa.ActualValue,0,1415,0,193);
  ElectricSa.EqValue[3]=ElectricPa.EqValue[3]+ElectricQa.EqValue[3];
  ElectricI1.EqValue[3]=ElectricIa.EqValue[3];
  ElectricI2.EqValue[3]=ElectricIa.EqValue[3];
  ElectricI3.EqValue[3]=ElectricIa.EqValue[3];
  ExhaustTemperatureOfCylinder[1].EqValue[3]=map(ElectricPa.ActualValue,0,1415,384,539);
  ExhaustTemperatureOfCylinder[2].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[3].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[4].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[5].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[6].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[7].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[8].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[9].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[10].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[11].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[12].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[13].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[14].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[15].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[16].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[17].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[18].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[19].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ExhaustTemperatureOfCylinder[20].EqValue[3]=ExhaustTemperatureOfCylinder[1].EqValue[3];
  ElectricIa.EqValue[4]=map(ElectricPa.ActualValue,0,1415,0,2340);
  ElectricQa.EqValue[4]=map(ElectricPa.ActualValue,0,1415,0,193);
  ElectricSa.EqValue[4]=ElectricPa.EqValue[4]+ElectricQa.EqValue[4];
  ElectricI1.EqValue[4]=ElectricIa.EqValue[4];
  ElectricI2.EqValue[4]=ElectricIa.EqValue[4];
  ElectricI3.EqValue[4]=ElectricIa.EqValue[4];
  ExhaustTemperatureOfCylinder[1].EqValue[4]=map(ElectricPa.ActualValue,0,1415,384,539);
  ExhaustTemperatureOfCylinder[2].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[3].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[4].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[5].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[6].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[7].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[8].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[9].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[10].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[11].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[12].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[13].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[14].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[15].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[16].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[17].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[18].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[19].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
  ExhaustTemperatureOfCylinder[20].EqValue[4]=ExhaustTemperatureOfCylinder[1].EqValue[4];
}
function UploadTheActualValues(){
  SetPointPower.FirstOrderEvolution();
  LeanoxENGINE();
  OldVelocity=Velocity.ActualValue;
  OldPower=ElectricPa.ActualValue;
  LeanoxError = (ChargePressure.PrintedValue - SetPointChargePressure);
  if(StageOfOperation==2){ThrottleValveIdle.UpdatePIDposition(Velocity,1500)} else{ThrottleValveIdle.ActualValue=0}
  if(StageOfOperation==3){ThrottleValvePower.UpdatePIDposition(ElectricPa,SetPointPower.ActualValue)} else{ThrottleValvePower.ActualValue=100}
  if(StageOfOperation==4){Turbobypass.UpdatePIDposition(ElectricPa,SetPointPower.ActualValue)} else{Turbobypass.ActualValue=70}
  ChargeTemperature.FirstOrderEvolution();
  PrimaryWaterTemperature.FirstOrderEvolution();
  OilTemperature.FirstOrderEvolution();
  OilPressure.FirstOrderEvolution();
  ElectricIa.FirstOrderEvolution();
  ElectricUa.FirstOrderEvolution();
  ElectricPa.FirstOrderEvolution();
  ElectricQa.FirstOrderEvolution();
  ElectricSa.FirstOrderEvolution();
  Electricf.FirstOrderEvolution();
  ElectricCosPhi.FirstOrderEvolution();
  ElectricI1.FirstOrderEvolution();
  ElectricI2.FirstOrderEvolution();
  ElectricI3.FirstOrderEvolution();
  ElectricU12.FirstOrderEvolution();
  ElectricU23.FirstOrderEvolution();
  ElectricU31.FirstOrderEvolution();
  ElectricU1N.FirstOrderEvolution();
  ElectricU2N.FirstOrderEvolution();
  ElectricU3N.FirstOrderEvolution();
  ElectricIn.FirstOrderEvolution();
  ElectricUe.FirstOrderEvolution();
  ElectricI1max=MaxValues(ElectricI1max,ElectricI1);
  ElectricI2max=MaxValues(ElectricI2max,ElectricI2);
  ElectricI3max=MaxValues(ElectricI3max,ElectricI3);
  ElectricInmax=MaxValues(ElectricInmax,ElectricIn);
  ElectricPmax=MaxValues(ElectricPmax,ElectricPa);
  ElectricIaDyn.FirstOrderEvolution();
  ElectricIunbal.FirstOrderEvolution();
  ElectricWinding1.FirstOrderEvolution();
  ElectricWinding2.FirstOrderEvolution();
  ElectricWinding3.FirstOrderEvolution();
  ElectricBearingDE.FirstOrderEvolution();
  ElectricBearingNDE.FirstOrderEvolution();
  LEANOXSimulator();
  IgnitionPoint[1].FirstOrderEvolution();
  IgnitionPoint[2].FirstOrderEvolution();
  IgnitionPoint[3].FirstOrderEvolution();
  IgnitionPoint[4].FirstOrderEvolution();
  IgnitionPoint[5].FirstOrderEvolution();
  IgnitionPoint[6].FirstOrderEvolution();
  IgnitionPoint[7].FirstOrderEvolution();
  IgnitionPoint[8].FirstOrderEvolution();
  IgnitionPoint[9].FirstOrderEvolution();
  IgnitionPoint[10].FirstOrderEvolution();
  IgnitionPoint[11].FirstOrderEvolution();
  IgnitionPoint[12].FirstOrderEvolution();
  IgnitionPoint[13].FirstOrderEvolution();
  IgnitionPoint[14].FirstOrderEvolution();
  IgnitionPoint[15].FirstOrderEvolution();
  IgnitionPoint[16].FirstOrderEvolution();
  IgnitionPoint[17].FirstOrderEvolution();
  IgnitionPoint[18].FirstOrderEvolution();
  IgnitionPoint[19].FirstOrderEvolution();
  IgnitionPoint[20].FirstOrderEvolution();
  ValveNoise[1].FirstOrderEvolution();
  ValveNoise[2].FirstOrderEvolution();
  ValveNoise[3].FirstOrderEvolution();
  ValveNoise[4].FirstOrderEvolution();
  ValveNoise[5].FirstOrderEvolution();
  ValveNoise[6].FirstOrderEvolution();
  ValveNoise[7].FirstOrderEvolution();
  ValveNoise[8].FirstOrderEvolution();
  ValveNoise[9].FirstOrderEvolution();
  ValveNoise[10].FirstOrderEvolution();
  ValveNoise[11].FirstOrderEvolution();
  ValveNoise[12].FirstOrderEvolution();
  ValveNoise[13].FirstOrderEvolution();
  ValveNoise[14].FirstOrderEvolution();
  ValveNoise[15].FirstOrderEvolution();
  ValveNoise[16].FirstOrderEvolution();
  ValveNoise[17].FirstOrderEvolution();
  ValveNoise[18].FirstOrderEvolution();
  ValveNoise[19].FirstOrderEvolution();
  ValveNoise[20].FirstOrderEvolution();
  MinAvgMaxValveNoise=MinAvgMax(ValveNoise);
  ExhaustTemperatureOfCylinder[1].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[2].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[3].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[4].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[5].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[6].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[7].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[8].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[9].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[10].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[11].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[12].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[13].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[14].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[15].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[16].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[17].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[18].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[19].FirstOrderEvolution();
  ExhaustTemperatureOfCylinder[20].FirstOrderEvolution();
  MinAvgMaxExhaustTemperatureOfCylinder=MinAvgMax(ExhaustTemperatureOfCylinder);
  Aceleration=(Velocity.ActualValue-OldVelocity)/deltaTime;
  Velocity.FirstOrderEvolution();
  if(Velocity.ActualValue>1600){ThrottleValveIdle.ActualValue=0}
  xoffNoise=xoffNoise+0.001;
}
function GoingToStage0(){
  // 0 Engine is in service, alarmed or not requested. Not Working.
  GASmbar=1000;
  GASTemperature=30;
  TheCBProccessIsRequested=false;
  ElectricIa.ActualValue=0;
  ElectricIa.PrintedValue=0;
  ElectricPa.ActualValue=0;
  ElectricPa.PrintedValue=0;
  ElectricQa.ActualValue=0;
  ElectricQa.PrintedValue=0;
  ElectricSa.ActualValue=0;
  ElectricSa.PrintedValue=0;
  ElectricCosPhi.ActualValue=0;
  StageOfOperation=0;
}
function GoingToStage1(){
  // 1 Engine is prelubricated and ready to run.
  ElectricInmax=0;
  GASmbar=1120;
  GASTemperature=30;
  GASDeltaPressure=0;
  TheCBProccessIsRequested=false;
  ElectricIa.ActualValue=0;
  ElectricPa.ActualValue=0;
  ElectricQa.ActualValue=0;
  ElectricSa.ActualValue=0;
  ElectricCosPhi.ActualValue=0;
  StageOfOperation=1;
}
function GoingToStage2(){
  // 2 Engine is idling or trying to.rpm>0.
  Turbobypass.ActualValue=70;
  ElectricI1max=0;
  ElectricI2max=0;
  ElectricI3max=0;
  ElectricInmax=0;
  ElectricPmax=0;
  ElectricInmax=0;
  GASmbar=1120;
  GASTemperature=30;
  GASFlow=13;
  GASDeltaPressure=0.12;
  TheCBProccessIsRequested=false;
  StageOfOperation=2;
}
function GoingToStage3(){
  // 3 Engine with less than 400 kW.
  Velocity.ActualValue=1500;
  ElectricCosPhi.ActualValue=0.8;
  TheCBProccessIsRequested=false;
  StageOfOperation=3;
}
function GoingToStage4(){
  // 4 Engine with more than 400 kw.
  HideTecJet.ActualValue=Tecjet.ActualValue;
  TheCBProccessIsRequested=false;
  ThrottleValvePower.ActualValue = 100;
  ThrottleValvePower.EqValue = 100;
  ElectricCosPhi.ActualValue=0.95;
  StageOfOperation=4;
}