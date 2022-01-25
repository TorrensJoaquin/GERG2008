const OptimalAmountsOfComponentsRepresentedInTheTernary = 3;
let a=zeros([20, 7, 6]);
let MinVmaxOverVSum=zeros2(12, 19);
let TernaryComponents=zeros2(19, 12); //HotOne matrix of components inside a specific ternary
let xyzOfTernary=zeros2(19, 4);
let CompensationForShortTernary=Array(19).fill(0);
let xMax=Array(21).fill(0);
let xMin=Array(21).fill(0);
let yMax=Array(21).fill(0);
let yMin=Array(21).fill(0);
let zMax=Array(21).fill(0);
let zMin=Array(21).fill(0);
let StandardDeviationOfTheSolver;
let CheckIfAnImprovementIsDoneInTheLastXMovements;
let NAji;
let VAji;
let SumOfNAjiComponentsInTheTernary;
function RunTestOfTheAlgortihm(){
    let Result = MethaneNumberMWM(83.5, 3.47, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0);
    let RealResult = 90.2;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(82.43, 3, 0.2, 0, 0.27, 0, 0.1, 0, 13, 1, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 85.03;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(94.68, 3.2, 1.05, 0, 0.47, 0, 0.2, 0, 0.2, 0.2, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 80.0;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(86.3, 8.7, 1.6, 0, 0.3, 0, 0, 0, 0.8, 2.3, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 75.03;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(87.34, 7, 2.2, 0, 0.41, 0, 0.11, 0.2, 0.74, 2, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 70.02;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(84.62, 8, 1.7, 0, 1.47, 0, 0.51, 0, 3.7, 0, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 65.0;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(85.58, 5.7, 2.1, 0, 0.9, 0, 0.82, 0.6, 0.4, 3.9, 0, 0, 0, 0, 0, 0, 0);
    RealResult = 59.97;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(15, 5, 5, 0, 5, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0);
    RealResult = 20.48;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(80, 5, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0);
    RealResult = 53.2;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(70, 5, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0);
    RealResult = 41.25;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(10, 5, 5, 0, 5, 0, 0, 0, 0, 0, 65, 0, 0, 0, 5, 5, 0);
    RealResult = 19.58;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(65, 5, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5);
    RealResult = 35.02;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(5, 5, 5, 0, 5, 0, 0, 0, 0, 0, 50, 20, 0, 0, 5, 5, 0);
    RealResult = 23.89;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(75, 5, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5);
    RealResult = 44.15;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(55, 5, 5, 0, 5, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 10);
    RealResult = 30.43;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
    Result = MethaneNumberMWM(5, 2, 2, 0, 2, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0);
    RealResult = 9.73;
    console.log(Result.toFixed(1) + ' -> ' + RealResult + ' -> difference: ' + (Result - RealResult).toFixed(2));
}
function ReInitializeValues(){
    StandardDeviationOfTheSolver = 5;
    CheckIfAnImprovementIsDoneInTheLastXMovements = true;
    NAji=zeros2(12, 19);
    VAji=zeros2(12, 19);
}
function MethaneNumberMWM(x){
    //function MethaneNumberMWM(Methane, Ethane, Propane, iButane, nButane, ipentane, npentane, Hexanes, Nitrogen, CarbonDioxide, Hydrogen, CarbonMonoxide, Butadiene, Butylene, Ethylene, Propylene, HydrogenSulphide){
    Methane = this.x[1];
    Ethane = this.x[4];
    Propane = this.x[5];
    iButane = this.x[6];
    nButane = this.x[7];
    ipentane = this.x[8];
    npentane = this.x[9];
    Hexanes = this.x[10];
    Nitrogen = this.x[2];
    CarbonDioxide = this.x[3];
    Hydrogen = this.x[15];
    CarbonMonoxide = this.x[17];
    Butadiene = 0;
    Butylene = 0;
    Ethylene = 0;
    Propylene = 0;
    HydrogenSulphide = this.x[19];
    //
    let SimplifiedChromatografy;
    let MethaneNumberMWMWithoutInerts;
    UploadTheCoefficients();
    ReInitializeValues();
    SimplifiedChromatografy = SimplifyChromatografy(Methane, Ethane, Propane, iButane, nButane, ipentane, npentane, Hexanes, Nitrogen, CarbonDioxide, Hydrogen, CarbonMonoxide, Butadiene, Butylene, Ethylene, Propylene, HydrogenSulphide);
    MethaneNumberMWMWithoutInerts = CalculateMethaneNumberMWM(SimplifiedChromatografy);
    return MethaneNumberMWMWithoutInerts + CorrectingMethaneNumberWithInerts(Methane, Ethane, Propane, iButane, nButane, ipentane, npentane, Hexanes, Nitrogen, CarbonDioxide, Hydrogen, CarbonMonoxide, Butadiene, Butylene, Ethylene, Propylene, HydrogenSulphide) - 100.0003;
}
function CorrectingMethaneNumberWithInerts(Methane, Ethane, Propane, iButane, nButane, ipentane, npentane, Hexanes, Nitrogen, CarbonDioxide, Hydrogen, CarbonMonoxide, Butadiene, Butylene, Ethylene, Propylene, HydrogenSulphide){
    let ResultVariable = 0;
    let NewMethaneContent = Methane + Ethane + Propane + iButane + nButane + ipentane + npentane + Hexanes + Hydrogen + CarbonMonoxide + Butadiene + Butylene + Ethylene + Propylene + HydrogenSulphide;
    let SumOfComponents = NewMethaneContent + CarbonDioxide + Nitrogen;
    NewMethaneContent = NewMethaneContent * 100 / (SumOfComponents - Nitrogen);
    CarbonDioxide = CarbonDioxide * 100 / (SumOfComponents - Nitrogen);
//  NewMethaneContent = NewMethaneContent * SumOfComponents / (NewMethaneContent + CarbonDioxide)
//  CarbonDioxide = CarbonDioxide * SumOfComponents / (NewMethaneContent + CarbonDioxide)
    for(let i = 0; i<8; i++){
        for(let j = 0; j<7; j++){
            ResultVariable += a[20][i][j] * Math.pow(NewMethaneContent, i) * Math.pow(CarbonDioxide, j);
        }
    }
    return ResultVariable;
}
function CalculateMethaneNumberMWM(SimplifiedChromatografy){
    let ResultVariable = 0;
    let IsThisComponentPresentHotOnes = Array(12).fill(false);
    let IsThisComponentPresentInThisTernaryHotOnes = [];
    let HowManyComponentsAreRepresentedInThisTernary = Array(19).fill(0);
    let HowManyTimesIsTheComponentRepresented=Array(12).fill(0);
    let AffinitiesOfEachTernary=Array(19).fill(0);
    let WillWeBeUsingThisTernaryHotOnes=Array(19).fill(false);
    let MinimumNAji=zeros2(12, 19);
    //
    CalculateIsThisComponentPresentHotOnes(SimplifiedChromatografy, IsThisComponentPresentHotOnes);
    CalculateHowManyComponentsAreRepresentedInThisTernary(IsThisComponentPresentHotOnes, HowManyComponentsAreRepresentedInThisTernary);
    CalculateAffinitiesOfEachTernary(SimplifiedChromatografy, AffinitiesOfEachTernary);
    CalculateHowManyTimesIsTheComponentRepresented(HowManyComponentsAreRepresentedInThisTernary, AffinitiesOfEachTernary, IsThisComponentPresentHotOnes, HowManyTimesIsTheComponentRepresented, WillWeBeUsingThisTernaryHotOnes);
    //
    let RangeMinMaxAvgValueOfTheResult=Array(3).fill(0);
    let ActualMinimumRangeOfTheResultAchieved = 0;
    let WhichCalculatedMethaneNumber = 1;
    IsThisComponentPresentInThisTernaryHotOnes = GetMeIsThisComponentPresentInThisTernaryHotOnes(IsThisComponentPresentHotOnes, WillWeBeUsingThisTernaryHotOnes, TernaryComponents);
    for(let x = 0; x<10000; x++){
        let CalculatedMethaneNumbers = [];
        CalculateVAji(IsThisComponentPresentInThisTernaryHotOnes, SimplifiedChromatografy, x, MinimumNAji);
        if(IsThisCompositionInsideBoundarys()){
            CalculateMethaneNumber(WillWeBeUsingThisTernaryHotOnes, CalculatedMethaneNumbers, RangeMinMaxAvgValueOfTheResult);
            if(ActualMinimumRangeOfTheResultAchieved == 0 || RangeMinMaxAvgValueOfTheResult[0] < ActualMinimumRangeOfTheResultAchieved){
                ResultVariable = 0;
                ActualMinimumRangeOfTheResultAchieved = RangeMinMaxAvgValueOfTheResult[0];
                CheckIfAnImprovementIsDoneInTheLastXMovements = true;
                for(let i = 1; i < 19; i++){
                    if (WillWeBeUsingThisTernaryHotOnes[i]){
                        ResultVariable += CalculatedMethaneNumbers[WhichCalculatedMethaneNumber] * SumOfNAjiComponentsInTheTernary[i] * 0.01;
                        WhichCalculatedMethaneNumber += 1;
                        for(let j = 1; j<12; j++){
                            MinimumNAji[j][i] = NAji[j][i];
                        }
                    }
                }
                //console.log ("Iteracion N°: " + x.toString() + " : " + (RangeMinMaxAvgValueOfTheResult[2]).toFixed(3).toString() + " " + RangeMinMaxAvgValueOfTheResult[1].toFixed(3).toString() + " " + RangeMinMaxAvgValueOfTheResult[2].toFixed(3).toString() + "  MN: " + ResultVariable.toFixed(3).toString() + "  Rango: " + RangeMinMaxAvgValueOfTheResult[1].toFixed(2).toString() + " " + StandardDeviationOfTheSolver.toString());
                WhichCalculatedMethaneNumber = 1;
                if(RangeMinMaxAvgValueOfTheResult[0] < 0.01){
                    break;
                }
            }
        }
    }
    // I could run a newton rapson in here. calculating each component of VAji
    return ResultVariable;
}
function CalculateMethaneNumber(WillWeBeUsingThisTernaryHotOnes, CalculatedMethaneNumbers, RangeMinMaxAvgValueOfTheResult){
    CalculatedMethaneNumbers[1] = 0;
    for(let i = 0; i < 19; i++){
        if(WillWeBeUsingThisTernaryHotOnes[i]){
            if(CalculatedMethaneNumbers[1] != 0){
                CalculatedMethaneNumbers.push(0);
            }
            CalculatedMethaneNumbers[CalculatedMethaneNumbers.length-1] = FunctionA3(i);
        }
    }
    //This value is important. Is going to be the Objective Function
    RangeMinMaxAvgValueOfTheResult[1] = arrayMin(CalculatedMethaneNumbers);
    RangeMinMaxAvgValueOfTheResult[2] = arrayMax(CalculatedMethaneNumbers);
    RangeMinMaxAvgValueOfTheResult[0] = RangeMinMaxAvgValueOfTheResult[2] - RangeMinMaxAvgValueOfTheResult[1];
}
function CalculateVAji(IsThisComponentPresentInThisTernaryHotOnes, SimplifiedChromatografy, x, MinimumNAji){
    //Create The first stage of FractionOfComponentInsideTernary.
    let FractionOfComponentInsideTernary=zeros2(12, 19);
    let RelationshipBetweenRandomNumbersAndTotalVolume=Array(12).fill(0);
    //This is the pathfinding solver changing the presition.
    if (x % 500 == 0){
        if (CheckIfAnImprovementIsDoneInTheLastXMovements == false){
            StandardDeviationOfTheSolver *= 0.75;
        }
        CheckIfAnImprovementIsDoneInTheLastXMovements = false;
    }
    //
    for(let i = 0; i<19; i++){
        for(let j = 0; j<12; j++){
            if(IsThisComponentPresentInThisTernaryHotOnes[j][i]){
                FractionOfComponentInsideTernary[j][i] = RandomizedNumberWithEvolutiveApproach(x, MinimumNAji, j, i);
                RelationshipBetweenRandomNumbersAndTotalVolume[j] += FractionOfComponentInsideTernary[j][i];
            }
        }
    }
    //Create The second stage of FractionOfComponentInsideTernary -> NAji.
    SumOfNAjiComponentsInTheTernary=Array(19).fill(0);
    for(let i = 0; i < 19; i++){
        for(let j = 0; j < 12; j++){
            if(IsThisComponentPresentInThisTernaryHotOnes[j][i]){
                NAji[j][i] = FractionOfComponentInsideTernary[j][i] * SimplifiedChromatografy[j] / RelationshipBetweenRandomNumbersAndTotalVolume[j];
                SumOfNAjiComponentsInTheTernary[i] += NAji[j][i];
            }
        }
    }
    //Calculate VAji
    for(let i = 0; i<19; i++){
        for(let j = 0; j<12; j++){
            if(NAji[j][i] != 0){
                VAji[j][i] = NAji[j][i] * 100 / SumOfNAjiComponentsInTheTernary[i];
            }
        }
    }
}
function RandomizedNumberWithEvolutiveApproach(x, MinimumNAji, j, i){
    let AuxResult;
    if (Math.floor(x / 1000) == 0){
        AuxResult = Math.random() * StandardDeviationOfTheSolver;
    }else{
        AuxResult = Math.random() * StandardDeviationOfTheSolver + MinimumNAji[j][i];
    }
    return AuxResult;
}
function CalculateHowManyTimesIsTheComponentRepresented(HowManyComponentsAreRepresentedInThisTernary, AffinitiesOfEachTernary, IsThisComponentPresentHotOnes, HowManyTimesIsTheComponentRepresented, WillWeBeUsingThisTernaryHotOnes){
    //Inputs: HowManyComponentsAreRepresentedInThisTernary() as byte,AffinitiesOfEachTernary() as Single,IsThisComponentPresentHotOnes () as byte
    //Outputs: HowManyTimesIsTheComponentRepresented() as byte,WillWeBeUsingThisTernaryHotOnes() as boolean,IsThisComponentPresentInThisTernaryHotOnes() as boolean
    let TernaryCoveredInTheLastIteration;
    let ActualTernarySelected;
    let MinimumAmmountOfAceptableTernaryMixtures;
    for(let RunAgainTheTernarySelectionAnalysis = 1; RunAgainTheTernarySelectionAnalysis < 6; RunAgainTheTernarySelectionAnalysis++){
        TernaryCoveredInTheLastIteration=Array(19).fill(false);
        for(let CurrentComponentInAnalisys = 1; CurrentComponentInAnalisys < 12; CurrentComponentInAnalisys++){
            MinimumAmmountOfAceptableTernaryMixtures = DoIAlreadyHaveTheMinimumAmmountOfAceptableTernaryMixtures(IsThisComponentPresentHotOnes, TernaryComponents, WillWeBeUsingThisTernaryHotOnes);
            if(MinimumAmmountOfAceptableTernaryMixtures[0]){break}
            if(MinimumAmmountOfAceptableTernaryMixtures[CurrentComponentInAnalisys] == false && DoIveAlreadyCoveredThisComponentDuringThisIteration(CurrentComponentInAnalisys, TernaryCoveredInTheLastIteration) == false){
                ActualTernarySelected = FindTheNextTernaryToBeSelected(CurrentComponentInAnalisys, HowManyComponentsAreRepresentedInThisTernary, AffinitiesOfEachTernary, WillWeBeUsingThisTernaryHotOnes);
                if(ActualTernarySelected != 0){
                    WillWeBeUsingThisTernaryHotOnes[ActualTernarySelected] = true;
                    TernaryCoveredInTheLastIteration[ActualTernarySelected] = true;
                    ActualTernarySelected = 0;
                }
            }
            if (MinimumAmmountOfAceptableTernaryMixtures[0]){break}
        }
        if(MinimumAmmountOfAceptableTernaryMixtures[0]){break}
    }
}
function DoIveAlreadyCoveredThisComponentDuringThisIteration(CurrentComponentInAnalisys, TernaryCoveredInTheLastIteration){
    let AuxResult = false;
    for(let i = 1; i < 19; i++){
        if(TernaryCoveredInTheLastIteration[i] && MinVmaxOverVSum[CurrentComponentInAnalisys][i] != 0){
            AuxResult = true;
        }
    }
    return AuxResult;
}
function FindTheNextTernaryToBeSelected(CurrentComponentInAnalisys, HowManyComponentsAreRepresentedInThisTernary, AffinitiesOfEachTernary, WillWeBeUsingThisTernaryHotOnes){
    let ActualAffinityOfTheTernarySelected = 0;
    let ActualTernarySelected = 0;
    for (let LowDownMyExpectationOnTheComponentsRepresentedInTheTernary = 0; LowDownMyExpectationOnTheComponentsRepresentedInTheTernary < OptimalAmountsOfComponentsRepresentedInTheTernary; LowDownMyExpectationOnTheComponentsRepresentedInTheTernary++){
        ActualAffinityOfTheTernarySelected = 0;
        ActualTernarySelected = 0;
        for(let i = 1; i < 19; i++){
            if(MinVmaxOverVSum[CurrentComponentInAnalisys][i] > 0 && HowManyComponentsAreRepresentedInThisTernary[i] + CompensationForShortTernary[i] == OptimalAmountsOfComponentsRepresentedInTheTernary - LowDownMyExpectationOnTheComponentsRepresentedInTheTernary && WillWeBeUsingThisTernaryHotOnes[i] == false){
                if(AffinitiesOfEachTernary[i] > ActualAffinityOfTheTernarySelected){
                    ActualAffinityOfTheTernarySelected = AffinitiesOfEachTernary[i];
                    ActualTernarySelected = i;
                }
            }
        }
        if(ActualTernarySelected != 0){
            return ActualTernarySelected;
        }
    }
    return ActualTernarySelected;
}
function GetMeIsThisComponentPresentInThisTernaryHotOnes(IsThisComponentPresentHotOnes, WillWeBeUsingThisTernaryHotOnes, TernaryComponents){
    let IsThisComponentPresentInThisTernaryHotOnes=zeros2(12, 19);
    for(let i = 1; i<19; i++){
        for(let j = 1; j<12; j++){
            if(IsThisComponentPresentHotOnes[j] && WillWeBeUsingThisTernaryHotOnes[i] && TernaryComponents[i][j]){
                IsThisComponentPresentInThisTernaryHotOnes[j][i] = true;
            }
        }
    }
    return IsThisComponentPresentInThisTernaryHotOnes;
}
function DoIAlreadyHaveTheMinimumAmmountOfAceptableTernaryMixtures(IsThisComponentPresentHotOnes, TernaryComponents, WillWeBeUsingThisTernaryHotOnes){
    //let HowManyComponentsAreRepresentedInThisTernary=Array(19).fill(0);
    let HowManyTimesIsTheComponentRepresented=Array(12).fill(0);
    let MinimumAmmountOfAceptableTernaryMixtures=Array(12).fill(true);
    for(let i = 1; i<19; i++){
        for(let j = 1; j<12; j++){
            if(IsThisComponentPresentHotOnes[j] && WillWeBeUsingThisTernaryHotOnes[i] && TernaryComponents[i][j]){
                HowManyTimesIsTheComponentRepresented[j] += 1;
            }
        }
    }
    for(let j = 1; j<12; j++){
        if(IsThisComponentPresentHotOnes[j] && HowManyTimesIsTheComponentRepresented[j] < 2){
            MinimumAmmountOfAceptableTernaryMixtures[0] = false;
            MinimumAmmountOfAceptableTernaryMixtures[j] = false;
        }
    }
    return MinimumAmmountOfAceptableTernaryMixtures;
}
function CalculateAffinitiesOfEachTernary(SimplifiedChromatografy, AffinitiesOfEachTernary){
    for(let j = 0; j<19; j++){
        for(let i = 0; i<12; i++){
            AffinitiesOfEachTernary[j] += SimplifiedChromatografy[i] * MinVmaxOverVSum[i][j];
        }
    }
}
function CalculateHowManyComponentsAreRepresentedInThisTernary(IsThisComponentPresentHotOnes, HowManyComponentsAreRepresentedInThisTernary){
    for(let i = 1; i<19; i++){
        for(let j = 1; j<12; j++){
            if(IsThisComponentPresentHotOnes[j] && TernaryComponents[i][j]){
                HowManyComponentsAreRepresentedInThisTernary[i] += 1;
            }
        }
    }
}
function CalculateIsThisComponentPresentHotOnes(SimplifiedChromatografy, IsThisComponentPresentHotOnes){
    for(let j = 1; j < 12; j++){
        if(SimplifiedChromatografy[j] > 0.05){
            IsThisComponentPresentHotOnes[j] = true;
        }
    }
}
function IsThisCompositionInsideBoundarys(){
    let Answer;
    for(let i = 1; i<19; i++){
        if(xyzOfTernary[i][1] != 0){
            if(VAji[xyzOfTernary[i][1]][i] > xMax[i] && VAji[xyzOfTernary[i][1]][i] < xMin[i]){
                return Answer = false;
            }
        }else if (xyzOfTernary[i][2] != 0){
            if(VAji[xyzOfTernary[i][2]][i] > yMax[i] && VAji[xyzOfTernary[i][2]][i] < yMin[i]){
                return Answer = false;
            }
        }else if(xyzOfTernary[i][3] != 0){
            if(VAji[xyzOfTernary[i][3]][i] > zMax[i] && VAji[xyzOfTernary[i][3]][i] < zMin[i]){
                return Answer = false;
            }
        }
    }
    return Answer = true;
}
function SimplifyChromatografy(Methane, Ethane, Propane, iButane, nButane, ipentane, npentane, Hexanes, Nitrogen, CarbonDioxide, Hydrogen, CarbonMonoxide, Butadiene, Butylene, Ethylene, Propylene, HydrogenSulphide){
    let Result=Array(12).fill(0);
    let SumOfComponents = 0;
    Result[1] = CarbonMonoxide;
    Result[2] = 0; //Butadiene
    Result[3] = 0; //Butylene
    Result[4] = Ethylene;
    Result[5] = Propylene;
    Result[6] = HydrogenSulphide;
    Result[7] = Hydrogen;
    Result[8] = Propane;
    Result[9] = Ethane;
    Result[10] = (iButane + nButane) + (ipentane + npentane) * 2.3 + Hexanes * 5.3 + Butadiene + Butylene;
    Result[11] = Methane;
    for(let j = 1; j < 12; j++){
        SumOfComponents += Result[j];
    }
    for(let j = 1; j < 12; j++){
        Result[j] *= 100 / SumOfComponents;
    }
    return Result;
}
function UploadTheCoefficients(){
    //
    CompensationForShortTernary[12] = 1;
    CompensationForShortTernary[13] = 1;
    CompensationForShortTernary[14] = 1;
    CompensationForShortTernary[15] = 1;
    CompensationForShortTernary[16] = 1;
    CompensationForShortTernary[17] = 2;
    CompensationForShortTernary[18] = 2;
    //XYZ Boundarys
    xMax[1] = 100;
    xMax[2] = 100;
    xMax[3] = 100;
    xMax[4] = 100;
    xMax[5] = 100;
    xMax[6] = 100;
    xMax[7] = 100;
    xMax[8] = 100;
    xMax[9] = 100;
    xMax[10] = 100;
    xMax[11] = 100;
    xMax[12] = 100;
    xMax[13] = 100;
    xMax[14] = 100;
    xMax[15] = 100;
    xMax[16] = 100;
    xMax[17] = 100;
    xMax[18] = 100;
    xMax[20] = 100;
    xMin[9] = 60;
    xMin[10] = 60;
    xMin[11] = 60;
    xMin[17] = 100;
    xMin[18] = 100;
    xMin[20] = 35;
    yMax[1] = 100;
    yMax[2] = 100;
    yMax[3] = 100;
    yMax[4] = 100;
    yMax[5] = 100;
    yMax[6] = 100;
    yMax[7] = 100;
    yMax[8] = 100;
    yMax[9] = 40;
    yMax[10] = 40;
    yMax[11] = 40;
    yMax[12] = 100;
    yMax[13] = 100;
    yMax[14] = 100;
    yMax[15] = 100;
    yMax[16] = 100;
    yMax[20] = 100;
    zMax[1] = 100;
    zMax[2] = 100;
    zMax[3] = 100;
    zMax[4] = 100;
    zMax[5] = 100;
    zMax[6] = 100;
    zMax[7] = 100;
    zMax[8] = 100;
    zMax[9] = 40;
    zMax[10] = 40;
    zMax[11] = 40;
    zMax[20] = 65;
    //XYZ of Ternary components
    xyzOfTernary[1][1] = 11;
    xyzOfTernary[1][2] = 7;
    xyzOfTernary[1][3] = 9;
    xyzOfTernary[2][1] = 8;
    xyzOfTernary[2][2] = 9;
    xyzOfTernary[2][3] = 10;
    xyzOfTernary[3][1] = 7;
    xyzOfTernary[3][2] = 8;
    xyzOfTernary[3][3] = 5;
    xyzOfTernary[4][1] = 11;
    xyzOfTernary[4][2] = 9;
    xyzOfTernary[4][3] = 8;
    xyzOfTernary[5][1] = 11;
    xyzOfTernary[5][2] = 7;
    xyzOfTernary[5][3] = 8;
    xyzOfTernary[6][1] = 11;
    xyzOfTernary[6][2] = 7;
    xyzOfTernary[6][3] = 10;
    xyzOfTernary[7][1] = 11;
    xyzOfTernary[7][2] = 8;
    xyzOfTernary[7][3] = 10;
    xyzOfTernary[8][1] = 11;
    xyzOfTernary[8][2] = 9;
    xyzOfTernary[8][3] = 10;
    xyzOfTernary[9][1] = 11;
    xyzOfTernary[9][2] = 4;
    xyzOfTernary[9][3] = 10;
    xyzOfTernary[10][1] = 11;
    xyzOfTernary[10][2] = 6;
    xyzOfTernary[10][3] = 10;
    xyzOfTernary[11][1] = 11;
    xyzOfTernary[11][2] = 9;
    xyzOfTernary[11][3] = 6;
    xyzOfTernary[12][1] = 11;
    xyzOfTernary[12][2] = 5;
    xyzOfTernary[13][1] = 9;
    xyzOfTernary[13][2] = 5;
    xyzOfTernary[14][1] = 1;
    xyzOfTernary[14][2] = 7;
    xyzOfTernary[15][1] = 9;
    xyzOfTernary[15][2] = 4;
    xyzOfTernary[16][1] = 8;
    xyzOfTernary[16][2] = 4;
    xyzOfTernary[17][1] = 2;
    xyzOfTernary[18][1] = 3;
    TernaryComponents[1][7] = true;
    TernaryComponents[1][9] = true;
    TernaryComponents[1][11] = true;
    TernaryComponents[2][8] = true;
    TernaryComponents[2][9] = true;
    TernaryComponents[2][10] = true;
    TernaryComponents[3][5] = true;
    TernaryComponents[3][7] = true;
    TernaryComponents[3][8] = true;
    TernaryComponents[4][8] = true;
    TernaryComponents[4][9] = true;
    TernaryComponents[4][11] = true;
    TernaryComponents[5][7] = true;
    TernaryComponents[5][8] = true;
    TernaryComponents[5][11] = true;
    TernaryComponents[6][7] = true;
    TernaryComponents[6][10] = true;
    TernaryComponents[6][11] = true;
    TernaryComponents[7][8] = true;
    TernaryComponents[7][10] = true;
    TernaryComponents[7][11] = true;
    TernaryComponents[8][9] = true;
    TernaryComponents[8][10] = true;
    TernaryComponents[8][11] = true;
    TernaryComponents[9][4] = true;
    TernaryComponents[9][10] = true;
    TernaryComponents[9][11] = true;
    TernaryComponents[10][6] = true;
    TernaryComponents[10][10] = true;
    TernaryComponents[10][11] = true;
    TernaryComponents[11][6] = true;
    TernaryComponents[11][9] = true;
    TernaryComponents[11][11] = true;
    TernaryComponents[12][5] = true;
    TernaryComponents[12][11] = true;
    TernaryComponents[13][5] = true;
    TernaryComponents[13][9] = true;
    TernaryComponents[14][1] = true;
    TernaryComponents[14][7] = true;
    TernaryComponents[15][4] = true;
    TernaryComponents[15][9] = true;
    TernaryComponents[16][4] = true;
    TernaryComponents[16][8] = true;
    TernaryComponents[17][2] = true;
    TernaryComponents[18][3] = true;
    //MinVmaxOverVSum
    MinVmaxOverVSum[1][14] = 1;
    MinVmaxOverVSum[2][17] = 1;
    MinVmaxOverVSum[3][18] = 1;
    MinVmaxOverVSum[4][9] = 0.166666667;
    MinVmaxOverVSum[4][15] = 0.416666667;
    MinVmaxOverVSum[4][16] = 0.416666667;
    MinVmaxOverVSum[5][3] = 0.333333333;
    MinVmaxOverVSum[5][12] = 0.333333333;
    MinVmaxOverVSum[5][13] = 0.333333333;
    MinVmaxOverVSum[6][10] = 0.5;
    MinVmaxOverVSum[6][11] = 0.5;
    MinVmaxOverVSum[7][1] = 0.2;
    MinVmaxOverVSum[7][3] = 0.2;
    MinVmaxOverVSum[7][5] = 0.2;
    MinVmaxOverVSum[7][6] = 0.2;
    MinVmaxOverVSum[7][14] = 0.2;
    MinVmaxOverVSum[8][2] = 0.166666667;
    MinVmaxOverVSum[8][3] = 0.166666667;
    MinVmaxOverVSum[8][4] = 0.166666667;
    MinVmaxOverVSum[8][5] = 0.166666667;
    MinVmaxOverVSum[8][7] = 0.166666667;
    MinVmaxOverVSum[8][16] = 0.166666667;
    MinVmaxOverVSum[9][1] = 0.15625;
    MinVmaxOverVSum[9][2] = 0.15625;
    MinVmaxOverVSum[9][4] = 0.15625;
    MinVmaxOverVSum[9][8] = 0.15625;
    MinVmaxOverVSum[9][11] = 0.0625;
    MinVmaxOverVSum[9][13] = 0.15625;
    MinVmaxOverVSum[9][15] = 0.15625;
    MinVmaxOverVSum[10][2] = 0.208333333;
    MinVmaxOverVSum[10][6] = 0.208333333;
    MinVmaxOverVSum[10][7] = 0.208333333;
    MinVmaxOverVSum[10][8] = 0.208333333;
    MinVmaxOverVSum[10][9] = 0.083333333;
    MinVmaxOverVSum[10][10] = 0.083333333;
    MinVmaxOverVSum[11][1] = 0.1;
    MinVmaxOverVSum[11][4] = 0.1;
    MinVmaxOverVSum[11][5] = 0.1;
    MinVmaxOverVSum[11][6] = 0.1;
    MinVmaxOverVSum[11][7] = 0.1;
    MinVmaxOverVSum[11][8] = 0.1;
    MinVmaxOverVSum[11][9] = 0.1;
    MinVmaxOverVSum[11][10] = 0.1;
    MinVmaxOverVSum[11][11] = 0.1;
    MinVmaxOverVSum[11][12] = 0.1;
    //a coefficients
    a[1][0][0] = 43.62819;
    a[1][1][0] = -0.09250887;
    a[1][0][1] = -0.01048858;
    a[1][2][0] = 0.01644927;
    a[1][1][1] = -0.002500773;
    a[1][0][2] = -0.004320274;
    a[1][3][0] = -0.0003119169;
    a[1][2][1] = -0.00006048696;
    a[1][1][2] = -0.00005352801;
    a[1][0][3] = 0.00006850742;
    a[1][4][0] = 0.000002122334;
    a[1][3][1] = 0.00000219937;
    a[1][2][2] = 0.000001210969;
    a[1][1][3] = 0.0000002970658;
    a[1][0][4] = -0.0000006713802;
    a[2][0][0] = 10.24513;
    a[2][1][0] = 0.08590661;
    a[2][0][1] = 0.1498213;
    a[2][2][0] = 0.007384396;
    a[2][1][1] = 0.009570504;
    a[2][0][2] = 0.005136971;
    a[2][3][0] = -0.0001003662;
    a[2][2][1] = -0.0002020327;
    a[2][1][2] = -0.00004580277;
    a[2][0][3] = -0.00005685615;
    a[2][4][0] = 0.0000004127305;
    a[2][3][1] = 0.000001251138;
    a[2][2][2] = 0.0000003114703;
    a[2][1][3] = -0.0000003140157;
    a[2][0][4] = 0.0000002403948;
    a[3][0][0] = 18.62794;
    a[3][1][0] = -0.1203581;
    a[3][0][1] = 0.1087109;
    a[3][2][0] = 0.01929801;
    a[3][1][1] = -0.001305063;
    a[3][0][2] = 0.0017985;
    a[3][3][0] = -0.001301808;
    a[3][2][1] = 0.00002990447;
    a[3][1][2] = 0.00008561376;
    a[3][0][3] = -0.00002583667;
    a[3][4][0] = 0.00004169295;
    a[3][3][1] = 0.0000002001124;
    a[3][2][2] = -0.0000006854646;
    a[3][1][3] = -0.0000006262613;
    a[3][0][4] = 0.0000001198789;
    a[3][5][0] = -0.0000006952638;
    a[3][6][0] = 0.000000005798984;
    a[3][7][0] = -1.913374E-11;
    a[4][0][0] = 33.53909;
    a[4][1][0] = -0.1028224;
    a[4][0][1] = 0.2068375;
    a[4][2][0] = 0.02398141;
    a[4][1][1] = 0.003316137;
    a[4][0][2] = -0.003553689;
    a[4][3][0] = -0.0009584746;
    a[4][2][1] = -0.0002409604;
    a[4][1][2] = 0.0000394184;
    a[4][0][3] = 0.00005001856;
    a[4][4][0] = 0.00002005288;
    a[4][3][1] = 0.00000345851;
    a[4][2][2] = 0.0000008036454;
    a[4][1][3] = -0.0000004333876;
    a[4][0][4] = -0.0000002504256;
    a[4][5][0] = -0.0000002115417;
    a[4][6][0] = 0.000000000905402;
    a[5][0][0] = 34.75804;
    a[5][1][0] = -0.5194905;
    a[5][0][1] = 0.05473705;
    a[5][2][0] = 0.04405446;
    a[5][1][1] = 0.02642531;
    a[5][0][2] = -0.01056781;
    a[5][3][0] = -0.0008743329;
    a[5][2][1] = -0.001084645;
    a[5][1][2] = -0.0003555327;
    a[5][0][3] = 0.0002289769;
    a[5][4][0] = 0.000005476742;
    a[5][3][1] = 0.0000113098;
    a[5][2][2] = 0.000007987488;
    a[5][1][3] = 0.0000007486085;
    a[5][0][4] = -0.000001634024;
    a[6][0][0] = 12.29902;
    a[6][1][0] = -0.7518207;
    a[6][0][1] = -0.451037;
    a[6][2][0] = 0.05143333;
    a[6][1][1] = 0.05126147;
    a[6][0][2] = 0.0178663;
    a[6][3][0] = -0.001024159;
    a[6][2][1] = -0.001640652;
    a[6][1][2] = -0.00100224;
    a[6][0][3] = -0.0001427912;
    a[6][4][0] = 0.000006699563;
    a[6][3][1] = 0.00001566121;
    a[6][2][2] = 0.00001576306;
    a[6][1][3] = 0.000005249888;
    a[7][0][0] = 10.16914;
    a[7][1][0] = 0.4366612;
    a[7][0][1] = 0.03817096;
    a[7][2][0] = -0.08726454;
    a[7][1][1] = -0.007947864;
    a[7][0][2] = 0.01036501;
    a[7][3][0] = 0.005939795;
    a[7][2][1] = 0.0003267886;
    a[7][1][2] = 0.0002371491;
    a[7][0][3] = -0.0001615215;
    a[7][4][0] = -0.0001854127;
    a[7][3][1] = -0.0000003308586;
    a[7][2][2] = -0.000004975863;
    a[7][1][3] = -0.0000008782291;
    a[7][0][4] = 0.000000774084;
    a[7][5][0] = 0.000002956598;
    a[7][6][0] = -0.00000002337074;
    a[7][7][0] = 7.322348E-11;
    a[8][0][0] = 10.77761;
    a[8][1][0] = 0.164749;
    a[8][0][1] = -0.1405007;
    a[8][2][0] = -0.0519873;
    a[8][1][1] = -0.007044869;
    a[8][0][2] = 0.01615437;
    a[8][3][0] = 0.003991315;
    a[8][2][1] = 0.0001479482;
    a[8][1][2] = 0.0003384803;
    a[8][0][3] = -0.000175467;
    a[8][4][0] = -0.0001277487;
    a[8][3][1] = 0.000002756444;
    a[8][2][2] = -0.000004041667;
    a[8][1][3] = -0.000001971021;
    a[8][0][4] = 0.0000006075213;
    a[8][5][0] = 0.000002015703;
    a[8][6][0] = -0.00000001558017;
    a[8][7][0] = 4.797693E-11;
    a[9][0][0] = -124085.7;
    a[9][1][0] = 11938.458;
    a[9][0][1] = -199.62282;
    a[9][2][0] = -485.74811;
    a[9][1][1] = 7.8748002;
    a[9][0][2] = 2.5929804;
    a[9][3][0] = 10.855881;
    a[9][2][1] = -0.10266703;
    a[9][1][2] = -0.069109752;
    a[9][0][3] = -0.0145046;
    a[9][4][0] = -0.1441712;
    a[9][3][1] = 0.00044431373;
    a[9][2][2] = 0.00045679208;
    a[9][1][3] = 0.0001987161;
    a[9][0][4] = 0.000026937182;
    a[9][5][0] = 0.001139533;
    a[9][6][0] = -0.0000049703336;
    a[9][7][0] = 9.2406348E-09;
    a[10][0][0] = 183885.06;
    a[10][1][0] = -15396.773;
    a[10][0][1] = -14.160386;
    a[10][2][0] = 541.58924;
    a[10][1][1] = 0.56775484;
    a[10][0][2] = 1.1942148;
    a[10][3][0] = -10.358971;
    a[10][2][1] = -0.0077071033;
    a[10][1][2] = -0.024873835;
    a[10][0][3] = -0.031209902;
    a[10][4][0] = 0.11603083;
    a[10][3][1] = 0.000033083382;
    a[10][2][2] = 0.00017311782;
    a[10][1][3] = 0.000004175449;
    a[10][0][4] = 0.0015364226;
    a[10][5][0] = -0.00075743018;
    a[10][6][0] = 0.0000026462473;
    a[10][7][0] = -3.7606039E-09;
    a[10][0][5] = -0.00003565003;
    a[10][0][6] = 0.00000030668448;
    a[11][0][0] = -117884.66;
    a[11][1][0] = 11251.043;
    a[11][0][1] = -267.12519;
    a[11][2][0] = -454.92745;
    a[11][1][1] = 10.645736;
    a[11][0][2] = 3.6669421;
    a[11][3][0] = 10.120505;
    a[11][2][1] = -0.13986048;
    a[11][1][2] = -0.097497566;
    a[11][0][3] = -0.024662769;
    a[11][4][0] = -0.13401172;
    a[11][3][1] = 0.00060764355;
    a[11][2][2] = 0.00064613035;
    a[11][1][3] = 0.00031927693;
    a[11][0][4] = 0.000076292913;
    a[11][5][0] = 0.001057975;
    a[11][6][0] = -0.0000046175613;
    a[11][7][0] = 8.6063163E-09;
    a[12][0][0] = 59.095515;
    a[12][1][0] = 0.10602705;
    a[12][0][1] = -3.406924;
    a[12][2][0] = -0.003188483;
    a[12][0][2] = 0.15370325;
    a[12][3][0] = -0.0001080121;
    a[12][0][3] = -0.00367487;
    a[12][4][0] = 0.00000845993;
    a[12][0][4] = 0.000046273625;
    a[12][5][0] = -0.00000013928745;
    a[12][6][0] = 0.000000000716383;
    a[12][0][5] = -0.0000002905423;
    a[12][0][6] = 0.000000000716383;
    a[13][0][0] = 31.5507;
    a[13][1][0] = 0.0797494;
    a[13][0][1] = -0.17706875;
    a[13][2][0] = 0.00048659675;
    a[13][0][2] = 0.00048659675;
    a[14][1][0] = 1.5;
    a[14][2][0] = -0.0075;
    a[14][1][1] = -0.0075;
    a[15][0][0] = 29.655595;
    a[15][1][0] = 0.17064685;
    a[15][0][1] = -0.12344405;
    a[15][2][0] = -0.000236014;
    a[15][0][2] = -0.000236014;
    a[16][0][0] = 24.494755;
    a[16][1][0] = 0.13676575;
    a[16][0][1] = -0.0545979;
    a[16][2][0] = -0.00041083915;
    a[16][0][2] = -0.00041083915;
    a[17][0][0] = 12;
    a[18][0][0] = 20;
    a[20][0][0] = 299.1743;
    a[20][1][0] = -15.11958;
    a[20][0][1] = -0.3115636;
    a[20][2][0] = 0.7635948;
    a[20][1][1] = 0.04548069;
    a[20][0][2] = 0.01123041;
    a[20][3][0] = -0.02376263;
    a[20][2][1] = -0.0007856294;
    a[20][1][2] = 0.0006555709;
    a[20][0][3] = -0.002146855;
    a[20][4][0] = 0.0004355494;
    a[20][3][1] = 0.000003860668;
    a[20][2][2] = -0.000001381699;   //Typo found by the readme of MWM
    a[20][1][3] = -0.000007933902;
    a[20][0][4] = 0.00006699364;
    a[20][5][0] = -0.000004607726;
    a[20][6][0] = 0.0000000261057;
    a[20][7][0] = -6.143914E-11;
    a[20][0][5] = -0.0000008369387;
    a[20][0][6] = 0.000000003928073;
}
function FunctionA3(t){
    let Aux = 0;
    for(let i = 0; i<8; i++){
        for(let j = 0; j<7; j++){
            Aux += a[t][i][j] * Math.pow(VAji[xyzOfTernary[t][1]][t], i) * Math.pow(VAji[xyzOfTernary[t][2]][t], j);
        }
    }
    return Aux;
}
function arrayMin(arr){
    let len = arr.length;
    let min = Infinity;
    for(let i = 1; i < len; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
};
function arrayMax(arr) {
    let len = arr.length;
    let max = -Infinity;
    for(let i = 1; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
};
