function warpPlayer(player,signTexts){
	player.tell('You are now being warped via warp sign.');
	
	player.setPosition(
		signTexts.text2+0.5,
		signTexts.text3+0.5,
		signTexts.text4+0.5
	);
	console.log("Warping player '"+player.name+"' via warp sign");
}
function parseSign(signAsBlock){
	return {
		text1:json.parse(signAsBlock.entityData.Text1.toString()).text,
		text2:json.parse(signAsBlock.entityData.Text2.toString()).text,
		text3:json.parse(signAsBlock.entityData.Text3.toString()).text,
		text4:json.parse(signAsBlock.entityData.Text4.toString()).text
	};
}
function isValidTeleport(signText,player){
	if(typeof(signText.text2)!='number'){
		if(player){
			player.tell("Invalid number '"+signText.text2+"' on line 2");
		}
		return false;
	}
	if(typeof(signText.text3)!='number'){
		if(player){
			player.tell("Invalid number '"+signText.text3+"' on line 3");
		}
		return false;
	}
	if(typeof(signText.text4)!='number'){
		if(player){
			player.tell("Invalid number '"+signText.text4+"' on line 4");
		}
		return false;
	}
	return true;
}
function getWarpSign(signText,world){
	var sign = world.getBlock(signText.text2,signText.text3,signText.text4);
	var signId = sign.id.toString();
	if(signId.contains('minecraft') & signId.contains('sign')){
		var warpSignTexts = parseSign(sign);
		if(warpSignTexts.text1.toLowerCase() == '[warp]'){
			return sign;
		}
	}
	return false;
}
events.listen("block.right_click",function(event){
	var id = event.block.id.toString();
	if(id.contains('minecraft') & id.contains('sign')){
		var signTexts = parseSign(event.block);
		if(signTexts.text1.toLowerCase() == '[teleport]'){
			//console.log("Teleport Sign");
			if(isValidTeleport(signTexts,event.player)){
				var sign = getWarpSign(signTexts,event.world);
				if(sign){
					warpPlayer(event.player,signTexts);
				}else{
					event.player.tell('There is no valid Warp sign at that location.');
				}
			}
		}
		if(signTexts.text1.toLowerCase() == '[warp]'){
			//console.log("Warp Sign");
		}
		
	}
});