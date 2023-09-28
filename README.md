# Commands 

	To Update all node dependencies:
		npm install
		
	To check Outdated & Update:
		npm outdated
		npm update
		
	To Run All Test:
		npm run test

	To Generate Allure HTML Reports:
		npm run GenerateReport
		
	To Run as Test Suite:
		npm run suite
		
Test Screenshots:
	/Retirement_Calc/Screenshots

Test Report/Results Folders Auto generated:
/Retirement_Calc/allure-reports
/Retirement_Calc/allure-results
	
To Run Parallel Tests:	
	Update wdio.conf.js value Maxinstances:number of test to run 

 Set up on need basis in wdio.config.js Levels of execution logging as : trace | debug | info | warn | error | silent
	
*Supports Latest Chrome browser version 117.+
