function DisplayModuleCondition(){
  //
  if (StageOfOperation<2){image(IconReady,30,2)}else{image(IconRunning,30,2)}
  //Knobs
  KnobSyncronization.DrawOperationKnob();
  KnobDemand.DrawOperationKnob();
  KnobRequest.DrawOperationKnob();
  //
  push();
  fill(0, 102, 153);
  textSize(32);
  if(StageOfOperation==0){
    if(KnobRequest.P==0){
      text('Motor No Solicitado',110,40);
    }else if(KnobRequest.P==1){
      if(PrimaryWaterTemperature.ActualValue < 40){
        text('MAN : No listo para el arranque',110,40);
      }else{
        text('Arranque manual Motor en espera',110,40);        
      }
    }else{
      if(PrimaryWaterTemperature.ActualValue < 40){
        text('AUT : No listo para el arranque',110,40);
      }else{
        text('Arranque automatico Motor en espera',110,40);
      }
    }
  }else if(StageOfOperation==1){
    if (OilPressure.ActualValue < 1){
      text('Preparativos de arranque en curso',110,40);
    }else{
      if(PostrefrigerationIsActive.AmIOn==true){
        text('Programa de parada: postrefrigeracion',110,40);
      }else{
        if (KnobRequest.P==2){
          text('Arranque automático en curso',110,40);     
        }else{
          text('Arrancar motor (Pulsador de arranque)',110,40);          
        }
      }
    }
  }else if(StageOfOperation==2){
    if (Velocity.ActualValue < 800){
      text('Arranque automático en curso',110,40);       
    }else if(Velocity.ActualValue < 1400){
      text('Marcha de Inercia',110,40);
    }else if(KnobSyncronization.P !== 2){
      text('Motor funcionando en vacio - ...',110,40);
    }else{
      text('Funcionando en vacio sync Imp/carga',110,40);      
    }
  }else{
      text('Servicio en paralelo con la red',110,40);
  }
  textSize(45);
  fill(255, 255, 255);
  ElectricPa.AddNoiseIfNotNull(xoffNoise+2.38,0,750,55);
  textSize(30);
  text('kW',850,55);
  pop()
}
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
let ActivationOfDOMS = [
  function (){
    WhichScreenAmISeeing = 0;
    SetPointDialogBox.show();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 1;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();      
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 2;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 3;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.show();
    LEANOXt12DialogBox.show();
    LEANOXt21DialogBox.show();
    LEANOXt22DialogBox.show();
    LEANOXt1OffsetDialogBox.show();
  },function (){
    WhichScreenAmISeeing = 4;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.show();
    LEANOXP2DialogBox.show();
    LEANOXp21DialogBox.show();
    LEANOXp22DialogBox.show();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 5;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 6;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();  
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 7;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();  
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 8;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();  
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 9;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();  
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 10;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 11;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  },function (){
    WhichScreenAmISeeing = 12;
    SetPointDialogBox.hide();
    LEANOXP1DialogBox.hide();
    LEANOXP2DialogBox.hide();
    LEANOXp21DialogBox.hide();
    LEANOXp22DialogBox.hide();
    LEANOXt11DialogBox.hide();
    LEANOXt12DialogBox.hide();
    LEANOXt21DialogBox.hide();
    LEANOXt22DialogBox.hide();
    LEANOXt1OffsetDialogBox.hide();
  }
]
function UploadDOMsParameters(){
  //Update the SetPointOfPower
  SetPointPower.EqValue=SetPointDialogBox.value();
  if (SetPointPower.EqValue>1415){
    SetPointPower.EqValue=1415;
  }else if(
    SetPointPower.EqValue<707 && KnobRequest.P==2){SetPointPower.EqValue=707;
  }else if(SetPointPower.EqValue<0){SetPointPower.EqValue=0}
  //Update The Leanox Curve Under 400
  CurveLeanox1[0]=[float(LEANOXt11DialogBox.value()),float(LEANOXt12DialogBox.value())];
  CurveLeanox1[1]=[float(LEANOXt21DialogBox.value()),float(LEANOXt22DialogBox.value())];
  CurveLeanox1Offset=float(LEANOXt1OffsetDialogBox.value());
  //Update The Leanox Curve Over 400
  CurveLeanox2[0]=[float(LEANOXP1DialogBox.value()),float(LEANOXp21DialogBox.value()/1000)];
  CurveLeanox2[1]=[float(LEANOXP2DialogBox.value()),float(LEANOXp22DialogBox.value()/1000)];
}