
/*
 * Eine Reise Berlin-Köln mit dem Zug verbraucht ca. 27.5kg CO2 (Hin und Zurück)

*/
	const amountCO2 = 27.5; // Berlin - Köln hin und zurück mit dem Zug (ICE)

	export function equalsTrain(co2) {
		var amountRides = Math.round(co2/amountCO2);
		return amountRides;
	}


