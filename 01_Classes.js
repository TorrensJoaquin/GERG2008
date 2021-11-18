//Classes and Functions with Arguments
//Timers
class OperationalTimer{
  constructor(Time){
    this.Time=Time;
    this.AmIOn=false;
  }
  ActivateTimer(){
    this.AmIOn=true;
    setTimeout(this.DeactivateTimer.bind(this),this.Time);
  }
  DeactivateTimer(){
    this.AmIOn=false;
  }
}
//KNOBS
class KNOBS{
  constructor(x,y,DefaultPosition){
    this.x=x;
    this.y=y;
    this.P=DefaultPosition;
  }
  DrawOperationKnob(){
    push();
    fill(0,0,0);
    noStroke();
    circle(this.x,this.y,50);
    stroke(300);
    color(255,255,255);
    if(this.P == 2){line(this.x+0.3*50,this.y-0.3*50,this.x-0.3*50,this.y+0.3*50);pop();return};
    if(this.P == 1){line(this.x,this.y-0.45*50,this.x,this.y+0.45*50);pop();return};
    line(this.x-0.3*50,this.y-0.3*50,this.x+0.3*50,this.y+0.3*50);pop();return;
  }
  ChangeKnobPosition(){
    if (dist(mouseX,mouseY,this.x,this.y)<25){
      if(mouseX < this.x && this.P > 0){this.P=this.P-1;return}
      if(mouseX > this.x && this.P < 2) {this.P=this.P+1;return}
    }
  }
}
//PIDs
class PIDLoop {
  constructor(ActualValue,P,I,D,DirectTrueInvertFalse){
    this.ActualValue=ActualValue;
    this.P=P;
    this.I=I;
    this.D=D;
    this.DirectTrueInvertFalse=DirectTrueInvertFalse;
    this.ErrorMinusOne=0;
    this.ErrorMinusTwo=0;
  }
  UpdatePIDposition(ObjectY,setpoint){
  let error = 0;
  if(this.DirectTrueInvertFalse == true){
    error = ObjectY.ActualValue-setpoint;
  } else {
    error = setpoint-ObjectY.ActualValue;
  }
    this.errorminustwo = this.errorminustwo;
    this.errorminusone = this.errorminusone;
    this.timesteps =0.25;  //deltaTime/1000
    this.ActualValue = this.ActualValue - this.P*((error-this.ErrorMinusOne)+this.I*(this.ErrorMinusOne)+this.D*(error-2*this.ErrorMinusOne+this.ErrorMinusTwo))*this.timesteps;
    if (this.ActualValue>100){this.ActualValue=100}
    if (this.ActualValue<0){this.ActualValue=0}
    this.ErrorMinusOne=error;
    this.ErrorMinusTwo=this.ErrorMinusOne;
  }
}
class VariableParameterWithMaxSpeed{
  constructor(ActualValue, EqValue, SpeedOfCorrection){
    this.ActualValue=ActualValue;
    this.EqValue=EqValue;
    this.SpeedOfCorrection=SpeedOfCorrection;
  }
  FirstOrderEvolution(){
    let Incrementation;
    Incrementation=(this.ActualValue-this.EqValue);
    if (abs(Incrementation)>this.SpeedOfCorrection){
      if (Incrementation>0){Incrementation=this.SpeedOfCorrection}
      else{Incrementation=-this.SpeedOfCorrection}
    }
    this.ActualValue=this.ActualValue-Incrementation;
  }  
}
class OperationalVariable {
  constructor(ActualValue, EqValue, SpeedOfCorrection,MaximumAmmountOfNoiseAdded,NoiseOffset){
    this.ActualValue=ActualValue;
    this.EqValue=EqValue;
    this.SpeedOfCorrection=SpeedOfCorrection;
    this.MaximumAmmountOfNoiseAdded=MaximumAmmountOfNoiseAdded;
    this.NoiseOffset=NoiseOffset;
    this.PrintedValue=ActualValue;
  }
  FirstOrderEvolution(){
    this.ActualValue=this.ActualValue-(this.ActualValue-this.EqValue[StageOfOperation])*this.SpeedOfCorrection
  }
  JustAddNoise(GivenOffset, FixedDecimals){
    let PrintedNoise = (noise(this.NoiseOffset+GivenOffset)-0.5)*this.MaximumAmmountOfNoiseAdded[StageOfOperation];
    this.PrintedValue=(this.ActualValue+PrintedNoise).toFixed(FixedDecimals);
  }
  AddNoise(GivenOffset, FixedDecimals , X, Y){
    let PrintedNoise = (noise(this.NoiseOffset+GivenOffset)-0.5)*this.MaximumAmmountOfNoiseAdded[StageOfOperation];
    this.PrintedValue=(this.ActualValue+PrintedNoise).toFixed(FixedDecimals);
    text(this.PrintedValue,X,Y);
  }
  AddNoiseIfNotNull(GivenOffset, FixedDecimals, X, Y){
    let PrintedNoise = (noise(this.NoiseOffset+GivenOffset)-0.5)*this.MaximumAmmountOfNoiseAdded[StageOfOperation];
    this.PrintedValue=(this.ActualValue+PrintedNoise).toFixed(FixedDecimals);    
    if(this.PrintedValue <0.1){this.PrintedValue=0}
    text(this.PrintedValue,X,Y);
  }
  WithoutNoise(FixedDecimals, X, Y){
    this.PrintedValue=this.ActualValue.toFixed(FixedDecimals);
    text(this.PrintedValue,X,Y);
  }
}
//Minimum Average Maximum
function MinAvgMax(ObjectX){
  let Counter=0;
  let ActualMinimum=1000;
  let ActualMaximum=0;
  let temporary;
  for (let i = 1; i <= 20; i++) { 
    temporary=float(ObjectX[i].PrintedValue);
    if (temporary<ActualMinimum){ActualMinimum=temporary}
    if (temporary>ActualMaximum){ActualMaximum=temporary}
    Counter=Counter+=temporary;
  }
  return [ActualMinimum,Counter/20,ActualMaximum];
}
//Max Values Registers
function MaxValues(PreviusMaximum,ObjectX){
  if(PreviusMaximum<float(ObjectX.PrintedValue)){
    return ObjectX.PrintedValue;
  }else{
    return PreviusMaximum;
  }
}