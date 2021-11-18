//POWER simulation
function POWERSimulation(){
  ReactionOfThrottleValveToSpeed();
  ReactionOfThrottleValveToPower();
  ReactionOfTurbobypassToPower();
  function ReactionOfThrottleValveToSpeed(){
    if(Velocity.ActualValue<170 || StageOfOperation!==2){return}
    if (ThrottleValveIdle.ActualValue<10){Velocity.EqValue[2]= map(ThrottleValveIdle.ActualValue,0,10,179,1630);return}
    Velocity.EqValue[2]=map(ThrottleValveIdle.ActualValue,10,100,1630,1743);return;
  }
  function ReactionOfThrottleValveToPower(){
    ElectricPa.EqValue[3]=map(ThrottleValvePower.ActualValue,50,100,300,570);return;
  }
  function ReactionOfTurbobypassToPower(){
    if (Turbobypass.ActualValue>40){ElectricPa.EqValue[4]= map(Turbobypass.ActualValue,30,70,1215,395);return}
    ElectricPa.EqValue[4]=map(Turbobypass.ActualValue,0,30,1650,1215);return;
  }
}
//LEANOX Simulation
function LEANOXSimulator(){
  PressureAfterTheTECJET();
  GASDeltaPressure=GASmbar-GASmbarAfterTecjet;
  FlowInTheTecJet();
  ChargePressureInOperation();
  CalculatedLambda();
  EmissionsInOperation();
  function PressureAfterTheTECJET(){
    if (ElectricPa.ActualValue > 350){GASmbarAfterTecjet= map(ElectricPa.ActualValue,350,1415,1000,963);return}
    GASmbarAfterTecjet=1000;
  }
  function FlowInTheTecJet(){
    GASFlow = 56*Tecjet.ActualValue*sqrt(GASDeltaPressure)/100;
  }
  function ChargePressureInOperation(){
    if (ElectricPa.PrintedValue<707){ChargePressure.ActualValue= map(ElectricPa.ActualValue,0,707,1.000,2.025);return}
    let OriginalChargePressureCurve = map(ElectricPa.ActualValue,707,1415,2.025,3.895);
    let Compensation;
    Compensation = (45-ChargeTemperature.ActualValue)*0.01;
    //Compensation=Compensation+(24-IgnitionPoint)*0.6;
    Compensation = Compensation-(1.75-Lambda.ActualValue)*0.600;
    ChargePressure.ActualValue = OriginalChargePressureCurve + Compensation;
    return;
  }
  function CalculatedLambda(){
    let SuckedAir = ((ChargePressure.ActualValue)*((ChargeTemperature.ActualValue+273.15)/273.15)*Velocity.ActualValue/25*61.1*0.73*0.5);
    Lambda.ActualValue = SuckedAir/((GASFlow*10)+1);
    return;
  }
  function EmissionsInOperation(){
    let Compensation = 0;
    Compensation = 0 //(24-IgnitionPoint.ActualValue)*160;
    Compensation = Compensation-(45-ChargeTemperature.ActualValue)*75;
    Compensation = Compensation+(1.75-Lambda.ActualValue)*110;
    Emissions.NOx = 500 + Compensation;
    Emissions.O2 = map(Emissions.NOx,300,6000,5,10.2);
    Emissions.CO2 = map(Emissions.O2,5,10.2,6,12.8);
    return;
  }
}
function LeanoxENGINE(){
  SetPointChargePressure = map(ElectricPa.PrintedValue,CurveLeanox2[1][0],CurveLeanox2[0][0],CurveLeanox2[1][1],CurveLeanox2[0][1]);
  let ForwardCompensation;
  ForwardCompensation=(Velocity.ActualValue-OldVelocity)*0.008;
  ForwardCompensation=ForwardCompensation+(ElectricPa.ActualValue-OldPower)*0.03;
  if (StageOfOperation<4){
    SetPointLambda=map(OilTemperature.PrintedValue,CurveLeanox1[0][0],CurveLeanox1[1][0],CurveLeanox1[0][1],CurveLeanox1[1][1]);
    Tecjet.ActualValue=Tecjet.ActualValue+ForwardCompensation;
    Tecjet.UpdatePIDposition(Lambda,SetPointLambda);
    HideTecJet.ActualValue = Tecjet.ActualValue;
    return;
  }
  HideTecJet.ActualValue=HideTecJet.ActualValue+ForwardCompensation;
  HideTecJet.UpdatePIDposition(ChargePressure,SetPointChargePressure);
  SetPointLambda=Lambda.ActualValue;
  Tecjet.ActualValue = HideTecJet.ActualValue;
  return;
}