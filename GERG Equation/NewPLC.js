// NewStageOfOperation
let CommonHMItext = '';
let OperationalMessages=[];
let EngineAlarmed = false;
let EngineWarned = false;
let SpeedControllerActive = 800;
let CheckingIfEngineIsDemanded = 0;
let WaitForPrelubricationPump = 0;
let WaitToOpeningGas = 0;
let PostRefrigeration = 0;
let Syncronizing = 0;
let StartSpeed = 360;
let MinimumPrelubricationPressure = 0.2;
let StageOfOperation = [
    function (){
        // // StageOfOperation = 0;
        // AVISO: No Disponible para el Arranque.
        CommonHMItext = 'No Disponible para el Arranque.';
        // Knob en Automatico.
        // Can go to Stagge 1.
        if(KnobDemand.P==0 &&
           KnobRequest.P==2 &&
           PrimaryWaterTemperature.ActualValue > 40 &&
           EngineAlarmed == false){
           StageOfOperation = 1;
        }
        // Can go to Stagge 12.
        if(KnobRequest.P==1){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 1;
        // AVISO: Arranque automatico motor en espera.
        CommonHMItext = 'Arranque automatico motor en espera.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
            CheckingIfEngineIsDemanded = 0;
        }
        // Can go to Stagge 2.
        CheckingIfEngineIsDemanded += 0.01;
        if(CheckingIfEngineIsDemanded > 20){
            StageOfOperation = 2;
            CheckingIfEngineIsDemanded = 0;
        }
        // Can go to Stagge 13.
        if(KnobRequest.P==1){
            StageOfOperation = 13;
            CheckingIfEngineIsDemanded = 0;
        }
    },function (){
        // // StageOfOperation = 2;
        // AVISO: Preparativos de arranque en curso.
        CommonHMItext = 'Preparativos de arranque en curso.';
        // Knob en Automatico.
        // Turn On prelubrication pump.
        // 6 segundos a partir de la autorización por el circuito de seguridad.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
            WaitForPrelubricationPump = 0;
        }
        // Can go to Stage 3.
        if(PrelubricationPressure > MinimumPrelubricationPressure){
            WaitForPrelubricationPump += 0.01;
        }
        if(WaitForPrelubricationPump > 2){
            StageOfOperation = 3;
            WaitForPrelubricationPump = 0;
        }
        // Can go to Stage 14.
        if(KnobRequest.P == 1){
            StageOfOperation = 14;
            WaitForPrelubricationPump = 0;
        }
    },function (){
        // // StageOfOperation = 3;
        // AVISO: Arranque automático en curso.
        CommonHMItext = 'Arranque automático en curso.';
        // Knob en Automatico.
        // Wait For Confirmation - Turn on Gas.
        if(IsStarterOn == true &&
            IgnitionOn == true){
            if(DoubleSelenoideValveOpen == false){
                WaitToOpeningGas += 0.01;
            }else{
                if(WaitToOpeningGas > 0.5){
                    DoubleSelenoideValveOpen = true;
                }
            }
        }
        // Turn On Starter.
        IsStarterOn == true;
        // Turn On Ignition.
        IgnitionOn == true;
        // Can go to Stage 0.
        if(EngineAlarmed == true ||
            KnobRequest.P == 1){
            StageOfOperation = 0;
        }
        // Can go to Stage 4.
        if(Velocity > StartSpeed){
            StageOfOperation = 4;
        }
    },function (){
        // // StageOfOperation = 4;
        // AVISO: Programa de arranque: Motor acelerando.
        CommonHMItext = 'Programa de arranque: Motor acelerando.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true ||
            KnobRequest.P == 1){
            StageOfOperation = 0;
        }
        // Can go to Stage 5.
        if(Velocity > StartSpeed){
            StageOfOperation = 5;
        }
    },function (){
        // // StageOfOperation = 5;
        // AVISO: Motor funcionando en vacio - …
        CommonHMItext = 'Motor funcionando en vacio - …';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
        // Can go to Stage 6.
        if(KnobSyncronization.P == 2){
            StageOfOperation = 6;
        }
    },function (){
        // // StageOfOperation = 6;
        // AVISO: Motor funcionando en vacio sincronizacion Imposicion de carga.
        CommonHMItext = 'Motor funcionando en vacio sincronizacion Imposicion de carga.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
            Syncronizing = 0;
        }
        // Can go to Stage 18.
        if(KnobRequest.P == 1){
            StageOfOperation = 18;
        }
        // Can go to Stage 7.
        Syncronizing += 0.01;
        if(Syncronizing > 2 &&
            Velocity < 1501 &&
            Velocity > 1499){
            StageOfOperation = 7;
            Syncronizing = 0;
        }
    },function (){
        // // StageOfOperation = 7;
        // AVISO: Servicio en paralelo con la red.
        CommonHMItext = 'Servicio en paralelo con la red.';
        // Knob en Automatico.
        // Output power menor a 400 kW.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
        // Can go to Stage 19.
        if(KnobRequest.P == 1){
            StageOfOperation = 19;
        }
        // Can go to Stage 8.
        if(OutputPower > 400){
            StageOfOperation = 8;
        }
        // Can go to Stage 5.
        if(IsCBClosed == false){
            StageOfOperation = 5;
        }
    },function (){
        // // StageOfOperation = 8;
        // AVISO: Servicio en paralelo con la red.
        CommonHMItext = 'Servicio en paralelo con la red.';
        // Knob en Automatico.
        // Output power mayor a 400 kW.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
        // Can go to Stage 20.
        if(KnobRequest.P == 1){
            StageOfOperation = 20;
        }
        // Can go to Stage 7.
        if(OutputPower < 400){
            StageOfOperation = 7;
        }
        // Can go to Stage 5.
        if(IsCBClosed == false){
            StageOfOperation = 5;
        }
    },function (){
        // // StageOfOperation = 9;
        // AVISO: Programa de parada: postrefrigeracion.
        CommonHMItext = 'Programa de parada: postrefrigeracion.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
        // Can go to Stage 10.
        PostRefrigeration += 0.01
        if(PostRefrigeration > 3){
            StageOfOperation = 10;
        }
    },function (){
        // // StageOfOperation = 10;
        // AVISO: Programa de parada: Secuencia de paro.
        CommonHMItext = 'Programa de parada: Secuencia de paro.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
    },function (){
        // // StageOfOperation = 11;
        // AVISO: Arranque automático. Motor en espera.
        CommonHMItext = 'Arranque automático. Motor en espera.';
        // Knob en Automatico.
        // Can go to Stage 0.
        if(EngineAlarmed == true){
            StageOfOperation = 0;
        }
        WaitForPrelubricationPump += 0.01;
        if(WaitForPrelubricationPump > 6){
            StageOfOperation = 0;
            WaitForPrelubricationPump = 0;
        }
    },function (){
        // // StageOfOperation = 12;
        // AVISO: No Disponible para el Arranque.
        CommonHMItext = 'No Disponible para el Arranque.';
        // Knob en Manual.
        // Can go to Stage 0
        if (KnobRequest.P==2){
            StageOfOperation = 0;
        }
        // Can go to Stage 13
        // Can go to Stagge 12.
        if(KnobRequest.P==1){
            StageOfOperation = 12;
        }        
    },function (){
        // // StageOfOperation = 13;
        // AVISO: Arranque manual motor en espera.
        CommonHMItext = 'Arranque manual motor en espera.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 14;
        // AVISO: Preparativos de arranque en curso.
        CommonHMItext = 'Preparativos de arranque en curso.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 15;
        // AVISO: Arrancar motor (Pulsador de arranque).
        CommonHMItext = 'Arrancar motor (Pulsador de arranque).';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 16;
        // AVISO: Programa de arranque-Motor arrancando.
        CommonHMItext = 'Programa de arranque-Motor arrancando.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 17;
        // AVISO: Motor funcionando en vacío - …
        CommonHMItext = 'Motor funcionando en vacío - …';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 18;
        // AVISO: Motor funcionando en vacio Sincronización/Imposición de carga.
        CommonHMItext = 'Motor funcionando en vacio Sincronización/Imposición de carga.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 19;
        // AVISO: Servicio en paralelo con la red.
        CommonHMItext = 'Servicio en paralelo con la red.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 20;
        // AVISO: Servicio en paralelo con la red.
        CommonHMItext = 'Servicio en paralelo con la red.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
    },function (){
        // // StageOfOperation = 21;
        // AVISO: Arranque manual motor en espera.
        CommonHMItext = 'Arranque manual motor en espera.';
        // Knob en Manual.
        // Can go to Stage 12.
        if(EngineAlarmed == true){
            StageOfOperation = 12;
        }
        WaitForPrelubricationPump += 0.01;
        if(WaitForPrelubricationPump > 6){
            StageOfOperation = 0;
            WaitForPrelubricationPump = 0;
        }
    }
]