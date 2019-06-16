
/*
 * Eine Reise Berlin-Köln mit dem Zug verbraucht ca. 27.5kg CO2 (Hin und Zurück)

*/
	const amountCO2 = 27.5; // Berlin - Köln hin und zurück mit dem Zug (ICE)
	const allowedCO2 = 1200;

	export function equalsTrain(co2) {
		let amountRides = Math.round(co2/amountCO2);
		return amountRides;
	}

	export function allowedPercentage(co2) {
		let percentage = Math.round(co2 / allowedCO2*100) / 100 * 100;
		return percentage;
	}


