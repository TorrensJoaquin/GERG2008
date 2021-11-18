let tecjet = new controlValve(54.1);
let throttleValve = new controlValve(100);
let turboByPass1 = new controlValve(60);
let turboByPass2 = new controlValve(60);
//
let LeanoxController1 = new PIDController();
let PowerController1 = new PIDController();
let PowerController2 = new PIDController();
//
let intakeAir = new FlowStream();
let intakeGasBeforeTecjet = new FlowStream();
let intakeGasAfterTecjet = new FlowStream();
let chargeBeforeTurbocharger = new FlowStream();
let chargeAfterTurbocharger = new FlowStream();
let chargeAfterAftercooler = new FlowStream();
let chargeBeforeThrottleValve = new FlowStream();
let chargeBeforeRecirculation = new FlowStream();
let chargeAfterRecirculation1 = new FlowStream();
let chargeAfterRecirculation2 = new FlowStream();
let chargeAfterThrottleValve = new FlowStream();
let cilinderAfterCompresion = new FlowStream();
let cilinderAfterDefragration = new FlowStream();
let cilinderAfterExpansion = new FlowStream();
let exhaustManifold = new FlowStream();
let exhaustAfterTurbocharger = new FlowStream();
// Variables
let CompressionRatio = 11.8;
let ChargePressure = 390;
let PowerToCompress = 0;
let PowerInExpansion = 0;
let OutputPower = 0;
let StarterPower = 0;
let MechanicalLosses = 0;
let TurbochargerPower = 700000000;
let DoubleSelenoideValveOpen = true;
let IgnitionOn = true;
let IsCBClosed = true;
let IsStarterOn = false;
let Velocity = 1500;
let Lambda = 1.5;
let TurboChargerEfficiency = 0.75;
let VolumeOfChargeManifold = 10000;
//
function RunInitialConditions(){
    //GAS
    intakeGasBeforeTecjet.addMethane(1); // Methane
    intakeGasBeforeTecjet.Temperature = 298; // K
    intakeGasBeforeTecjet.Pressure = 112; // Kpa
    //AIR
    intakeAir.addNitrogen(0.79);
    intakeAir.addOxygen(0.21);
    intakeAir.Temperature = 298; // K
    intakeAir.Pressure = 100; // Kpa
    SetupControllers();
}
function RunExampleOfGasComposition(){
    // Gas
    intakeGasBeforeTecjet.CalculatePropertiesOfFlowStream();
    intakeGasAfterTecjet.Pressure = intakeAir.Pressure;
    if(DoubleSelenoideValveOpen){
        tecjet.Aperture = LeanoxController1.UpdatePID(Lambda, tecjet.Aperture);
        intakeGasAfterTecjet = tecjet.calculateVolumetricFlow(intakeGasBeforeTecjet.Pressure - intakeAir.Pressure, intakeGasBeforeTecjet);
    }else{
        intakeGasAfterTecjet = createACopyOfAFlowstream(intakeGasBeforeTecjet);
        intakeGasAfterTecjet.VolumetricFlow = 0;
    }
    intakeGasAfterTecjet.CalculatePropertiesOfFlowStream();
    intakeGasAfterTecjet.MolarFlow = intakeGasAfterTecjet.VolumetricFlow * intakeGasAfterTecjet.Density * 1000;
    intakeGasAfterTecjet.CalculateMolarFlowByComponent();
    // Air
    let IsMoreGasThanAir = VolumeOfAirAtIntake(Velocity, TurbochargerPower) - intakeGasAfterTecjet.VolumetricFlow
    if(IsMoreGasThanAir < 0){
        intakeAir.VolumetricFlow = 0; // m3/hr    
    }else{
        intakeAir.VolumetricFlow = IsMoreGasThanAir;
    }
    intakeAir.CalculatePropertiesOfFlowStream();
    intakeAir.MolarFlow = intakeAir.VolumetricFlow * intakeAir.Density * 1000;
    intakeAir.CalculateMolarFlowByComponent();
    // Mixture
    chargeBeforeTurbocharger = MixTwoGases(intakeGasAfterTecjet, intakeAir);
    chargeBeforeTurbocharger.Temperature = intakeAir.Temperature; // K
    chargeBeforeTurbocharger.Pressure = intakeAir.Pressure; // Kpa
    chargeBeforeTurbocharger.CalculatePropertiesOfFlowStream();
    chargeBeforeTurbocharger.VolumetricFlow = chargeBeforeTurbocharger.MolarFlow / (chargeBeforeTurbocharger.Density * 1000);
    chargeBeforeTurbocharger.CalculateMolarFlowByComponent();
    // Turbocharger Compressor
    chargeAfterTurbocharger = createACopyOfAFlowstream(chargeBeforeTurbocharger);
    chargeAfterTurbocharger.isoentropicCompression(TurbochargerPower);
    // Aftercooler
    chargeAfterAftercooler = createACopyOfAFlowstream(chargeAfterTurbocharger);
    chargeAfterAftercooler.Temperature = 318.15;
    chargeBeforeRecirculation = createACopyOfAFlowstream(chargeAfterAftercooler);
    chargeBeforeRecirculation.Pressure = ChargePressure;
    chargeBeforeRecirculation.CalculatePropertiesOfFlowStream();
    // Turbobypass
    chargeAfterRecirculation1 = createACopyOfAFlowstream(chargeBeforeTurbocharger);
    turboByPass1.Aperture = PowerController2.UpdatePID(OutputPower*0.00000028, turboByPass1.Aperture);
    chargeAfterRecirculation2 = createACopyOfAFlowstream(chargeBeforeTurbocharger);
    turboByPass2.Aperture = turboByPass1.Aperture;
    if(chargeBeforeRecirculation.Pressure > chargeBeforeTurbocharger.Pressure){
        chargeAfterRecirculation1 = turboByPass1.calculateVolumetricFlow(chargeBeforeRecirculation.Pressure - chargeBeforeTurbocharger.Pressure, chargeBeforeRecirculation);
        chargeAfterRecirculation2 = turboByPass2.calculateVolumetricFlow(chargeBeforeRecirculation.Pressure - chargeBeforeTurbocharger.Pressure, chargeBeforeRecirculation);
    }else{
        chargeAfterRecirculation1.VolumetricFlow = 0;
        chargeAfterRecirculation1.MolarFlow = 0;
        chargeAfterRecirculation2.VolumetricFlow = 0;
        chargeAfterRecirculation2.MolarFlow = 0;
    }
    // Throttle Valve
    // Sucked Volume Of Gas = Velocity * 61.1 * 0.73 * 0.5
    // Velocity -> Revolution per minute
    // 61.1     -> Liters per revolution (J420 spec)
    // 0.73     -> Miller volumetric efficiency
    // 0.50     -> Because is a 4 stroke engine (Only half of the revolutions is opening the inlet valve)
    // Sucked Volume Of Gas -> liters over minute
    // Sucked Volume Of Gas * 0.06 -> m3/hr
    // The shortest function is...
    // Sucked Volume Of Gas = Velocity * 1.33809;
    chargeBeforeThrottleValve = createACopyOfAFlowstream(chargeBeforeRecirculation);
    throttleValve.Aperture = PowerController1.UpdatePID(OutputPower*0.00000028, throttleValve.Aperture);
    chargeAfterThrottleValve = throttleValve.calculateDeltaP(Velocity * 1.33809, chargeBeforeThrottleValve);
    chargeAfterThrottleValve.CalculateMolarFlowByComponent();
    Lambda = chargeAfterThrottleValve.MolarFlowByComponent[16] / (chargeAfterThrottleValve.CalculateDemandedOxygen() + 0.001);
    //Lambda = intakeAir.MolarFlowByComponent[16] /  (intakeGasAfterTecjet.CalculateDemandedOxygen() + 0.001); Is the same
    // Mass Balance on the Charge Manifold
    let molBalanceOnChargeManifold = chargeAfterAftercooler.MolarFlow;
    molBalanceOnChargeManifold = molBalanceOnChargeManifold - chargeAfterRecirculation1.MolarFlow;
    molBalanceOnChargeManifold = molBalanceOnChargeManifold - chargeAfterRecirculation2.MolarFlow;
    molBalanceOnChargeManifold = molBalanceOnChargeManifold - chargeAfterThrottleValve.MolarFlow;
    //console.log(molBalanceOnChargeManifold); //Activate for checking convergence in the charge manifold.
    ChargePressure = ChargePressure + molBalanceOnChargeManifold / VolumeOfChargeManifold;
    if(ChargePressure < 10){ChargePressure = 10}
    // Piston Compression
    cilinderAfterCompresion = createACopyOfAFlowstream(chargeAfterThrottleValve);
    PowerToCompress = cilinderAfterCompresion.isoentropicCompression2(cilinderAfterCompresion.Density * CompressionRatio);
    // Deflagration
    cilinderAfterDefragration = createACopyOfAFlowstream(cilinderAfterCompresion);
    if(IgnitionOn){
        cilinderAfterDefragration = cilinderAfterDefragration.ConvertToExhaust();
        cilinderAfterDefragration.CalculatePropertiesOfFlowStream();
        cilinderAfterDefragration.isocoricHeating(CalculateCalorificValue(cilinderAfterCompresion.x) * cilinderAfterCompresion.MolarFlow);
        cilinderAfterDefragration.VolumetricFlow = cilinderAfterDefragration.MolarFlow / (cilinderAfterDefragration.Density * 1000);
    }
    // Expansion
    cilinderAfterExpansion = createACopyOfAFlowstream(cilinderAfterDefragration);
    //console.log(cilinderAfterExpansion.MolarFlow/3600);
    PowerInExpansion = cilinderAfterExpansion.isoentropicExpansion(CompressionRatio);
    // Exit of the Cylinder
    exhaustManifold = createACopyOfAFlowstream(cilinderAfterExpansion);
    let exhaustManifoldPressure = 100 + LostPressureOfTurbine(exhaustManifold.VolumetricFlow);
    if(cilinderAfterExpansion.Pressure > exhaustManifoldPressure){
        exhaustManifold.isoenthalpicExpansion(exhaustManifoldPressure);
    }else{
        exhaustManifold.isoenthalpicExpansion(intakeAir.Pressure + 10);
    }
    // Turbocharger Turbine
    exhaustAfterTurbocharger = createACopyOfAFlowstream(exhaustManifold);
    if(cilinderAfterExpansion.Pressure > intakeAir.Pressure){
        TurbochargerPower = exhaustAfterTurbocharger.isoentropicExpansion2(intakeAir.Pressure + 10);
    }else{
        TurbochargerPower = 0;
    }
    TurbochargerPower = TurboChargerEfficiency * TurbochargerPower;
    // Starter
    if(IsStarterOn){
        StarterPower = 138571428; // 8 * 3571428.57
    }else{
        StarterPower = 0;
    }
    // Mechanical Losses
    MechanicalLosses = IdleResistance(Velocity);
    // Power Balance
    OutputPower = PowerInExpansion + PowerToCompress - MechanicalLosses + StarterPower;
    if(IsCBClosed){
        Velocity = 1500;
    }else{
        Velocity = Velocity + (OutputPower*0.00000028)*0.1;
        OutputPower = 0;
    }
    if(Velocity < 0){Velocity = 0}
    // Auxiliar functions
    function CalculateCalorificValue(x){
        //Heating values from ISO 6976 at 25 C (kJ/mol)
        let CalorificValue = x[1] * 890.58;
        CalorificValue += x[4] * 1560.69;
        CalorificValue += x[5] * 2219.17;
        CalorificValue += x[6] * 2868.2;
        CalorificValue += x[7] * 2877.4;
        CalorificValue += x[8] * 3528.83;
        CalorificValue += x[9] * 3535.77;
        CalorificValue += x[10] * 4194.95;
        CalorificValue += x[11] * 4853.43;
        CalorificValue += x[12] * 5511.8;
        CalorificValue += x[13] * 6171.15;
        CalorificValue += x[14] * 6829.77;
        CalorificValue += x[15] * 285.83;
        CalorificValue += x[17] * 282.98;
        CalorificValue += x[18] * 44.013;
        CalorificValue += x[19] * 562.01;
        return CalorificValue * 1000;
    }
    function MixTwoGases(GasA, GasB) {
        let GasC = new FlowStream;
        GasC.MolarFlow = 0;
        for (let i = 1; i <= 21; i++) {
            GasC.MolarFlowByComponent[i] = GasA.MolarFlowByComponent[i] + GasB.MolarFlowByComponent[i];
            GasC.MolarFlow = GasC.MolarFlow + GasC.MolarFlowByComponent[i];
        }
        for (let i = 1; i <= 21; i++) {
            GasC.x[i] = GasC.MolarFlowByComponent[i] / GasC.MolarFlow;
        }
        return GasC;
    }
    function IdleResistance(_rpms) {
        return (4.45962233828847E-05 * _rpms * _rpms + 0.023105664925673 * _rpms + 2)* 3571428.57;
    }
    function VolumeOfAirAtIntake(_rpms, _TurbochargerPower) {
        let Returned = map(_rpms,0,1500,100,3505);
        Returned = Returned * map(_TurbochargerPower,0, 700000000, 1 , 2.5);
        return Returned;
    }
    function LostPressureOfTurbine(VolFlow){
        return 0.000160806075309 * VolFlow * VolFlow + 0.095476051048958 * VolFlow;
    }
}
function createACopyOfAFlowstream(GasA) {
    let GasB = new FlowStream;
    GasB.x = GasA.x; //mol
    GasB.MolarFlowByComponent = GasA.MolarFlowByComponent; //mol/hr
    GasB.MolarFlow = GasA.MolarFlow; //mol/hr
    GasB.VolumetricFlow = GasA.VolumetricFlow; //m3/hr
    GasB.Pressure = GasA.Pressure; //KPa
    GasB.Temperature = GasA.Temperature; //Kelvin
    GasB.MolarMass = GasA.MolarMass; //g/mol
    GasB.Density = GasA.Density; //mol/l
    GasB.CompressibilityFactor = GasA.CompressibilityFactor;
    GasB.dPdD = GasA.dPdD;
    GasB.d2PdD2 = GasA.d2PdD2;
    GasB.d2PdTD = GasA.d2PdTD;
    GasB.dPdT = GasA.dPdT;
    GasB.U = GasA.U; //J/mol
    GasB.H = GasA.H; //J/mol
    GasB.S = GasA.S; //J/mol
    GasB.Cv = GasA.Cv;
    GasB.Cp = GasA.Cp;
    GasB.SpeedOfSound = GasA.SpeedOfSound;
    GasB.G = GasA.G;
    GasB.JouleThomson = GasA.JouleThomson; //K/kPa
    GasB.IsentropicExponent = GasA.IsentropicExponent;
    GasB.A = GasA.A;
    GasB.ierr = GasA.ierr;
    GasB.herr = GasA.herr;
    return GasB;
}