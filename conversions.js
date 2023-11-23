function ConvertDistance(distance, milesToKm = false)
{
    const conversionFactor = 1.609344;
    var result;
    if(milesToKm == true)
        result = distance * conversionFactor;
    else
        result = distance / conversionFactor;

    return result;
}

function ConvertUnitsPerDistance(unitsPerDistance)
{
    const economyConversionFactor = 282.481053;
    var result = economyConversionFactor / unitsPerDistance;;

    return result;
}

function ConvertMoneyPerVolume(pricePerUnit, convertingToGallons)
{
    const conversionFactor = 4.54609;
    var result;
    if(convertingToGallons == true)
        result = pricePerUnit / conversionFactor;
    else
        result = pricePerUnit * conversionFactor;

    return result;
}

function TruncateDecimalPlaces(number, places = 1)
{
    var placesCoeff = Math.pow(10, places);

    return Math.round((number + Number.EPSILON) * placesCoeff) / placesCoeff;
}