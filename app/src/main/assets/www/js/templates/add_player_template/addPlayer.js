ubsApp.getAddPlayerTemplate=function(templateConfig,tempVar){
	var object={};
	templateConfig=$.extend(templateConfig,object);
	templateConfig.openNextMove = ubsApp.openNextMoveAfterTransfer;
	tempVar.html+=ubsAddPlayerTemplate(templateConfig);

}


ubsApp.openAddPlayerTemplate = function(){
	ubsApp.startCurrentScenario();
	ubsApp.renderPageByName("addPlayerPage");
}

ubsApp.addNewPlayer = function() {
    $("#addPlayerValidationMessage").empty();
    let playerName = $("#playerNameInput").val();
    let playerAge = $("#playerAge").val();
    let gender = $("#playerGender").val();

    let message = "";

    if(!playerName) {
        message = ubsApp.getTranslation("ENTER_PLAYER_NAME");
    } else if(!playerAge) {
        message = ubsApp.getTranslation("ENTER_PLAYER_AGE");
    } else if(!gender) {
        message = ubsApp.getTranslation("ENTER_PLAYER_GENDER");
    }
    if(message) {
        $("#addPlayerValidationMessage").append(message);
        return;
    }
    let player = {};
    player.name = playerName;
    player.age = parseInt(playerAge);
    player.gender = gender;
    if(ubsApp.isAndroidEnabled) {
       Android.storePlayer(JSON.stringify(player));
    }
    message = ubsApp.getTranslation("PLAYER_ADDED_SUCCESSFULLY");
    ubsApp.openResultPopup({
                       "message" : message,
                       "header" : ubsApp.getTranslation("PLAYER_ADDED_HEADER"),
                       "headerStyle" : "text-align: center;  color: black; font-weight: 700; "
                       });
     if(ubsApp.isAndroidEnabled) {
        ubsApp.studentArray = JSON.parse(Android.getStudentList());
     } else {
        ubsApp.studentArray = JSON.parse("[{\r\n\t\"StudentId\": \"STU111451\",\r\n\t\"StudentName\": \"JITENDRA new RAMSAJIVAN\"\r\n}, {\r\n\t\"StudentId\": \"STU111453\",\r\n\t\"StudentName\": \"ANUSHKA AMIT TIVARI\"\r\n}, {\r\n\t\"StudentId\": \"STU111448\",\r\n\t\"StudentName\": \"ANUBHAV SANTOSH\"\r\n}]");

     }
    monopoly.initOnlinePlayers();
}