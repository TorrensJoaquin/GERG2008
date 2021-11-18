class HeatExchangeFluidPointInCircuit {
    constructor(){
        this.Temperature = 0;    //Kelvin
        this.MolarFlow = 0;      //mol/hr
        this.VolumetricFlow = 0; //m3/hr
    }
}
class HeatExchanger{
    constructor(){
        this.UA;
        this.HeatFlow;
    }
    CalculateHeatFlow(Fluid1T, Fluid1t, Fluid2T, Fluid2t){
        //Two fluids, with known temperatures.
        //Q  [J/hr] = UA [J/(K hr)] * LMTD [K]
        //Q1 [J/hr] = m1 [ mol/hr ] * Cp1  [J/(mol K)] * DeltaT [K]
        //Q1 [J/hr] = m2 [ mol/hr ] * Cp2  [J/(mol K)] * DeltaT [K]
        return LMTD( Fluid1T.Temperature, Fluid1t.Temperature, Fluid2T.Temperature, Fluid2t.Temperature);
        function LMTD(Body1T, Body1t, Body2T, Body2t){
            let DeltaTA = Body1T - Body2t;
            let DeltaTB = Body2T - Body1t;
            let LMTD = 0;
            if(DeltaTA > DeltaTB){
                LMTD = (DeltaTA - DeltaTB)/(Math.log(DeltaTA/DeltaTB));
            }
            return LMTD;
        }
    }
    CalculateOutputTemperature(Fluid1, HeatFlow){
        //One fluid is heated/cooled against a know amount of heat.
        //Q1 = m1 * Cp1 * DeltaT
    }
}
class ThreeWayValve {
    // This is a regulated valve
    constructor(CV) {
        this.CV = CV;
        this.Aperture = 0;
    }
    calculateVolumetricFlows(FlowStreamBefore, FlowStreamAfter1, FlowStreamAfter2){

    }
}