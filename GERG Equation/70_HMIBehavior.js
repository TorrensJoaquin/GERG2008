function CheckIfAButtomIsPressed(){
    StartButtomPushed=false;
    if(mouseIsPressed){
      if (mouseY > 597 && mouseY < 640){
        if (mouseX > 7 && mouseX < 56) {
          StartButtomPushed=true;
          DrawTheCircle(15,600);
          return;
        }
        if (mouseX > 63 && mouseX < 115) {
          DrawTheCircle(71,600);
          return;
        }
        if (mouseX > 469 && mouseX < 519) {
          DrawTheCircle(475,600);
          return;
        }
        if (mouseX > 528 && mouseX < 577) {
          DrawTheCircle(533,600);
          return;
        }
      }
      if(mouseY > 536 && mouseY < 586){
        if (mouseX > 525 && mouseX < 578) {
          DrawTheCircle(533,545);
          return;
        }
      }
    }
}
function mousePressed() {
    UploadDOMsParameters()
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {fullscreen(true) }  
    if (mouseY > 536 && mouseY < 586){
      if (mouseX > 6 && mouseX < 56) {
        ActivationOfDOMS[0]();
        return;
      }
      if (mouseX > 64 && mouseX < 110) {
        ActivationOfDOMS[1]();
        return;
      }    
      if (mouseX > 122 && mouseX < 172) {
        ActivationOfDOMS[2]();
        return;
      }
      if (mouseX > 182 && mouseX < 232) {
        ActivationOfDOMS[3]();
        return;
      }
      if (mouseX > 238 && mouseX < 290) {
        ActivationOfDOMS[4]();
        return;
      }
      if (mouseX > 297 && mouseX < 347) {
        ActivationOfDOMS[5]();
        return;
      }
      if (mouseX > 355 && mouseX < 405) {
        ActivationOfDOMS[6]();
        return;
      }
      if (mouseX > 412 && mouseX < 462) {
        ActivationOfDOMS[7]();
        return;
      }
      if (mouseX > 469 && mouseX < 520){
        ActivationOfDOMS[10]();
        return;
      }
    }  
    if (mouseY > 597 && mouseY < 640){
      //Stop Manual
      if (mouseX > 64 && mouseX < 110) {
        GoingToStage0();
        return;
      }
      //Close CB Manual
      if (mouseX > 470 && mouseX < 520) {
        DrawTheCircle(475,601);
        if(StageOfOperation==2 && KnobSyncronization.P==0){
          TheCBProccessIsRequested=true;
        }
        return;
      }
      //Open CB Manual
      if (mouseX > 529 && mouseX < 579) {
        DrawTheCircle(533,601);
        if (StageOfOperation>2 && KnobSyncronization.P==0){
          PostlubricationIsActive.ActivateTimer();
          GoingToStage2();
        }
        return;
      }
      if (mouseX > 122 && mouseX < 175){
        ActivationOfDOMS[12]();
        return;
      }
      if (mouseX > 412 && mouseX < 462) {
        ActivationOfDOMS[8]();
        return;
      }
      if (mouseX > 355 && mouseX < 407) {
        ActivationOfDOMS[9]();
        return;
      }
      if (mouseX > 296 && mouseX < 349) {
        ActivationOfDOMS[11]();
        return;
      }
    }
    KnobSyncronization.ChangeKnobPosition();
    KnobDemand.ChangeKnobPosition();
    KnobRequest.ChangeKnobPosition();
}
function DrawTheCircle(X,Y){
    push();
    noStroke();
    fill(12,245,30,254);
    circle(X,Y,12)
    pop();
}
function AddAMessageToTheOperationalMessages(Text,OM0WA1AL2){
  let TemporaryMessage=[];
  TemporaryMessage[0]=Text;
  if(OperationalMessages.length>30){OperationalMessages.pop()}
  OperationalMessages.unshift(TemporaryMessage);
  if(OM0WA1AL2==1){EngineWarned=false}
  if(OM0WA1AL2==2){EngineAlarmed=false}
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