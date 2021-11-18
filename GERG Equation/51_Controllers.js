function SetupControllers(){
    LeanoxController1.ProcessValue=0.4;
    LeanoxController1.InitialValue=0.4;
    LeanoxController1.setpoint=1.5;
    LeanoxController1.P=1.50;
    LeanoxController1.I=0.05;
    LeanoxController1.D=0;
    LeanoxController1.DirectTrueInvertFalse=false;
    LeanoxController1.ErrorMinusOne=0;
    LeanoxController1.ErrorMinusTwo=0;
    LeanoxController1.IsOn=true;
    LeanoxController1.MaxDeviation=0.01;
    LeanoxController1.MinimumValue = 0.01;
    PowerController1.ProcessValue=1;
    PowerController1.InitialValue=1;
    PowerController1.setpoint=707;
    PowerController1.P=1.50;
    PowerController1.I=0.05;
    PowerController1.D=0;
    PowerController1.DirectTrueInvertFalse=true;
    PowerController1.ErrorMinusOne=0;
    PowerController1.ErrorMinusTwo=0;
    PowerController1.IsOn=false;
    PowerController1.MaxDeviation=0.01;
    PowerController2.ProcessValue=0;
    PowerController2.InitialValue=0;
    PowerController2.setpoint=707;
    PowerController2.P=0.750;
    PowerController2.I=0.015;
    PowerController2.D=0.050;
    PowerController2.DirectTrueInvertFalse=false;
    PowerController2.ErrorMinusOne=0;
    PowerController2.ErrorMinusTwo=0;
    PowerController2.IsOn=false;
    PowerController2.MaxDeviation=0.01;
    ///
    tecjet.Aperture = LeanoxController1.Initialization();
    throttleValve.Aperture = PowerController1.Initialization();
    turboByPass1.Aperture = PowerController2.Initialization();
}
class PIDController {
    constructor(){
        this.ProcessValue;
        this.InitialValue;
        this.setpoint;
        this.P;
        this.I;
        this.D;
        this.DirectTrueInvertFalse;
        this.ErrorMinusOne;
        this.ErrorMinusTwo;
        this.IsOn;
        this.MaxDeviation;
        this.MinimumValue=0;
        this.MaximumValue=1;
    }
    UpdatePID(FieldMeasurement, PreviusValue){
        if(this.IsOn){
            let error = 0;
            if(this.DirectTrueInvertFalse){
                error = FieldMeasurement-this.setpoint;
            } else {
                error = this.setpoint-FieldMeasurement;
            }
            let timesteps = deltaTime/1000;
            let deviation = error - this.ErrorMinusOne * timesteps;
            deviation += this.I * this.ErrorMinusOne * timesteps;
            deviation +=  this.D * timesteps * (error - 2 * this.ErrorMinusOne + this.ErrorMinusTwo);
            deviation = deviation * this.P;
            if(Math.abs(deviation) < this.MaxDeviation){
                this.ProcessValue += deviation;
            }else{
                if(deviation>0){
                    this.ProcessValue += -this.MaxDeviation;
                }else{
                    this.ProcessValue += this.MaxDeviation;
                }
            }
            if (this.ProcessValue>this.MaximumValue){this.ProcessValue=this.MaximumValue}
            if (this.ProcessValue<this.MinimumValue){this.ProcessValue=this.MinimumValue}
            this.ErrorMinusOne=error;
            this.ErrorMinusTwo=this.ErrorMinusOne;
            return this.ProcessValue;
        }
        return PreviusValue;
    }
    Initialization(){
        this.TecjetAperture = this.InitialValue;
        return this.InitialValue;
    }
}
function RegretionByPoints( ValueX, ArrayX, ArrayY){
    // Find the y value of an array of x and y values.
    // The x function must be an ever-growing function. (We will be using a binary search)
    // Duplicated values of ArrayX will cause an error.
    let Initial = 0;
    let Final = ArrayX.length;
    let RangeOfTheBinarySearch = Final;
    let Middle = Math.round(RangeOfTheBinarySearch/2);
    let MinimumErrorFound = 999999;
    let PositionX;
    let aux;
    for(let i=0; i < 255; i++){
        if(RangeOfTheBinarySearch < 4){
            i = 255;
        }else{
            if(ValueX > ArrayX[Middle]){
                Initial = Middle;
            }else{
                Final = Middle;
            }
            RangeOfTheBinarySearch = Final - Initial;
            Middle = Math.round(RangeOfTheBinarySearch/2) + Initial;
        }
    }
    for(let i = Initial; i <= Final; i++){
        aux = Math.abs(ValueX - ArrayX[i]);
        if(aux < MinimumErrorFound){
            PositionX = i;
            MinimumErrorFound = aux;
        }
    }
    let dy = ArrayY[PositionX + 1] - ArrayY[PositionX];
    let dx = ArrayX[PositionX + 1] - ArrayX[PositionX];
    let DeltaX = ValueX - ArrayX[PositionX];
    // y0 + dy/dx * DeltaX
    let result;
    if (dy != 0){
        result = ArrayY[PositionX] + dy/dx*DeltaX;
    }else{
        result = ArrayY[PositionX];
    }
    return result;
}