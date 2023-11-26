function MpgUpdate()
{
    var minMpgBoxValue = $("#mpgMinBox").val();
    var maxMpgBoxValue = $("#mpgMaxBox").val();

    if(minMpgBoxValue == "")
        $("#fuelPerKmMinBox").val("");
    else
    {
        var minLitresPerKm = ConvertUnitsPerDistance(minMpgBoxValue);
        minLitresPerKm = TruncateDecimalPlaces(minLitresPerKm, 3);
        $("#fuelPerKmMinBox").val(minLitresPerKm); 
    }

    if(maxMpgBoxValue == "")
        $("#fuelPerKmMaxBox").val("");
    else
    {    
        var maxLitresPerKm = ConvertUnitsPerDistance(maxMpgBoxValue);
        maxLitresPerKm = TruncateDecimalPlaces(maxLitresPerKm, 3);
        $("#fuelPerKmMaxBox").val(maxLitresPerKm); 
    }

    UpdateResults();
}

function FuelPerKmUpdate()
{
    var minLitresPerKmValue = $("#fuelPerKmMinBox").val();
    var maxLitresPerKmValue = $("#fuelPerKmMaxBox").val();

    if(minLitresPerKmValue == "")
        $("#mpgMinBox").val("");
    else
    {
        var minMpg = ConvertUnitsPerDistance(minLitresPerKmValue);
        minMpg = TruncateDecimalPlaces(minMpg, 3);
        $("#mpgMinBox").val(minMpg);
    }
    
    if(maxLitresPerKmValue == "")
        $("#mpgMaxBox").val("");
    else
    {
        var maxMpg = ConvertUnitsPerDistance(maxLitresPerKmValue);
        maxMpg = TruncateDecimalPlaces(maxMpg, 3);
        $("#mpgMaxBox").val(maxMpg);
    }

    UpdateResults();
}

function MilesDistanceUpdate()
{
    var mileDistance = $("#milesBox").val();

    if(mileDistance == "")
        $("#kmBox").val("");
    else
    {
        var distanceInKm = ConvertDistance(mileDistance, true);
        distanceInKm = TruncateDecimalPlaces(distanceInKm, 3);
        $("#kmBox").val(distanceInKm);
    }

    UpdateResults();
}

function KilometresDistanceUpdate()
{
    var kmDistance = $("#kmBox").val();

    if(kmDistance == "")
        $("#milesBox").val("");
    else
    {
        var distanceInMiles = ConvertDistance(kmDistance);
        distanceInMiles = TruncateDecimalPlaces(distanceInMiles, 3);
        $("#milesBox").val(distanceInMiles);
    }

    UpdateResults();
}

function PricePerLitreUpdate()
{
    var pricePerLitre = $("#pricePerLitreBox").val();

    if(pricePerLitre == "")
        $("#pricePerGallonBox").val("");
    else
    {
        var pricePerGallon = ConvertMoneyPerVolume(pricePerLitre, true);
        pricePerGallon = TruncateDecimalPlaces(pricePerGallon, 3);
        $("#pricePerGallonBox").val(pricePerGallon);
    }

    UpdateResults();
}

function PricePerGallonUpdate()
{
    var pricePerGallon = $("#pricePerGallonBox").val();

    if(pricePerGallon == "")
        $("#pricePerLitreBox").val("");
    else
    {
        var pricePerLitre = ConvertMoneyPerVolume(pricePerGallon, false);
        pricePerLitre = TruncateDecimalPlaces(pricePerLitre, 3);
        $("#pricePerLitreBox").val(pricePerLitre);
    }

    UpdateResults();
}

function UpdateResults()
{
    $("#pricePerMileBox").val(GetPricePerMile);
    $("#pricePerKmBox").val(GetPricePerKm);

    $("#fuelUsedForJourneyGallonsBox").val(GetVolumePerDistance(true));
    $("#fuelUsedForJourneyLitresBox").val(GetVolumePerDistance(false));
    
    $("#totalCostBox").val(GetTotalCost());
}

function GetPricePerMile()
{
    var minMpgBoxValue = $("#mpgMinBox").val();
    var maxMpgBoxValue = $("#mpgMaxBox").val();
    var pricePerGallon = $("#pricePerGallonBox").val();

    var result = "";

    if(pricePerGallon != "")
    {
        
        if(minMpgBoxValue != "")
        {
            var maxPricePerMile = (1.0 / maxMpgBoxValue) * pricePerGallon;
            result += TruncateDecimalPlaces(maxPricePerMile, 2);
        }
        if(maxMpgBoxValue != "")
        {
            if(result != "")
                result += " - "

            var minPricePerMile = (1.0 / minMpgBoxValue) * pricePerGallon;
            result += TruncateDecimalPlaces(minPricePerMile, 2);
        }
    }

    return result;
}

function GetPricePerKm()
{
    var minLitreBoxValue = $("#fuelPerKmMinBox").val();
    var maxLitreBoxValue = $("#fuelPerKmMaxBox").val();
    var pricePerLitre = $("#pricePerLitreBox").val();

    var result = "";

    if(pricePerLitre != "")
    {
        if(minLitreBoxValue != "")
        {
            var maxPricePerKm = (maxLitreBoxValue / 100.0) * pricePerLitre;
            result += TruncateDecimalPlaces(maxPricePerKm, 2);
        }
        if(maxLitreBoxValue != "")
        {
            if(result != "")
                result += " - "

            var minPricePerKm = (minLitreBoxValue / 100.0) * pricePerLitre;
            result += TruncateDecimalPlaces(minPricePerKm, 2);
        }
    }

    return result;
}

function GetVolumePerDistance(inGallons = false)
{
    var result = "";

    if(inGallons == false)
    {
        var minLitreBoxValue = $("#fuelPerKmMinBox").val();
        var maxLitreBoxValue = $("#fuelPerKmMaxBox").val();
        var kmDistance = $("#kmBox").val();

        if(kmDistance != "")
        {   
            if(maxLitreBoxValue != "")
            {                
                result += TruncateDecimalPlaces((maxLitreBoxValue / 100.0) * kmDistance, 2);
            }
            if(minLitreBoxValue != "")
            {
                if(result != "")
                    result += " - ";
                    
                result += TruncateDecimalPlaces((minLitreBoxValue / 100.0) * kmDistance, 2);
            }
        }
    }
    else
    {
        var minMpgBoxValue = $("#mpgMinBox").val();
        var maxMpgBoxValue = $("#mpgMaxBox").val();
        var mileDistance = $("#milesBox").val();

        if(mileDistance != "")
        {
            if(maxMpgBoxValue != "")
            {
                result += TruncateDecimalPlaces(mileDistance / maxMpgBoxValue, 2);
            }
            if(minMpgBoxValue != "")
            {
                if(result != "")
                    result += " - ";
                
                result += TruncateDecimalPlaces(mileDistance / minMpgBoxValue, 2);
            }
        }
    }

    return result;
}

function GetTotalCost()
{
    var minLitreBoxValue = $("#fuelPerKmMinBox").val();
    var maxLitreBoxValue = $("#fuelPerKmMaxBox").val();
    var pricePerLitre = $("#pricePerLitreBox").val();
    var kmDistance = $("#kmBox").val();

    var result = "";

    if(pricePerLitre != "" && kmDistance != "")
    {
        if(minLitreBoxValue != "")
        {
            var maxPricePerKm = (maxLitreBoxValue / 100.0) * pricePerLitre;
            result += TruncateDecimalPlaces(maxPricePerKm * kmDistance, 2);
        }
        if(maxLitreBoxValue != "")
        {   
            if(result != "")
                result += " - "

            var minPricePerKm = (minLitreBoxValue / 100.0) * pricePerLitre;
            result += TruncateDecimalPlaces(minPricePerKm * kmDistance, 2);
        }
    }

    return result;
}