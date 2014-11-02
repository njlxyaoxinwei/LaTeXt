var parseMessage = function(msg){
	var i = 0;
	var result = [];
	var temp = new String;
	while (i<msg.length) {
		if (msg[i]==='\\') {
			temp = temp.concat(msg[i]);
			temp = temp.concat(msg[i+1]);
			i+=2;
		} else {
			if (msg[i]==='$') {
				result.push({text: temp, code: false});
				temp = new String;
				var j = i+1;
				while (j<msg.length && msg[j]!=='$') {
					if (msg[j]=='\\') {
						j += 2;
					} else {
						j++;
					}
				}
				if (j===msg.length || j===i+1) {
					return false;
				} else {
					result.push({text: msg.slice(i+1, j), code: true});
					i = j+1;
				}
			} else {
				temp = temp.concat(msg[i]);
				i++;
			}
		}
	}
	if (temp.length>0)
		result.push({text: temp, code: false});
	return result;
};


console.log(parseMessage("Hi! \\$\\$ is $\\latex\\$$"));
console.log(parseMessage("Hi! $\\int_asdf^\\inft$ another sentence $asdfk$ kasdjfksdf\\$ df"));
