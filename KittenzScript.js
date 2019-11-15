//TODO: Have these be checkboxes on the page (for things like chrono and accel)
var bonfireBuildingMap = new Map([
    ["Hut", [1, true]],
    ["Log House", [2, true]],
    ["Mansion", [3, true]],
    ["Catnip field", [4, true]],
    ["Workshop", [5, true]],
    ["Steamworks", [6, true]],
    ["Magneto", [7, true]],
    ["Calciner", [8, true]],
    ["Mine", [9, true]],
    ["Reactor", [10, true]],
    ["Factory", [11, true]],
    ["Amphitheatre", [12, true]],
    ["Oil Well", [13, true]],
    ["Academy", [14, true]],
    ["Pasture", [15, true]],
    ["Solar Farm", [16, true]],
    ["Aqueduct", [17, true]],
    ["Hydro Plant", [18, true]],
    ["Library", [19, true]],
    ["Data Center", [20, true]],
    ["Observatory", [21, true]],
    ["Bio Lab", [22, true]],
    ["Barn", [23, true]],
    ["Warehouse", [24, false]],
    ["Harbour", [25, false]],
    ["Quarry", [26, false]],
    ["Lumber Mill", [27, true]],
    ["Accelerator", [28, false]],
    ["Smelter", [29, true]],
    ["Broadcast Tower", [30, true]],
    ["Chapel", [31, true]],
    ["Temple", [32, true]],
    ["Tradepost", [33, true]],
    ["Mint", [34, true]],
    ["Unic. Pasture", [35, true]],
    ["Ziggurat", [36, true]],
    ["Chronosphere", [37, false]]
]);

setupBonfireButtons = setInterval(function() {
    var buttons = game.tabs[0].buttons;
    for(var i = 0; i < buttons.length; i++){
        var priority = bonfireBuildingMap.get(buttons[i].opts.name);
        if(buttons[i].opts.building != null && priority != null && priority[1] == true){
            priority[2] = i;
        }
    }
}, 300 * 1000);

autoBuildBonfire = setInterval(function() {
    for(var i = 0; i < bonfireBuildingMap.size; i++){
        if(bonfireBuildingMap[i] != null && bonfireBuildingMap[i][1] == true){
            if(getComputedStyle(game.tabs[0].buttons[bonfireBuildingMap[i][2]]).cursor == 'pointer'){
                game.tabs[0].buttons[bonfireBuildingMap[i][2]].buttonTitle.click();
                console.log('Clicked ' + buildingButtons.get(i)[0]);
            }
            
        }
    }
}, 2 * 1000);





autoHunt = setInterval(function() {
	var catpower = game.resPool.get('manpower');
	if (catpower.value / catpower.maxValue > 0.90) {
    	$("#fastHuntContainerCount").click();
	}
}, 3 * 1000);

autoPray = setInterval(function() {
    var faith = gamePage.resPool.get('faith');
    if (faith.value / faith.maxValue > 0.95) {
        game.religion.praise();
    }
}, 60 * 1000);

autoBlueprint = setInterval(function() {
    //TODO: Have these be checkboxes on the page itself
	game.craftAll("parchment");
	game.craftAll("manuscript");
	game.craftAll("blueprint");
	game.craftAll("compedium");
}, 10 * 1000);

autoCraft = setInterval(function() {
	var resources = [
    	["wood", 	     "beam",     175],
    	["minerals",     "slab",     250],
        ["coal",         "steel",    100],
        ["iron",         "plate",    125],
    	["oil",  	     "kerosene", 7500],
        ["uranium",      "thorium",  250],
        //["titanium",     "alloy",    10],
        ["unobtainium",  "eludium",  1000]
	];

	for (var i = 0; i < resources.length; i++) {
    	var curRes = game.resPool.get(resources[i][0]);
    	if (curRes.value / curRes.maxValue > 0.95 && game.workshop.getCraft(resources[i][1]).unlocked) {
            //console.log("crafting " + resources[i][1]);
        	game.craft(resources[i][1], ((curRes.maxValue * 0.5) / resources[i][2]));
    	}
	}

    var nip = game.resPool.get("catnip")
	if (nip.perTickCached > 0 && nip.maxValue > 0.95) { 
        //console.log("crafting catnip");
        game.craft("wood", ((nip.maxValue * 0.5) / 50));
    }

}, 1.5 * 1000);

starClick = setInterval(function() { $("#observeBtn").click(); }, 15 * 1000);

//http://bloodrizer.ru/games/kittens/wiki/index.php?page=Monstrous+Advice&redirect=no