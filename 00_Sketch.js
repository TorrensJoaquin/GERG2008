let IconReady;
let IconRunning;
let Screens=[];
function preload() {
  IconReady = loadImage('90_Background/91_Ready.png');
  IconRunning = loadGif('90_Background/92_Running.gif');
  Screens[0] = loadImage('90_Background/90_0_MAIN.png');
  Screens[1] = loadImage('90_Background/90_1_1_ELE.png');
  Screens[2] = loadImage('90_Background/90_2_HYD.png');
  Screens[3] = loadImage('90_Background/90_3_GAS.png');
  Screens[4] = loadImage('90_Background/90_4_ENG.png');
  Screens[5] = loadImage('90_Background/90_5_CYL.png');
  Screens[6] = loadImage('90_Background/90_6_EXH.png');
  Screens[7] = loadImage('90_Background/90_7_CTR.png');
  Screens[8] = loadImage('90_Background/90_8_SEG.png');
  Screens[9] = loadImage('90_Background/90_9_TESTO.png');
  Screens[10] = loadImage('90_Background/90_10_ALARM.png');
  Screens[11] = loadImage('90_Background/90_11_XRAY.png');
  Screens[12] = loadImage('90_Background/90_12_BROKEN.png');
}
function setup() {
  //frameRate(4);
  createCanvas(900, 650);
  GoingToStage0();
  DrawDOMElements();
  //DOMs Of Stage 0
  ActivationOfDOMS[0]();
  UploadDOMsParameters();
}
function draw() {
  ShouldIChangeTheStageOfOperation();
  UploadTheEqValues();
  UploadTheActualValues();
  DrawMyScreen();
  DisplayModuleCondition();
  CheckIfAButtomIsPressed();
}
function DrawDOMElements(){
  SetThePowerSetPoint();
  SetLEANOXP1();
  SetLEANOXP2();
  SetLEANOXp21();
  SetLEANOXp22();
  SetLEANOXt11();
  SetLEANOXt12();
  SetLEANOXt21();
  SetLEANOXt22();
  SetLEANOXt1Offset();
}
function DrawMyScreen(){
  background(Screens[WhichScreenAmISeeing]);
  if (WhichScreenAmISeeing == 0){
    RefreshMains();
    DrawTheCircle(12.5,543.5);
    return;
  }
  if (WhichScreenAmISeeing == 1){
    RefreshELE();
    DrawTheCircle(70,543.5);
    return;
  }
  if (WhichScreenAmISeeing == 2){
    RefreshHYD();
    DrawTheCircle(128.5,543.5);
    return;
  }
  if(WhichScreenAmISeeing == 3){
    RefreshGAS();    
    DrawTheCircle(187,544.5);
    return;
  }
  if(WhichScreenAmISeeing == 4){
    RefreshENG();
    DrawTheCircle(245,543.5);
    return;
  }
  if(WhichScreenAmISeeing == 5){
    RefreshCYL();
    DrawTheCircle(303,543.5);
    return;
  }
  if(WhichScreenAmISeeing == 6){
    RefreshEXH();
    DrawTheCircle(361,543.5);
    return;
  }
  if(WhichScreenAmISeeing == 7){
    DrawTheCircle(418,543.5);
    return;
  }
  if(WhichScreenAmISeeing == 8){
    RefreshSEG();
    DrawTheCircle(417,601);
    return;
  }
  if(WhichScreenAmISeeing == 9){
    RefreshTESTO();
    DrawTheCircle(361,601);
    return;
  }
  if(WhichScreenAmISeeing == 10){
    RefreshALM();
    DrawTheCircle(476,544);
    return;
  }
  if(WhichScreenAmISeeing == 11){
    RefreshXRAY();
    DrawTheCircle(303,601);
    return;
  }
  if(WhichScreenAmISeeing == 12){
    RefreshBROKEN();
    DrawTheCircle(129,601);
    return;
  }
}