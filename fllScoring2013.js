//
// FLL Scoring 2013 - Nature's Fury
//
// Are you learning something from this code?  Cool!
// Spot something that could be done better?  Let me know:  jayfrancis@aol.com
//
// Want to re-use this for another project?  Go ahead, re-use away!
//
// This code is FREE, as in, well, FREE...
//

// Version 0.0 - Initial creation based on FLL Scoring 2012
// Version 0.1 - First release to public website
// Version 0.2 - Corrected typos in tree branch scoring section
// Version 0.3 - Corrected typos in penalty evaluation
// Version 0.4 - Text modifications in index.html
// Version 0.5 - More text modifications in index.html

function getInfo() {
    alert("This web app is FREE, as in, well, FREE...\n" + 
        "Spot something that could be done better?\n" +
        "Let me know:  jayfrancis@aol.com\n" +
        "TM and SM are owned by FIRST and LEGO\n" +
        "V0.5\n");
}

var scoringItems;
var timerOn;
var countDownSeconds;
var timer;
var countDown = true;

function timerRun() {
    if ( ((countDown && (countDownSeconds > 0)) || !countDown) && timerOn) {
        var t = document.getElementById('timerText');
        var minutes = Math.floor(countDownSeconds / 60);
        var seconds = countDownSeconds % 60;    
        var tstring = String(minutes) + ":";
        if (seconds < 10)
            tstring += "0";
        tstring += String(seconds);
        t.innerHTML = tstring;
        if (countDown)
            countDownSeconds--;
        else
            countDownSeconds++;
    }
    else if (countDownSeconds == 0) {
        var t = document.getElementById('timerText');
        t.innerHTML = "0:00";
    }
    timer = setTimeout("timerRun();", 1000);
}

function timerToggle() {
    var b = document.getElementById('startStopButton');

    if (!timerOn) {
        b.innerHTML = "Pause";
        timerOn = true;
    }
    else {
        b.innerHTML = "Start";
        timerOn = false;                
    }
}

function countDirectionChange(direction) {
    timerOn = false;

    if (direction == "up") {
        countDown = false;
        countDownSeconds = 0;
    }
    else {
        countDown = true;
        countDownSeconds = 150;
    }

    var t = document.getElementById('countUpButton');
    t.checked = !countDown;
    t = document.getElementById('countDownButton');
    t.checked = countDown;

    t = document.getElementById('timerText');
    var minutes = Math.floor(countDownSeconds / 60);
    var seconds = countDownSeconds % 60;    
    var tstring = String(minutes) + ":";
    if (seconds < 10)
        tstring += "0";
    tstring += String(seconds);
    t.innerHTML = tstring;
    
    var b = document.getElementById('startStopButton');
    b.innerHTML = "Start";

}

function reset() {
    var item;
    var select;
    var option;    
    
    scoringItems = {
        "supplyTruckInYellow": "no",
        "evacutationSignUp": "no",
        "cargoPlaneLocation": "neitherYellowNorLtBlue",
        "treeBranchLower": "no",
        "treeCableModelsUpright": "yes",
        "tsunamiWavesTouchingMat": "no",
        "ambulanceInYellowWheelsTouchingMat": "no",
        "runwayClearExceptWavesOrPlane": "yes",
        "grayBuildingUnitsInLtGreen": "yes",
        "baseIsolationWestUndamaged": "yes",
        "baseIsolationEastDamaged": "no",
        "tallestBuildingInPink": "0",
        "furthestRegionEntered": "none",
        "houseLifted": "no",
        "progressPointerNumberOfColorsReached": "0",
        "familyTogether": "0",
        "peopleWithWater": "0",
        "peopleInYellow": "0",
        "peopleInRed": "0",
        "petsWithPeople": "0",
        "suppliesInYellow": "0",
        "suppliesInRed": "0",
        "robotInRed": "no",
        "penaltyTouchSprawl": "0",
        "penaltyLargeJunk": "0",
        "penaltySmallJunk": "0"
    };
    
    for (item in scoringItems) {
        select = document.getElementById(item);
        for (option in select.children) {
            if (select[option].nodeName == "OPTION") {
                if (select[option].value == scoringItems[item]) {
                    select[option].selected = true;
                }
                else {
                    select[option].selected = false;
                }
            }
        }
    }

    if (countDown)
        countDirectionChange('down');
    else
        countDirectionChange('up');
    
    update();

    if (!timer)
        timerRun();
}

//function checkPointer() {
//    //
//        
//    var pointerMajor = parseInt(document.getElementById("pointerMajor").value);
//    var pointerMinor = parseInt(document.getElementById("pointerMinor").value);
//    
//    if ( (pointerMajor == 9) && (pointerMinor > 0) ) {
//        var minorSelector;
//        minorSelector = document.getElementById('pointerMinor');
//        for (var i = 0; i < minorSelector.options.length; i++) {
//            minorSelector.options[i].selected = false;
//            if (minorSelector.options[i].value == String(0))
//                minorSelector.options[i].selected = true;
//        }
//    }
//}
//
//function checkChair(choice) {
//    var chairFixedInBase = document.getElementById('chairFixedInBase');
//    var chairFixedUnderTable = document.getElementById('chairFixedUnderTable');
//
//    switch(choice) {
//        case 'inBase':
//            if ( chairFixedInBase.value == "yes" ) {
//                chairFixedInBase.value = "yes";
//                chairFixedUnderTable.value = "no";
//            }
//            break;
//        case 'underTable':
//            if ( chairFixedUnderTable.value == "yes" ) {
//                chairFixedInBase.value = "no";
//                chairFixedUnderTable.value = "yes";
//            }
//            break;
//    }
//}
//
//function checkTransitions(choice) {
//    var robotTilted = document.getElementById('robotTilted');
//    var robotBalanced = document.getElementById('robotBalanced');
//
//    switch(choice) {
//        case 'tilted':
//            if ( robotTilted.value == "yes" ) {
//                robotTilted.value = "yes";
//                robotBalanced.value = "no";
//            }
//            break;
//        case 'balanced':
//            if ( robotBalanced.value == "yes" ) {
//                robotTilted.value = "no";
//                robotBalanced.value = "yes";
//            }
//            break;
//    }
//}

// conflict checks and limits...

// supply distribution (suppliesInYellow vs. suppliesInRed)

// people distribution
// peopleInYellow vs. peopleInRed
// also compare to family member groupings
// also if three people are together and water is with people, than should be three people with water

// if tallest built gray building pink is maximum, there shouldn't be any gray buildings left in light green


function update() {
    var item;
    var value;
    var score = 0;

    // update the current values
    for (item in scoringItems) {
        value =  document.getElementById(item).value;
        scoringItems[item] = value;
    }

    // Supply truck touching the mat in the yellow region.
    // Score: 20
    if (scoringItems.supplyTruckInYellow == 'yes')
                score += 20;

    // Evacutation sign up and held in place just by mat friction
    // nothing may be touching sign modell
    // Score: 30
    if ((scoringItems.evacutationSignUp == 'yes'))
        score += 30;

    // Cargo plane has landed in the yellow region
    // Score Yellow Only: 20
    // Score Light Blue: 30
    if ((scoringItems.cargoPlaneLocation == 'yellowOnly'))
        score += 20;
    else if ((scoringItems.cargoPlaneLocation == 'lightBlue'))
        score += 30;

    // Tree branch is closer to the table than the electrical wires
    // tree and electrical wire models are upright and touching the mat
    // Score: 30
    if ( (scoringItems.treeBranchLower == 'yes') && (scoringItems.treeCableModelsUpright == 'yes') )
        score += 30;
    
    // All three tsunami waves touching the mat
    // Score: 20
    if ((scoringItems.tsunamiWavesTouchingMat == 'yes'))
        score += 20;
    
    // Ambulance in yellow region with wheels touching the mat
    // Score: 25
    if ((scoringItems.ambulanceInYellowWheelsTouchingMat == 'yes'))
        score += 25;

    // Runway clear except tsunami waves or cargo plane
    // Score: 30
    if ((scoringItems.runwayClearExceptWavesOrPlane == 'yes'))
        score += 30;
    
    // No gray buildingings in light green region
    // Score: 20
    if ((scoringItems.grayBuildingUnitsInLtGreen == 'no'))
        score += 20;
    
    // Base Isolation Test passes if:
    // west tan building is undamaged (obviously, see rules for details)
    // east tan building is damaged
    // nothing touching buildings except frame
    // nothing ever touched buildings except frame
    // damage only by rolling frame
    // ...and check the other caveats/exceptions in the rules
    // Score: 30
    if ((scoringItems.baseIsolationWestUndamaged == 'yes') && (scoringItems.baseIsolationEastDamaged == 'yes'))
        score += 30;

    // How tall is the tallest gray building in the pink region
    // Score: 5 points per segment
    if ((scoringItems.tallestBuildingInPink != '0'))
        score += 5 * parseInt(scoringItems.tallestBuildingInPink);
    
    // What was the furthest region reached traveling over the obstacles?
    // Score: Dark Blue 10, Dark Green 16, Purple 23, Red 31
    switch (scoringItems.furthestRegionEntered) {
         case 'darkBlue':
             score += 10;
             break;
         case 'darkGreen':
             score += 16;
             break;
         case 'purple':
             score += 23;
             break;
         case 'red':
             score += 31;
             break;
         case 'none':
             break;
     }

    // House lifted and locked in position?
    // Score: 25
    if ((scoringItems.houseLifted == 'yes'))
        score += 25;

    // Number of colors that the progress pointer reached
    // Score: 2 points per color
    if ((scoringItems.progressPointerNumberOfColorsReached != '0'))
        score += 2 * parseInt(scoringItems.progressPointerNumberOfColorsReached);

    // Number of family members together in the same region
    // Score: 33 for 2, 66 for 3
    if ((scoringItems.familyTogether != '0'))
        score += 33 * (parseInt(scoringItems.familyTogether) - 1);

    // Number of people together with at least one water
    // Score: 15 points for each person with at least one water
    if ((scoringItems.peopleWithWater != '0'))
        score += 15 * parseInt(scoringItems.peopleWithWater);

    // People in safe regions
    // Score: 12 points per person in Yellow, 18 points for people in Red
    if ((scoringItems.peopleInYellow != '0'))
        score += 12 * parseInt(scoringItems.peopleInYellow);

    if ((scoringItems.peopleInRed != '0'))
        score += 18 * parseInt(scoringItems.peopleInRed);

    // Number of pets together with at least one person
    // Score: 15 points for each pet
    if ((scoringItems.petsWithPeople != '0'))
        score += 15 * parseInt(scoringItems.petsWithPeople);

    // Number of Non-water items in yellow or red regions
    // Score: 3 points each in Yellow, 4 points each in Red
    // 12 items total
    if ((scoringItems.suppliesInYellow != '0'))
        score += 3 * parseInt(scoringItems.suppliesInYellow);

    if ((scoringItems.suppliesInRed != '0'))
        score += 4 * parseInt(scoringItems.suppliesInRed);

    // And finally...
    // Robot is safe at the end of the match (in Red region)
    // Score: 25
    if ((scoringItems.robotInRed == 'yes'))
        score += 25;

    // Touch/Sprawl Penalties
    // Score: -10 each for penalties 1 through 4
    //        -13 each for penalties 5 and higher
    if ((scoringItems.penaltyTouchSprawl != '0')) {
        penalty = parseInt(scoringItems.penaltyTouchSprawl);        
        if (penalty > 4) {
            score -= 40 + 13 * (penalty - 4);
        }
        else
            score -= 10 * penalty;
    }

    // Junk penalties
    // Score: -5 each for junk smaller than the robot,
    //        -13 each junk larger than the robot
    if ((scoringItems.penaltySmallJunk != '0'))
        score -= 5 * parseInt(scoringItems.penaltySmallJunk);

    if ((scoringItems.penaltyLargeJunk != '0'))
        score -= 13 * parseInt(scoringItems.penaltyLargeJunk);

    // display the score
    var scoreText = document.getElementById('scoreText');
    scoreText.innerHTML = score;
}