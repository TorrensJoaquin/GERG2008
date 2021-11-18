function setup(){
    SetupFlowStreamSimulator();
    let SizeOfCanvas = [700, 700];
    let PositonOfCanvas = [10, 10];
    createCanvas(SizeOfCanvas[0], SizeOfCanvas[1]).position(PositonOfCanvas[0], PositonOfCanvas[1]);
    RunInitialConditions();
}
function draw(){
    //noLoop();
    //frameRate(1);
    background(0);
    textSize(15);
    fill(255, 255, 255);
    RunExampleOfGasComposition();
    text('The Frame Rate is ' + frameRate().toFixed(0) + ' fps', 10, 20);
    text('Flow Of Air ' + intakeAir.VolumetricFlow.toFixed(0) + ' m3/hr', 10, 40);
    text('Flow Of Gas ' + intakeGasAfterTecjet.VolumetricFlow.toFixed(0) + ' m3/hr', 10, 60);
    text('Lambda is ' + Lambda.toFixed(2), 10, 80);
    text('The Tecjet Aperture is ' + (tecjet.Aperture*100).toFixed(0), 10, 100);
    text('The Charge Pressure is ' + chargeAfterThrottleValve.Pressure.toFixed(1) + ' kPa', 10, 120);
    text('The Charge Temperature is ' + (chargeAfterThrottleValve.Temperature - 273.15).toFixed(1) + ' °Celsius', 10, 140);
    text('The Charge Molar Mass is ' + (chargeAfterThrottleValve.MolarFlow/3600).toFixed(1) + ' moles per sec', 10, 160);
    text('The Turbo Bypass Aperture is ' + (turboByPass1.Aperture*100).toFixed(0), 10, 180);
    text('The Turbo Bypass Aperture is ' + (turboByPass2.Aperture*100).toFixed(0), 10, 200);    
    text('The Throttle Valve Aperture is ' + (throttleValve.Aperture*100).toFixed(0), 10, 220);    
    text('The Exhaust Temperature is ' + (exhaustManifold.Temperature - 273.15).toFixed(1) + ' °Celsius', 10, 240);
    text('The Exhaust Pressure is ' + exhaustManifold.Pressure.toFixed(1) + ' kPa', 10, 260);
    text('The Turbocharger Power is ' + (TurbochargerPower*0.00000028).toFixed(0) + ' kW', 10, 280);
    text('The Power Needed to compress ' + ((-PowerToCompress)*0.00000028).toFixed(1) + ' kW', 10, 300);
    text('The Power During expansion ' + ((PowerInExpansion)*0.00000028).toFixed(1) + ' kW', 10, 320);
    text('The Power Output is ' + (OutputPower*0.00000028).toFixed(1) + ' kW', 10, 340);
    text('The Speed is ' + (Velocity).toFixed(0) + ' rpm', 10, 360);
}