export function transformMultiparPropertyBody(body: Record<string, any>): Record<string, any> {
  const intFields = [
    'squareFeet', 'interiorTotalSqFt', 'interiorlivableSqFt', 'interiorFinishedSqFt',
    'lotSizeSqFt', 'bedrooms', 'bathrooms', 'stories',
    'totalParkingSpaces', 'attachedGarageSpaces',
    'price', 'arv', 'rehabEstimate', 'resale90Day',
    'pricePerSqFt', 'taxAssessedValue', 'annualTaxAmount',
    'yearBuilt', 'auctionCountdown', 'dom'
  ];

  const floatFields = ['latitude', 'longitude'];
  const booleanFields = ['basement', 'isAuction', 'isNewConstruction', 'hasFireplace', 'propaneRental', 'electricUtility'];
  const arrayFields = [
    'roomTypes', 'listingTerms', 'appliances', 'features',
    'diningRoomFeatures', 'familyRoomFeature', 'kitchenRoomFeature',
    'parkingFeatures', 'fireplaceFeatures','deletedImageIds'
  ];

  const result: Record<string, any> = { ...body };

  for (const key of intFields) {
    if (key in result) result[key] = parseInt(result[key], 10);
  }

  for (const key of floatFields) {
    if (key in result) result[key] = parseFloat(result[key]);
  }

  for (const key of booleanFields) {
    if (key in result) result[key] = result[key] === 'true';
  }

  for (const key of arrayFields) {
    if (key in result) {
      if (Array.isArray(result[key])) {
        // Already parsed as array
        result[key] = result[key];
      } else {
        try {
          // If sent as JSON string like '["a","b"]'
          result[key] = JSON.parse(result[key]);
        } catch {
          // Fallback: comma separated
          result[key] = result[key].split(',').map((item: string) => item.trim());
        }
      }
    }
  }

  return result;
}




export function cleanDefaultSwaggerGarbage<T extends Record<string, any>>(dto: T): Partial<T> {
  const defaults = ['string', '0', 'false', 'true', '', null, undefined];

  const cleanValue = (val: any): any => {
    if (Array.isArray(val)) {
      const cleaned = val
        .map(cleanValue)
        .filter((item) => !defaults.includes(item));
      return cleaned.length > 0 ? cleaned : undefined;
    }

    if (typeof val === 'object' && val !== null) {
      const entries = Object.entries(val)
        .map(([k, v]) => [k, cleanValue(v)])
        .filter(([_, v]) => v !== undefined && !defaults.includes(v));
      return Object.fromEntries(entries);
    }

    return defaults.includes(val) ? undefined : val;
  };

  const cleanedEntries = Object.entries(dto)
    .map(([key, val]) => [key, cleanValue(val)])
    .filter(([_, val]) => val !== undefined);

  return Object.fromEntries(cleanedEntries) as Partial<T>;
}
