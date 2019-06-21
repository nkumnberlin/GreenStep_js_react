
/*
 * Eine Reise Berlin-Köln mit dem Zug verbraucht ca. 27.5kg CO2 (Hin und Zurück)
 * 1 Liter CO2 = 1,96g
 * 1 kg CO2 = 509 Liter
 * x Kg CO2 * 509 liter = (y CO2 / Liter) / 1,5 Liter => z Flaschen CO2 
 *
*/

	const amountCO2 = 27.5; // Berlin - Köln hin und zurück mit dem Zug (ICE)
	const allowedCO2 = 1200;
	const volumeCO2 = 509; // ml!
	const bottleSize = 1500;

	export function equalsTrain(co2) {
		return (Math.round(co2/amountCO2 * 100)/ 100).toFixed(2);
	}

	export function allowedPercentage(co2) {
		return (Math.round((co2 / allowedCO2 *100)*100) / 100).toFixed(2);
	}

	export function equalsWaterBottles(co2) {
		let bottles = co2 * volumeCO2 / bottleSize;
		bottles = Math.round(bottles * 100 / 100);
		return bottles;
	}


