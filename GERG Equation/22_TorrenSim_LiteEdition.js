function SetupFlowStreamSimulator(){
    //The following routine must be called once before any other routine.
      //Initialize all the constants and parameters in the Law of Ideal Gases.
      //Some values are modified for calculations that do not depend on T, D, and x in order to speed up the program.
      R = 8.314472;
      let i;
      let j;
      let o13 = 1 / 3;
      let bijk=zeros2(MaxMdl + 1,MaxTrmM + 1);
      let Rs = 8.31451;
      let Rsr = Rs / R;
      let n1;
      let n2;
      let T0;
      let d0;
      for (i = 1 ; i <= MaxFlds; i++){xold[i] = 0}
      Told = 0;
      //Molar masses (g/mol)
      MMiGERG[1] = 16.04246;    //Methane
      MMiGERG[2] = 28.0134;     //Nitrogen
      MMiGERG[3] = 44.0095;     //Carbon dioxide
      MMiGERG[4] = 30.06904;    //Ethane
      MMiGERG[5] = 44.09562;   //Propane
      MMiGERG[6] = 58.1222;     //Isobutane
      MMiGERG[7] = 58.1222;     //n-Butane
      MMiGERG[8] = 72.14878;    //Isopentane
      MMiGERG[9] = 72.14878;    //n-Pentane
      MMiGERG[10] = 86.17536;   //Hexane
      MMiGERG[11] = 100.20194;  //Heptane
      MMiGERG[12] = 114.22852;  //Octane
      MMiGERG[13] = 128.2551;   //Nonane
      MMiGERG[14] = 142.28168;  //Decane
      MMiGERG[15] = 2.01588;    //Hydrogen
      MMiGERG[16] = 31.9988;    //Oxygen
      MMiGERG[17] = 28.0101;    //Carbon monoxide
      MMiGERG[18] = 18.01528;   //Water
      MMiGERG[19] = 34.08088;   //Hydrogen sulfide
      MMiGERG[20] = 4.002602;   //Helium
      MMiGERG[21] = 39.948;     //Argon
      //Exponents in pure fluid equations
      for (let i = 1 ; i <= MaxFlds; i++){
        Vc3[i] = 1 / Math.pow(Dc[i],o13) * 0.5;
        Tc2[i] = Math.sqrt(Tc[i]);
        coik[i][1] = 0;  doik[i][1] = 1;  toik[i][1] = 0.25;
        coik[i][2] = 0;  doik[i][2] = 1;  toik[i][2] = 1.125;
        coik[i][3] = 0;  doik[i][3] = 1;  toik[i][3] = 1.5;
        coik[i][4] = 0;  doik[i][4] = 2;  toik[i][4] = 1.375;
        coik[i][5] = 0;  doik[i][5] = 3;  toik[i][5] = 0.25;
        coik[i][6] = 0;  doik[i][6] = 7;  toik[i][6] = 0.875;
        coik[i][7] = 1;  doik[i][7] = 2;  toik[i][7] = 0.625;
        coik[i][8] = 1;  doik[i][8] = 5;  toik[i][8] = 1.75;
        coik[i][9] = 2;  doik[i][9] = 1;  toik[i][9] = 3.625;
        coik[i][10] = 2; doik[i][10] = 4; toik[i][10] = 3.625;
        coik[i][11] = 3; doik[i][11] = 3; toik[i][11] = 14.5;
        coik[i][12] = 3; doik[i][12] = 4; toik[i][12] = 12;
      }
      for (i = 1 ; i <= 4; i++){
        if (i != 3){
          coik[i][1] = 0;  doik[i][1] = 1;  toik[i][1] = 0.125;
          coik[i][2] = 0;  doik[i][2] = 1;  toik[i][2] = 1.125;
          coik[i][3] = 0;  doik[i][3] = 2;  toik[i][3] = 0.375;
          coik[i][4] = 0;  doik[i][4] = 2;  toik[i][4] = 1.125;
          coik[i][5] = 0;  doik[i][5] = 4;  toik[i][5] = 0.625;
          coik[i][6] = 0;  doik[i][6] = 4;  toik[i][6] = 1.5;
          coik[i][7] = 1;  doik[i][7] = 1;  toik[i][7] = 0.625;
          coik[i][8] = 1;  doik[i][8] = 1;  toik[i][8] = 2.625;
          coik[i][9] = 1;  doik[i][9] = 1;  toik[i][9] = 2.75;
          coik[i][10] = 1; doik[i][10] = 2; toik[i][10] = 2.125;
          coik[i][11] = 1; doik[i][11] = 3; toik[i][11] = 2;
          coik[i][12] = 1; doik[i][12] = 6; toik[i][12] = 1.75;
          coik[i][13] = 2; doik[i][13] = 2; toik[i][13] = 4.5;
          coik[i][14] = 2; doik[i][14] = 3; toik[i][14] = 4.75;
          coik[i][15] = 2; doik[i][15] = 3; toik[i][15] = 5;
          coik[i][16] = 2; doik[i][16] = 4; toik[i][16] = 4;
          coik[i][17] = 2; doik[i][17] = 4; toik[i][17] = 4.5;
          coik[i][18] = 3; doik[i][18] = 2; toik[i][18] = 7.5;
          coik[i][19] = 3; doik[i][19] = 3; toik[i][19] = 14;
          coik[i][20] = 3; doik[i][20] = 4; toik[i][20] = 11.5;
          coik[i][21] = 6; doik[i][21] = 5; toik[i][21] = 26;
          coik[i][22] = 6; doik[i][22] = 6; toik[i][22] = 28;
          coik[i][23] = 6; doik[i][23] = 6; toik[i][23] = 30;
          coik[i][24] = 6; doik[i][24] = 7; toik[i][24] = 16;
        }
      }
      //Ideal gas parameters
      n0i[1][3] = 4.00088;  n0i[1][4] = 0.76315;  n0i[1][5] = 0.0046;   n0i[1][6] = 8.74432;  n0i[1][7] = -4.46921; n0i[1][1] = 29.83843397;  n0i[1][2] = -15999.69151;
      n0i[2][3] = 3.50031;  n0i[2][4] = 0.13732;  n0i[2][5] = -0.1466;  n0i[2][6] = 0.90066;  n0i[2][7] = 0;        n0i[2][1] = 17.56770785;  n0i[2][2] = -2801.729072;
      n0i[3][3] = 3.50002;  n0i[3][4] = 2.04452;  n0i[3][5] = -1.06044; n0i[3][6] = 2.03366;  n0i[3][7] = 0.01393;  n0i[3][1] = 20.65844696;  n0i[3][2] = -4902.171516;
      n0i[4][3] = 4.00263;  n0i[4][4] = 4.33939;  n0i[4][5] = 1.23722;  n0i[4][6] = 13.1974;  n0i[4][7] = -6.01989; n0i[4][1] = 36.73005938;  n0i[4][2] = -23639.65301;
      n0i[5][3] = 4.02939;  n0i[5][4] = 6.60569;  n0i[5][5] = 3.197;    n0i[5][6] = 19.1921;  n0i[5][7] = -8.37267; n0i[5][1] = 44.70909619;  n0i[5][2] = -31236.63551;
      n0i[6][3] = 4.06714;  n0i[6][4] = 8.97575;  n0i[6][5] = 5.25156;  n0i[6][6] = 25.1423;  n0i[6][7] = 16.1388;  n0i[6][1] = 34.30180349;  n0i[6][2] = -38525.50276;
      n0i[7][3] = 4.33944;  n0i[7][4] = 9.44893;  n0i[7][5] = 6.89406;  n0i[7][6] = 24.4618;  n0i[7][7] = 14.7824;  n0i[7][1] = 36.53237783;  n0i[7][2] = -38957.80933;
      n0i[8][3] = 4;        n0i[8][4] = 11.7618;  n0i[8][5] = 20.1101;  n0i[8][6] = 33.1688;  n0i[8][7] = 0;        n0i[8][1] = 43.17218626;  n0i[8][2] = -51198.30946;
      n0i[9][3] = 4;        n0i[9][4] = 8.95043;  n0i[9][5] = 21.836;   n0i[9][6] = 33.4032;  n0i[9][7] = 0;        n0i[9][1] = 42.67837089;  n0i[9][2] = -45215.83;
      n0i[10][3] = 4;       n0i[10][4] = 11.6977; n0i[10][5] = 26.8142; n0i[10][6] = 38.6164; n0i[10][7] = 0;       n0i[10][1] = 46.99717188; n0i[10][2] = -52746.83318;
      n0i[11][3] = 4;       n0i[11][4] = 13.7266; n0i[11][5] = 30.4707; n0i[11][6] = 43.5561; n0i[11][7] = 0;       n0i[11][1] = 52.07631631; n0i[11][2] = -57104.81056;
      n0i[12][3] = 4;       n0i[12][4] = 15.6865; n0i[12][5] = 33.8029; n0i[12][6] = 48.1731; n0i[12][7] = 0;       n0i[12][1] = 57.25830934; n0i[12][2] = -60546.76385;
      n0i[13][3] = 4;       n0i[13][4] = 18.0241; n0i[13][5] = 38.1235; n0i[13][6] = 53.3415; n0i[13][7] = 0;       n0i[13][1] = 62.09646901; n0i[13][2] = -66600.12837;
      n0i[14][3] = 4;       n0i[14][4] = 21.0069; n0i[14][5] = 43.4931; n0i[14][6] = 58.3657; n0i[14][7] = 0;       n0i[14][1] = 65.93909154; n0i[14][2] = -74131.45483;
      n0i[15][3] = 2.47906; n0i[15][4] = 0.95806; n0i[15][5] = 0.45444; n0i[15][6] = 1.56039; n0i[15][7] = -1.3756; n0i[15][1] = 13.07520288; n0i[15][2] = -5836.943696;
      n0i[16][3] = 3.50146; n0i[16][4] = 1.07558; n0i[16][5] = 1.01334; n0i[16][6] = 0;       n0i[16][7] = 0;       n0i[16][1] = 16.8017173;  n0i[16][2] = -2318.32269;
      n0i[17][3] = 3.50055; n0i[17][4] = 1.02865; n0i[17][5] = 0.00493; n0i[17][6] = 0;       n0i[17][7] = 0;       n0i[17][1] = 17.45786899; n0i[17][2] = -2635.244116;
      n0i[18][3] = 4.00392; n0i[18][4] = 0.01059; n0i[18][5] = 0.98763; n0i[18][6] = 3.06904; n0i[18][7] = 0;       n0i[18][1] = 21.57882705; n0i[18][2] = -7766.733078;
      n0i[19][3] = 4;       n0i[19][4] = 3.11942; n0i[19][5] = 1.00243; n0i[19][6] = 0;       n0i[19][7] = 0;       n0i[19][1] = 21.5830944;  n0i[19][2] = -6069.035869;
      n0i[20][3] = 2.5;     n0i[20][4] = 0;       n0i[20][5] = 0;       n0i[20][6] = 0;       n0i[20][7] = 0;       n0i[20][1] = 10.04639507; n0i[20][2] = -745.375;
      n0i[21][3] = 2.5;     n0i[21][4] = 0;       n0i[21][5] = 0;       n0i[21][6] = 0;       n0i[21][7] = 0;       n0i[21][1] = 10.04639507; n0i[21][2] = -745.375;
  
      th0i[1][4] = 820.659;  th0i[1][5] = 178.41;   th0i[1][6] = 1062.82;  th0i[1][7] = 1090.53;
      th0i[2][4] = 662.738;  th0i[2][5] = 680.562;  th0i[2][6] = 1740.06;  th0i[2][7] = 0;
      th0i[3][4] = 919.306;  th0i[3][5] = 865.07;   th0i[3][6] = 483.553;  th0i[3][7] = 341.109;
      th0i[4][4] = 559.314;  th0i[4][5] = 223.284;  th0i[4][6] = 1031.38;  th0i[4][7] = 1071.29;
      th0i[5][4] = 479.856;  th0i[5][5] = 200.893;  th0i[5][6] = 955.312;  th0i[5][7] = 1027.29;
      th0i[6][4] = 438.27;   th0i[6][5] = 198.018;  th0i[6][6] = 1905.02;  th0i[6][7] = 893.765;
      th0i[7][4] = 468.27;   th0i[7][5] = 183.636;  th0i[7][6] = 1914.1;   th0i[7][7] = 903.185;
      th0i[8][4] = 292.503;  th0i[8][5] = 910.237;  th0i[8][6] = 1919.37;  th0i[8][7] = 0;
      th0i[9][4] = 178.67;   th0i[9][5] = 840.538;  th0i[9][6] = 1774.25;  th0i[9][7] = 0;
      th0i[10][4] = 182.326; th0i[10][5] = 859.207; th0i[10][6] = 1826.59; th0i[10][7] = 0;
      th0i[11][4] = 169.789; th0i[11][5] = 836.195; th0i[11][6] = 1760.46; th0i[11][7] = 0;
      th0i[12][4] = 158.922; th0i[12][5] = 815.064; th0i[12][6] = 1693.07; th0i[12][7] = 0;
      th0i[13][4] = 156.854; th0i[13][5] = 814.882; th0i[13][6] = 1693.79; th0i[13][7] = 0;
      th0i[14][4] = 164.947; th0i[14][5] = 836.264; th0i[14][6] = 1750.24; th0i[14][7] = 0;
      th0i[15][4] = 228.734; th0i[15][5] = 326.843; th0i[15][6] = 1651.71; th0i[15][7] = 1671.69;
      th0i[16][4] = 2235.71; th0i[16][5] = 1116.69; th0i[16][6] = 0;       th0i[16][7] = 0;
      th0i[17][4] = 1550.45; th0i[17][5] = 704.525; th0i[17][6] = 0;       th0i[17][7] = 0;
      th0i[18][4] = 268.795; th0i[18][5] = 1141.41; th0i[18][6] = 2507.37; th0i[18][7] = 0;
      th0i[19][4] = 1833.63; th0i[19][5] = 847.181; th0i[19][6] = 0;       th0i[19][7] = 0;
      th0i[20][4] = 0;       th0i[20][5] = 0;       th0i[20][6] = 0;       th0i[20][7] = 0;
      th0i[21][4] = 0;       th0i[21][5] = 0;       th0i[21][6] = 0;       th0i[21][7] = 0;      
      //Ideal gas terms
      T0 = 298.15;
      d0 = 101.325 / R / T0;
      for (i = 1 ; i <= MaxFlds; i++){
        n0i[i][3] = n0i[i][3] - 1;
        n0i[i][2] = n0i[i][2] + T0;
        for (j = 1 ; j <= 7; j++){n0i[i][j] = Rsr * n0i[i][j]}
        n0i[i][2] = n0i[i][2] - T0;
        n0i[i][1] = n0i[i][1] - Math.log(d0);
      }
  }
  class FlowStream {
    constructor() {
      this.x = Array(22).fill(0); //mol
      this.MolarFlowByComponent = Array(22).fill(0); //mol/hr
      this.MolarFlow = 0; //mol/hr
      this.VolumetricFlow = 0; //m3/hr
      this.Pressure=100; //KPa
      this.Temperature=273.15; //Kelvin
      this.MolarMass=0; //g/mol
      this.Density=0.04464; //mol/l
      this.CompressibilityFactor=0;
      this.dPdD=0; // kPa/(mol-l)
      this.d2PdD2=0;
      this.d2PdTD=0;
      this.dPdT=0; // kPa/K
      this.U=0; //J/mol
      this.H=0; //J/mol
      this.S=0; //J/mol
      this.Cv=0; // J/(mol-K)
      this.Cp=0; // J/(mol-K)
      this.SpeedOfSound=0; //m/sec
      this.G=0; //J/mol
      this.JouleThomson=0; //K/kPa
      this.IsentropicExponent=0;
      this.A=0; //J/mol
      this.ierr=0;
      this.herr='';
    }
    MolarMassGERG(){
      //Sub MolarMassGERG(x)
      //Calculate molar mass of the mixture with the compositions contained in the x() input array
      //
      //Inputs;
      //   x() - Composition (mole fraction)
      //         Do not send mole percents or mass fractions in the x() array, otherwise the output will be incorrect.
      //         The sum of the compositions in the x() array must be equal to one.
      //         The order of the fluids in this array is given at the top of this code.
      //
      //Outputs;
      //    Mm - Molar mass (g/mol)
      this.MolarMass = 0;
      for (let i = 1; i <= NcGERG; i++){this.MolarMass = this.MolarMass + this.x[i] * MMiGERG[i]}
    }
    PressureGERG(){
      //Sub PressureGERG(T, D, x, P, Z)
      //Calculate pressure as a function of temperature and density.  The derivative d(P)/d(D) is also calculated
      //for use in the iterative DensityGERG subroutine (and is only returned as a common variable).
      //
      //Inputs;
      //     T - Temperature (K)
      //     D - Density (mol/l)
      //   x() - Composition (mole fraction)
      //         Do not send mole percents or mass fractions in the x() array, otherwise the output will be incorrect.
      //         The sum of the compositions in the x() array must be equal to one.
      //Outputs;
      //     P - Pressure (kPa)
      //     Z - Compressibility factor
      // dPdDsave - d(P)/d(D) [kPa/(mol/l)] (at constant temperature)
      //          - This variable is cached in the common variables for use in the iterative density solver, but not returned as an argument.
      this.CompressibilityFactor = 1;
      this.Pressure = this.Density * R * this.Temperature * this.CompressibilityFactor;
      dPdDsave = R * this.Temperature * (1);
    }
    CalculateDensity(iFlag){
      //Sub DensityGERG(iFlag, T, P, x, D, ierr, herr)
      //Calculate density as a function of temperature and pressure.  This is an iterative routine that calls PressureGERG
      //to find the correct state point.  Generally only 6 iterations at most are required.
      //If the iteration fails to converge, the ideal gas density and an error message are returned.
      //No checks are made to determine the phase boundary, which would have guaranteed that the output is in the gas phase (or liquid phase when iFlag=2).
      //It is up to the user to locate the phase boundary, and thus identify the phase of the T and P inputs.
      //If the state point is 2-phase, the output density will represent a metastable state.
      //Inputs;
      // iFlag - Set to 0 for strict pressure solver in the gas phase without checks (fastest mode, but output state may not be stable single phase)
      //         Set to 1 to make checks for possible 2-phase states (result may still not be stable single phase, but many unstable states will be identified)
      //         Set to 2 to search for liquid phase (and make the same checks when iFlag=1)
      //     T - Temperature (K)
      //     P - Pressure (kPa)
      //   x() - Composition (mole fraction)
      //(An initial guess for the density can be sent in D as the negative of the guess for roots that are in the liquid phase instead of using iFlag=2)
      //Outputs;
      //     D - Density (mol/l)
      //  ierr - Error number (0 indicates no error)
      this.ierr=0;
      //  herr - Error message if ierr is not equal to zero
      if(this.Pressure < Epsilon) {this.Density=0;return}
      this.Density = this.Pressure / R / this.Temperature;        //Ideal gas estimate for vapor phase
      this.PressureGERG();
      this.CalculateProperties();
    }
    CalculateProperties(){
      //Sub PropertiesGERG(T, D, x, P, Z, dPdD, d2PdD2, d2PdTD, dPdT, U, H, S, Cv, Cp, W, G, JT, Kappa, Optional A)
      //Calculate thermodynamic properties as a function of temperature and density.
      //If the density is not known, call subroutine DensityGERG first with the known values of pressure and temperature.
      //Many of the formulas below do not appear in Part 2 of AGA 8, but rather in Part 1, which uses a dimensional Helmholtz equation with more direct formulas for quick calculation.
      //Inputs;
      //     T - Temperature (K)
      //     D - Density (mol/l)
      //   x() - Composition (mole fraction)
      //Outputs;
      //     P - Pressure (kPa)
      //     Z - Compressibility factor
      //  dPdD - First derivative of pressure with respect to density at constant temperature [kPa/(mol/l)]
      //d2PdD2 - Second derivative of pressure with respect to density at constant temperature [kPa/(mol/l)^2]
      //d2PdTD - Second derivative of pressure with respect to temperature and density [kPa/(mol/l)/K]
      //  dPdT - First derivative of pressure with respect to temperature at constant density (kPa/K)
      //     U - Internal energy (J/mol)
      //     H - Enthalpy (J/mol)
      //     S - Entropy [J/(mol-K)]
      //    Cv - Isochoric heat capacity [J/(mol-K)]
      //    Cp - Isobaric heat capacity [J/(mol-K)]
      //     W - Speed of sound (m/s)
      //     G - Gibbs energy (J/mol)
      //    JT - Joule-Thomson coefficient (K/kPa)
      // Kappa - Isentropic Exponent
      //     A - Helmholtz energy (J/mol)
      //Calculate molar mass
      this.MolarMassGERG();
      //Calculate the ideal gas Helmholtz energy, and its first and second derivatives with respect to temperature.
      let a0=this.Alpha0GERG();
      //Calculate the real gas Helmholtz energy, and its derivatives with respect to temperature and/or density.
      let RT = R * this.Temperature;
      this.CompressibilityFactor = 1;
      this.Pressure = this.Density * RT * this.CompressibilityFactor;
      this.dPdD = RT;
      this.dPdT = this.Density * R;
      this.d2PdTD = R;
      this.A = RT * (a0[0]);
      this.G = RT * (1 + a0[0]);
      this.U = RT * (a0[1]);
      this.H = RT * (1 + a0[1]);
      this.S = R * (a0[1] - a0[0]);
      this.Cv = -R * (a0[2]);
      if(this.Density > Epsilon){
        this.Cp = this.Cv + this.Temperature * Math.pow((this.dPdT / this.Density),2) / this.dPdD;
        this.d2PdD2 = 0;
        this.JouleThomson = (this.Temperature / this.Density * this.dPdT / this.dPdD - 1) / this.Cp / this.Density; //=(dB/dT*T-B)/Cp for an ideal gas, but dB/dT is not known
      }else{
        this.Cp = this.Cv + R;
        this.d2PdD2 = 0;
        this.JouleThomson = 1E+20;
      }
      this.SpeedOfSound = 1000 * this.Cp / this.Cv * this.dPdD / this.MolarMass;
      if (this.SpeedOfSound < 0){this.SpeedOfSound = 0};
      this.IsentropicExponent = this.SpeedOfSound * this.MolarMass / (RT * 1000 * this.CompressibilityFactor);
      this.SpeedOfSound = Math.sqrt(this.SpeedOfSound);
    }
    //The following routines are low-level routines that should not be called outside of this code.
    Alpha0GERG(){
      //Private Sub Alpha0GERG(T, D, x, a0)
      //Calculate the ideal gas Helmholtz energy and its derivatives with respect to tau and delta.
      //This routine is not needed when only P (or Z) is calculated.
      //Inputs;
      //     T - Temperature (K)
      //     D - Density (mol/l)
      //   x() - Composition (mole fraction)
      //Outputs;
      // a0(0) - Ideal gas Helmholtz energy (dimensionless [i.e., divided by RT])
      // a0(1) - tau*partial(a0)/partial(tau)
      // a0(2) - tau^2*partial^2(a0)/partial(tau)^2
      let a0 = Array(3).fill(0);
      let LogT;
      let LogD;
      let LogHyp;
      let th0T;
      let LogxD;
      let SumHyp0;
      let SumHyp1;
      let SumHyp2;
      let em;
      let ep;
      let hcn;
      let hsn;
      if (this.Density > Epsilon){LogD = Math.log(this.Density)}else{LogD = Math.log(Epsilon)}
      LogT = Math.log(this.Temperature);
      for (let i = 1; i <= NcGERG; i++){
        if (this.x[i] > Epsilon){
          LogxD = LogD + Math.log(this.x[i]);
          SumHyp0 = 0;
          SumHyp1 = 0;
          SumHyp2 = 0;
          for (let j = 4; j <= 7; j++){
            if (th0i[i][j] > Epsilon){
              th0T = th0i[i][j] / this.Temperature;
              ep = Math.exp(th0T);
              em = 1 / ep;
              hsn = (ep - em)*0.5;
              hcn = (ep + em)*0.5;
              if(j == 4 || j == 6){
                LogHyp = Math.log(Math.abs(hsn))
                SumHyp0 = SumHyp0 + n0i[i][j] * LogHyp;
                SumHyp1 = SumHyp1 + n0i[i][j] * th0T * hcn / hsn;
                SumHyp2 = SumHyp2 + n0i[i][j] * Math.pow((th0T / hsn), 2);
              }else{
                LogHyp = Math.log(Math.abs(hcn));
                SumHyp0 = SumHyp0 - n0i[i][j] * LogHyp;
                SumHyp1 = SumHyp1 - n0i[i][j] * th0T * hsn / hcn;
                SumHyp2 = SumHyp2 + n0i[i][j] * Math.pow((th0T / hcn), 2);
              }
            }
          }
          a0[0] = a0[0] + this.x[i] * (LogxD + n0i[i][1] + n0i[i][2] / this.Temperature - n0i[i][3] * LogT + SumHyp0);
          a0[1] = a0[1] + this.x[i] * (n0i[i][3] + n0i[i][2] / this.Temperature + SumHyp1);
          a0[2] = a0[2] - this.x[i] * (n0i[i][3] + SumHyp2);
        }
      }
      return a0;
    }
    ////////////////////////////////////////////////////////////////////////////////////
    addMethane(Methane){this.x[1] = Methane};
    addNitrogen(Nitrogen){this.x[2] = Nitrogen};
    addCarbonDioxide(CarbonDioxide){this.x[3] = CarbonDioxide};
    addEthane(Ethane){this.x[4] = Ethane};
    addPropane(Propane){this.x[5] = Propane};
    addIsobutane(Isobutane){this.x[6] = Isobutane};
    addButane(Butane){this.x[7] = Butane};
    addIsopentane(Isopentane){this.x[8] = Isopentane};
    addPentane(Pentane){this.x[9] = Pentane};
    addHexane(Hexane){this.x[10] = Hexane};
    addHeptane(Heptane){this.x[11] = Heptane};
    addOctane(Octane){this.x[12] = Octane};
    addNonane(Nonane){this.x[13] = Nonane};
    addDecane(Decane){this.x[14] = Decane};
    addHydrogen(Hydrogen){this.x[15] = Hydrogen};
    addOxygen(Oxygen){this.x[16] = Oxygen};
    addCarbonmonoxide(Carbonmonoxide){this.x[17] = Carbonmonoxide};
    addWater(Water){this.x[18] = Water};
    addHydrogensulfide(Hydrogensulfide){this.x[19] = Hydrogensulfide};
    addHelium(Helium){this.x[20] = Helium};
    addArgon(Argon){this.x[21] = Argon};
    CalculateDemandedOxygen(){
      //let CarbonsInComponents = [0,1,0,0,2,3,4,4,5,5,6,7,8,9,10,0,-0.5,0.5,0,0,0,0];
      let CarbonsInComponents = [0,1,0,0,2,3,4,4,5,5,6,7,8,9,10,0,0,0.5,0,0,0,0];
      let HidrogensInComponents = [0,4,0,0,6,8,10,10,12,12,14,16,18,20,22,2,0,0,0,2,0,0];
      let CarbonsInMixture = 0;
      let HidrogenInMixture = 0;
      for (let i=1; i < 22; i++){
        CarbonsInMixture = CarbonsInMixture + this.MolarFlowByComponent[i]*CarbonsInComponents[i];
        HidrogenInMixture = HidrogenInMixture + this.MolarFlowByComponent[i]*HidrogensInComponents[i];
      }
      return CarbonsInMixture + HidrogenInMixture * 0.25;
    }
    ConvertToExhaust(){
      let CarbonsInComponents = [0,1,0,0,2,3,4 ,4 ,5 ,5 ,6 ,7 ,8 ,9 ,10,0,0,0.5,0,0,0,0];
      let HidrogensInComponents=[0,4,0,0,6,8,10,10,12,12,14,16,18,20,22,2,0,0  ,0,2,0,0];
      let CarbonsInMixture = 0;
      let HidrogenInMixture = 0;
      for (let i=1; i<=21; i++){
        CarbonsInMixture = CarbonsInMixture + this.MolarFlowByComponent[i]*CarbonsInComponents[i];
        HidrogenInMixture = HidrogenInMixture + this.MolarFlowByComponent[i]*HidrogensInComponents[i];
      }
      let ExhaustGas = new FlowStream();
      ExhaustGas.MolarFlowByComponent[16] = this.MolarFlowByComponent[16] - (CarbonsInMixture + HidrogenInMixture * 0.25); //Oxygen
      ExhaustGas.MolarFlowByComponent[3] = this.MolarFlowByComponent[3] + CarbonsInMixture;  //Carbon dioxide
      ExhaustGas.MolarFlowByComponent[18] = this.MolarFlowByComponent[18] + (HidrogenInMixture * 0.5); //Water
      ExhaustGas.MolarFlowByComponent[2] = this.MolarFlowByComponent[2]; //Nitrogen
      //ExhaustGas.MolarFlowByComponent[1] = 0;  //Methane
      //ExhaustGas.MolarFlowByComponent[4] = 0;  //Ethane
      //ExhaustGas.MolarFlowByComponent[5] = 0;  //Propane
      //ExhaustGas.MolarFlowByComponent[6] = 0;  //Isobutane
      //ExhaustGas.MolarFlowByComponent[7] = 0;  //n-Butane
      //ExhaustGas.MolarFlowByComponent[8] = 0;  //Isopentane
      //ExhaustGas.MolarFlowByComponent[9] = 0;  //n-Pentane
      //ExhaustGas.MolarFlowByComponent[10] = 0; //Hexane
      //ExhaustGas.MolarFlowByComponent[11] = 0; //Heptane
      //ExhaustGas.MolarFlowByComponent[12] = 0; //Octane
      //ExhaustGas.MolarFlowByComponent[13] = 0; //Nonane
      //ExhaustGas.MolarFlowByComponent[14] = 0; //Decane
      //ExhaustGas.MolarFlowByComponent[15] = 0; //Hydrogen
      //ExhaustGas.MolarFlowByComponent[17] = 0; //Carbon monoxide
      //ExhaustGas.MolarFlowByComponent[19] = 0; //Hydrogen sulfide
      //ExhaustGas.MolarFlowByComponent[20] = ExhaustGas.MolarFlowByComponent[20]; //Helium
      //ExhaustGas.MolarFlowByComponent[21] = ExhaustGas.MolarFlowByComponent[21]; //Argon
      for(let i=1; i < 22; i++){
        ExhaustGas.MolarFlow = ExhaustGas.MolarFlow + ExhaustGas.MolarFlowByComponent[i];
      }
      for(let i=1; i < 22; i++){
        ExhaustGas.x[i] = ExhaustGas.MolarFlowByComponent[i] / ExhaustGas.MolarFlow;
      }
      ExhaustGas.Temperature = this.Temperature;
      ExhaustGas.Pressure = this.Pressure;
      ExhaustGas.CalculateDensity(1);
      return ExhaustGas;
    }
    CalculatePropertiesOfFlowStream(){
      //this.Density = - this.Density; //is not making any difference
      this.CalculateDensity(1);
    }
    isocoricHeating(HeatInJ){
      let HeatInJmol = HeatInJ / this.MolarFlow;
      //this.CalculateDensity(1);
      let InitialEnthalpy = this.H;
      let FinalEnthalpy = 0;
      let LowerTemperature;
      let LowerPressure;
      let HigherTemperature = this.Temperature;
      let HigherPressure = this.Pressure;
      let deltaEnthalpy = 0;
      for(let i = 0; i < 20; i++){
        LowerTemperature = HigherTemperature;
        LowerPressure = HigherPressure;
        HigherTemperature = (LowerTemperature + 5) * 1.5;
        HigherPressure = LowerPressure + (HigherTemperature - LowerTemperature) * this.dPdT;
        this.Temperature = HigherTemperature;
        this.Pressure = HigherPressure;
        this.CalculateDensity(1);
        FinalEnthalpy = this.H;
        deltaEnthalpy = FinalEnthalpy - InitialEnthalpy;
        if(deltaEnthalpy > HeatInJmol){i = 20}
      }
      this.Temperature = (HigherTemperature + LowerTemperature) * 0.5;
      this.Pressure = (HigherPressure + LowerPressure) * 0.5;
      for(let i = 0; i < 20; i++){
        this.CalculateDensity(1);
        FinalEnthalpy = this.H;
        deltaEnthalpy = FinalEnthalpy - InitialEnthalpy;
        if(deltaEnthalpy > HeatInJmol){
          HigherTemperature = this.Temperature;
          HigherPressure = this.Pressure;
          this.Temperature = (HigherTemperature + LowerTemperature) * 0.5;
          this.Pressure = LowerPressure + (this.Temperature - LowerTemperature) * this.dPdT;
        }else{
          LowerTemperature = this.Temperature;
          HigherPressure = this.Pressure;
          this.Temperature = (HigherTemperature + LowerTemperature) * 0.5;
          this.Pressure = LowerPressure + (this.Temperature - LowerTemperature) * this.dPdT;
        }
      }
      this.CalculateDensity(1);
    }
    isobaricHeating(HeatInJ){
      let HeatInJmol = HeatInJ / this.MolarFlow;
      this.CalculateDensity(1);
      let InitialEnthalpy = this.H;
      let FinalEnthalpy = 0;
      let LowerTemperature;
      let HigherTemperature = this.Temperature;
      let deltaEnthalpy = 0;
      for(let i = 0; i < 20; i++){
        LowerTemperature = HigherTemperature;
        HigherTemperature = (LowerTemperature + 5) * 1.5;
        this.CalculateDensity(1);
        FinalEnthalpy = this.H;
        deltaEnthalpy = FinalEnthalpy - InitialEnthalpy;
        if(deltaEnthalpy > HeatInJmol){i = 20}
      }
      let MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
      for(let i = 0; i < 20; i++){
        this.Temperature = MiddleTemperature;
        this.CalculateDensity(1);
        FinalEnthalpy = this.H;
        deltaEnthalpy = FinalEnthalpy - InitialEnthalpy;
        if (deltaEnthalpy > HeatInJmol){
          HigherTemperature = MiddleTemperature;
          MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
        }else{
          LowerTemperature = MiddleTemperature;
          MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
        }
      }
      this.Temperature = MiddleTemperature;
      this.CalculateDensity(1);
    }
    isoentropicExpansion2(FinalPressure){
      this.CalculateDensity(1);
      let LowerPressure;
      let Workpdv = 0;
      let LastVolume;
      let ActualVolume;
      let ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
      let TemperatureSteps = 4; //Very performance dependant.
      let MaxNumberOfSteps = 10000/TemperatureSteps;
      let LowerTemperature = this.Temperature - TemperatureSteps;
      for(let i = 0; i < MaxNumberOfSteps; i++){
        LowerPressure = this.Pressure * Math.pow(LowerTemperature / this.Temperature, ExponentOfTheEvolution);
        this.Temperature = LowerTemperature;
        this.Pressure = LowerPressure;
        LastVolume = 1/(this.Density + 0.0001);
        this.CalculateDensity(1);
        ActualVolume = 1/(this.Density + 0.0001);
        Workpdv = Workpdv + this.Pressure * (ActualVolume - LastVolume);
        ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
        if(LowerPressure < FinalPressure){
          i = MaxNumberOfSteps;
        }else{
          this.Temperature = this.Temperature;
          LowerTemperature = this.Temperature - TemperatureSteps;
          this.Pressure = LowerPressure;
        }
      }
      this.Temperature = (LowerTemperature + this.Temperature)*0.5;
      this.Pressure = (LowerPressure + this.Pressure)*0.5;
      this.CalculateDensity(1);
      return Workpdv * this.MolarFlow;
    }
    isoentropicExpansion(ExpansionRatio){
      this.CalculateDensity(1);
      let FinalDensity = this.Density / ExpansionRatio;
      let LowerPressure;
      let Workpdv = 0;
      let LastVolume;
      let ActualVolume;
      let ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
      let TemperatureSteps = 4; //Very performance dependant.
      let MaxNumberOfSteps = 10000/TemperatureSteps;
      let LowerTemperature = this.Temperature - TemperatureSteps;
      for(let i = 0; i < MaxNumberOfSteps; i++){
        LowerPressure = this.Pressure * Math.pow(LowerTemperature / this.Temperature, ExponentOfTheEvolution);
        this.Temperature = LowerTemperature;
        this.Pressure = LowerPressure;
        LastVolume = 1/(this.Density + 0.0001);
        this.CalculateDensity(1);
        ActualVolume = 1/(this.Density + 0.0001);
        if(this.Pressure > 100){ //I can do better, change it later.
          Workpdv = Workpdv + this.Pressure * (ActualVolume - LastVolume);
        }
        ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
        if(this.Density < FinalDensity){
          i = MaxNumberOfSteps;
        }else{
          this.Temperature = this.Temperature;
          LowerTemperature = this.Temperature - TemperatureSteps;
          this.Pressure = LowerPressure;
        }
      }
      this.Temperature = (LowerTemperature + this.Temperature)*0.5;
      this.Pressure = (LowerPressure + this.Pressure)*0.5;
      this.CalculateDensity(1);
      return Workpdv * this.MolarFlow;
    }
    isoentropicCompression2(FinalDensity){
      this.CalculateDensity(1);
      let LowerTemperature;
      let LowerPressure;
      let Workpdv = 0;
      let LastVolume;
      let ActualVolume;
      let ExponentOfTheEvolution;
      let TemperatureSteps = 4; //Very performance dependant.
      let MaxNumberOfSteps = 10000/TemperatureSteps;
      for(let i = 0; i < MaxNumberOfSteps; i++){
        LowerTemperature = this.Temperature;
        LowerPressure = this.Pressure;
        ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
        this.Temperature += TemperatureSteps;
        this.Pressure = LowerPressure * Math.pow(this.Temperature / LowerTemperature, ExponentOfTheEvolution);
        LastVolume = 1/(this.Density + 0.0001);
        this.CalculateDensity(1);
        ActualVolume = 1/(this.Density + 0.0001);
        Workpdv += this.Pressure * (ActualVolume - LastVolume);
        if(this.Density > FinalDensity){
          i = MaxNumberOfSteps;
        }
      }
      this.Temperature = (this.Temperature + LowerTemperature) * 0.5;
      this.Pressure = (this.Pressure + LowerPressure) * 0.5;
      this.CalculateDensity(1);
      return Workpdv * this.MolarFlow;
    }
    isoentropicCompression(PowerInJ){
      let PowerInJmol = PowerInJ / this.MolarFlow;
      this.CalculateDensity(1);
      let LowerTemperature;
      let LowerPressure;
      let Workpdv=0;
      let LastVolume;
      let ActualVolume;
      let ExponentOfTheEvolution;
      let TemperatureSteps = 4;
      let MaxNumberOfSteps = 10000/TemperatureSteps;
      for(let i = 0; i < MaxNumberOfSteps; i++){
        LowerTemperature = this.Temperature;
        LowerPressure = this.Pressure;
        ExponentOfTheEvolution = this.IsentropicExponent / (this.IsentropicExponent - 1);
        this.Temperature += TemperatureSteps;
        this.Pressure = LowerPressure * Math.pow(this.Temperature / LowerTemperature, ExponentOfTheEvolution);
        LastVolume = 1/(this.Density + 0.0001);
        this.CalculateDensity(1);
        ActualVolume = 1/(this.Density + 0.0001);
        Workpdv += this.Pressure * (ActualVolume - LastVolume);
        this.IsentropicExponent = this.IsentropicExponent;
        if(-PowerInJmol > Workpdv){
          i = MaxNumberOfSteps;
        }
      }
      this.Temperature = (this.Temperature + LowerTemperature) * 0.5;
      this.Pressure = (this.Pressure + LowerPressure) * 0.5;
      this.CalculateDensity(1);
    }
    isoenthalpicExpansion(FinalPressure){
      let DELTAP = FinalPressure - this.Pressure;
      let deltaP = DELTAP * 0.1;
      let InitialEnthalpy = this.H;
      let FinalEnthalpy = 0;
      for(let i = 0; i < 9; i++){
        this.Pressure = this.Pressure + deltaP;
        this.Temperature = this.Temperature + deltaP * this.JouleThomson;
        this.CalculateDensity(1);
        this.JouleThomson = this.JouleThomson;
      }
      this.Pressure = this.Pressure + deltaP;
      this.Temperature = this.Temperature + deltaP * this.JouleThomson;
      FinalEnthalpy = this.H;
      this.CalculateDensity(1);
      return (FinalEnthalpy - InitialEnthalpy) * this.MolarFlow;
    }
    CalculateMolarFlowByComponent(){
      for (let i=1; i < 22; i++){
        this.MolarFlowByComponent[i]=this.x[i] * this.MolarFlow;
      }
    }
  }