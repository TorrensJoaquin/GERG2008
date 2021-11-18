let OperationalMessages=[];
let AlarmIsActive=false;
let WarningIsActive=false;
function AddAMessageToTheOperationalMessages(Text,OM0WA1AL2){
  let TemporaryMessage=[];
  TemporaryMessage[0]=Text;
  if(OperationalMessages.length>30){OperationalMessages.pop()}
  OperationalMessages.unshift(TemporaryMessage);
  if(OM0WA1AL2==1){WarningIsActive=false}
  if(OM0WA1AL2==2){AlarmIsActive=false}
}
function RefreshALM(){
  for(let i=1;i < OperationalMessages.length; i++){
    text(OperationalMessages(1),100,85+20*i);
  }
}
function RunTheAlarmMonitoring(){
  if(GridMonitoringRelayTrip==true){AddAMessageToTheOperationalMessages('Fallo de Red',2)}
  if(ChargePressure>1.75){AddAMessageToTheOperationalMessages('Alta presión del circuito de Mezcla',2)}
  if(StageOfOperation==0){
    if(PrimaryWaterPressure>1.75){AddAMessageToTheOperationalMessages('Alta presión del circuito de Camisas',2)}
    if(ChargeTemperature>55){AddAMessageToTheOperationalMessages('Alta temperatura del circuito de Mezcla',2)}
    if(Tecjet.ActualValue==100){AddAMessageToTheOperationalMessages('Apertura Máxima de Valvula de Gas sin alcanzar nivel de gas',1)}
  }else if(StageOfOperation==1){
  }else if(StageOfOperation==2){
    if(OilPressure.ActualValue < 3.3){AddAMessageToTheOperationalMessages('Baja Presión de Aceite',2)}
    if(OilPressure.ActualValue < 3.5){AddAMessageToTheOperationalMessages('Baja Presión de Aceite',1)}
  }else if(StageOfOperation==3){
  }else if(StageOfOperation==3){
  }
}