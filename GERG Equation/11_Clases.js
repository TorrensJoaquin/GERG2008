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
class controlValve {
    // This is a regulated valve
    constructor(CV) {
        this.CV = CV;
        this.Aperture = 0;
    }
    calculateDeltaP(VolumetricFlowAtDischarge, FlowStreamBefore) {
        //Diferential pressure across the valve - knowing & using the volumetric flow downstream.
        //Units should be m3/hr //mol/l
        let deltaP = 10;
        let cvsqrdP = this.CV * this.Aperture;
        cvsqrdP = cvsqrdP * cvsqrdP * deltaP;
        let FlowStreamAfter = createACopyOfAFlowstream(FlowStreamBefore);
        for (let i = 1; i < 100; i++) {
            FlowStreamBefore.Pressure = FlowStreamBefore.Pressure - deltaP;
            FlowStreamAfter.isoenthalpicExpansion(FlowStreamBefore.Pressure);
            FlowStreamAfter.VolumetricFlow = Math.sqrt(i * cvsqrdP / (FlowStreamAfter.Density + 0.001));
            if (FlowStreamAfter.VolumetricFlow > VolumetricFlowAtDischarge) {
                i = 100;
            }
        }
        FlowStreamAfter.MolarFlow = FlowStreamAfter.VolumetricFlow * FlowStreamAfter.Density * 1000;
        return FlowStreamAfter;
    }
    calculateVolumetricFlow(deltaP, FlowStreamBefore) {
        //Calculate the Volumetric Flow knowing the pressure in both sides and the valve status.
        //kPa //mol/l
        let cvsqrdP = this.CV * this.Aperture;
        cvsqrdP = cvsqrdP * cvsqrdP * deltaP;
        let FlowStreamAfter = createACopyOfAFlowstream(FlowStreamBefore);
        if (FlowStreamBefore.Pressure > deltaP) {
            FlowStreamAfter.isoenthalpicExpansion(FlowStreamBefore.Pressure - deltaP);
            FlowStreamAfter.VolumetricFlow = Math.sqrt(cvsqrdP / (FlowStreamAfter.Density + 0.001));
            FlowStreamAfter.MolarFlow = FlowStreamAfter.VolumetricFlow * FlowStreamAfter.Density * 1000;
        }else{
            FlowStreamAfter.VolumetricFlow = 0;
            FlowStreamAfter.MolarFlow = 0;
        }
        return FlowStreamAfter;
    }
}