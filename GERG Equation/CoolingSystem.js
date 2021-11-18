let EngineCircuit = {
    // 01 EngineCircuitAfterPump
    AfterPump:new HeatExchangeFluidPointInCircuit(),
    // 02 EngineCircuitAfterEngine
    AfterEngine:new HeatExchangeFluidPointInCircuit(),
    // 03 EngineCircuitAfterColdCountryValve
    AfterColdCountryValve:new HeatExchangeFluidPointInCircuit(),
    // 04 EngineCircuitAfterThermostatValveBackToEngine
    AfterThermostatValveBackToEngine:new HeatExchangeFluidPointInCircuit(),
    // 05 EngineCircuitAfterThermostatValveToRadiator
    AfterThermostatValveToRadiator:new HeatExchangeFluidPointInCircuit(),
    // 06 EngineCircuitAfterBypassThermostatValve
    AfterBypassThermostatValve:new HeatExchangeFluidPointInCircuit(),
    // 07 EngineCircuitGEJExit
    GEJExit:new HeatExchangeFluidPointInCircuit(),
    // 08 EngineCircuitBeforeThreeWayValve
    BeforeThreeWayValve:new HeatExchangeFluidPointInCircuit(),
    // 09 EngineCircuitBeforeRadiator
    BeforeRadiator:new HeatExchangeFluidPointInCircuit(),
    // 10 EngineCircuitAfterRadiator
    AfterRadiator:new HeatExchangeFluidPointInCircuit(),
    // 11 EngineCircuitBeforeOilHeatExchanger
    BeforeOilHeatExchanger:new HeatExchangeFluidPointInCircuit(),
    // 12 EngineCircuitAfterOilHeatExchanger
    AfterOilHeatExchanger:new HeatExchangeFluidPointInCircuit(),
    // 13 EngineCircuitBeforeAfterCooler
    BeforeAfterCooler:new HeatExchangeFluidPointInCircuit(),
    // 14 EngineCircuitAfterAfterCooler
    AfterAfterCooler:new HeatExchangeFluidPointInCircuit(),
    // 15 EngineCircuitBeforePreHeater
    BeforePreHeater:new HeatExchangeFluidPointInCircuit(),
    // 16 EngineCircuitBeforePump
    BeforePump:new HeatExchangeFluidPointInCircuit(),
    IsPumpOn:false,
    IsPreheatingOn:false,
    TotalVolume:1,      //m3
    TotalMoles:0,       //mol
    MolarMass:18.01528, //g/mol
    Density:55.5,       //mol/l
    Cp:75.37701         //J/(mol-K)
}
let ChargeCircuit = {
    // 01 ChargeCircuitAfterPump
    AfterPump:new HeatExchangeFluidPointInCircuit(),
    // 02 ChargeCircuitAfterAftercooler
    AfterAftercooler:new HeatExchangeFluidPointInCircuit(),
    // 03 ChargeCircuitBeforeThreeWayValve
    BeforeThreeWayValve:new HeatExchangeFluidPointInCircuit(),
    // 04 ChargeCircuitBeforeRadiator
    BeforeRadiator:new HeatExchangeFluidPointInCircuit(),
    // 05 ChargeCircuitAfterRadiator
    AfterRadiator:new HeatExchangeFluidPointInCircuit(),
    // 06 ChargeCircuitBeforePump
    BeforePump:new HeatExchangeFluidPointInCircuit(),
    IsPumpOn:0,
    TotalVolume:1,      //m3
    TotalMoles:0,       //mol
    MolarMass:18.01528, //g/mol
    Density:55.5,       //mol/l
    Cp:75.37701         //J/(mol-K)
}
function RunCoolingEngineCircuit(){
    // 01 EngineCircuitAfterPump
    EngineCircuit.AfterPump;
    // 02 EngineCircuitAfterEngine
    EngineCircuit.AfterEngine;
    // 03 EngineCircuitAfterColdCountryValve
    EngineCircuit.AfterColdCountryValve;
    // 04 EngineCircuitAfterThermostatValveBackToEngine
    EngineCircuit.AfterThermostatValveBackToEngine;
    // 05 EngineCircuitAfterThermostatValveToRadiator
    EngineCircuit.AfterThermostatValveToRadiator;
    // 06 EngineCircuitAfterBypassThermostatValve
    EngineCircuit.AfterBypassThermostatValve;
    // 07 EngineCircuitGEJExit
    EngineCircuit.GEJExit;
    // 08 EngineCircuitBeforeThreeWayValve
    EngineCircuit.BeforeThreeWayValve;
    // 09 EngineCircuitBeforeRadiator
    EngineCircuit.BeforeRadiator;
    // 10 EngineCircuitAfterRadiator
    EngineCircuit.AfterRadiator;
    // 11 EngineCircuitBeforeOilHeatExchanger
    EngineCircuit.BeforeOilHeatExchanger;
    // 12 EngineCircuitAfterOilHeatExchanger
    EngineCircuit.AfterOilHeatExchanger;
    // 13 EngineCircuitBeforeAfterCooler
    EngineCircuit.BeforeAfterCooler;
    // 14 EngineCircuitAfterAfterCooler
    EngineCircuit.AfterAfterCooler;
    // 15 EngineCircuitBeforePreHeater
    EngineCircuit.BeforePreHeater;
    // 16 EngineCircuitBeforePump
    EngineCircuit.BeforePump;
}
function RunCoolingEngineCircuit(){
    // 01 ChargeCircuitAfterPump
    ChargeCircuit.AfterPump;
    // 02 ChargeCircuitAfterAftercooler
    ChargeCircuit.AfterAftercooler;
    // 03 ChargeCircuitBeforeThreeWayValve
    ChargeCircuit.BeforeThreeWayValve;
    // 04 ChargeCircuitBeforeRadiator
    ChargeCircuit.BeforeRadiator;
    // 05 ChargeCircuitAfterRadiator
    ChargeCircuit.AfterRadiator;
    // 06 ChargeCircuitBeforePump
    ChargeCircuit.BeforePump;
}