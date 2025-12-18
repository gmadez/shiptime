import type { ShippingRatesResponse } from "../net/shippingRatesTypes";

const mockShippingRates: ShippingRatesResponse = {
  availableRates: [
    {
      baseCharge: {
        currency: "CAD",
        amount: 1476,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 342,
          },
          code: "FUEL",
          name: "FUEL",
        },
        {
          price: {
            currency: "CAD",
            amount: 45,
          },
          code: "OTHER",
          name: "PEAK SEASON RESIDENTIAL SURCHARGE",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 242,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 2105,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1863,
      },
      exchangeRate: 0.0,
      carrierId: "172",
      carrierName: "Nationex",
      serviceId: "GRD",
      serviceName: "Ground",
      transitDays: 2,
      transitUnit: "Days",
      accessTimeInterval: "2:00",
      quoteId: "27fc2827e9b9f2b22bb88b59be3f817b",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1512,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 325,
          },
          code: "FUEL",
          name: "Fuel surcharge",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 239,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 2076,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1837,
      },
      exchangeRate: 0.0,
      carrierId: "24",
      carrierName: "Canada Post",
      serviceId: "DOM.EP",
      serviceName: "Expedited Parcel",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "14:00",
      accessTimeInterval: "2:00",
      quoteId: "ad7e3684eb470bbc9aff971a41b0e610",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1486,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 319,
          },
          code: "FUEL",
          name: "Fuel surcharge",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 235,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 2040,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1805,
      },
      exchangeRate: 0.0,
      carrierId: "24",
      carrierName: "Canada Post",
      serviceId: "DOM.RP",
      serviceName: "Regular Parcel",
      transitDays: 2,
      transitUnit: "Days",
      cutoffTime: "14:00",
      accessTimeInterval: "2:00",
      quoteId: "a1fd2834be34e39f958ab6d54b3f84d0",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1811,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 390,
          },
          code: "FUEL",
          name: "Fuel surcharge",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 286,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 2487,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 2201,
      },
      exchangeRate: 0.0,
      carrierId: "24",
      carrierName: "Canada Post",
      serviceId: "DOM.XP",
      serviceName: "Xpresspost",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "14:00",
      accessTimeInterval: "2:00",
      quoteId: "40cbc24100e3ca1300eef234d24fcf83",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1146,
      },
      surcharges: [],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 149,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 1295,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1146,
      },
      exchangeRate: 0.0,
      carrierId: "177",
      carrierName: "Uber",
      serviceId: "uber",
      serviceName: "Uber Direct",
      transitDays: 15,
      transitUnit: "Minutes",
      accessTimeInterval: "2:00",
      quoteId: "88a8f3d600e96785c5b4124a1025e41c",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 771,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 29,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 104,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 904,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 800,
      },
      exchangeRate: 0.0,
      carrierId: "359",
      carrierName: "Dragonfly",
      serviceId: "standard",
      serviceName: "Standard",
      transitDays: 1,
      transitUnit: "Days",
      accessTimeInterval: "2:00",
      quoteId: "86ef10cd16fc0d57a97a2638bcd07087",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 854,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 100,
          },
          code: "RESIDENTIAL",
          name: "RESIDENTIAL",
        },
        {
          price: {
            currency: "CAD",
            amount: 245,
          },
          code: "FUEL",
          name: "FUEL",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 156,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 1355,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1199,
      },
      exchangeRate: 0.0,
      carrierId: "123",
      carrierName: "Loomis",
      serviceId: "DD",
      serviceName: "Loomis Ground",
      transitDays: 1,
      transitUnit: "Days",
      accessTimeInterval: "2:00",
      quoteId: "52897785f3ce3f0af0f613f79a00045a",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1161,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 240,
          },
          code: "RESIDENTIAL",
          name: "RESIDENTIAL",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 182,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 1583,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1401,
      },
      exchangeRate: 0.0,
      carrierId: "14",
      carrierName: "Canpar",
      serviceId: "1",
      serviceName: "Ground",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "10:00",
      accessTimeInterval: "4:00",
      quoteId: "fe7d09c4df17817264b53de526e96cb2",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 1435,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 240,
          },
          code: "RESIDENTIAL",
          name: "RESIDENTIAL",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 218,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 1893,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 1675,
      },
      exchangeRate: 0.0,
      carrierId: "14",
      carrierName: "Canpar",
      serviceId: "5",
      serviceName: "Select",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "10:00",
      accessTimeInterval: "4:00",
      quoteId: "7b5d80ebc7874d0a88940a52f621a9ae",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 8393,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 2274,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 1447,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 12579,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 11132,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorExpress9AM",
      serviceName: "Purolator Express 9AM",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "206ad01f9d2fde5c4b626884b4436848",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 5363,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 1502,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 953,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 8283,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 7330,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorExpress10:30AM",
      serviceName: "Purolator Express 10:30AM",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "1af4a10dd8daff29af40186db5cbc6af",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 4721,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 1376,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 853,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 7415,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 6562,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorExpress12PM",
      serviceName: "Purolator Express 12PM",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "eb147c4031c287f323d0b97b514183df",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 3195,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 943,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 598,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 5201,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 4603,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorExpress",
      serviceName: "Purolator Express",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "af3c1a00b26a37a4853cb049a032ecc4",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 4520,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 1325,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 820,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 7130,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 6310,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorQuickship",
      serviceName: "Purolator QuickShip",
      transitDays: 1,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "a89a12f0a7ec50c6b7eb3f851574fecf",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 3124,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 926,
          },
          code: "FUEL",
          name: "Fuel Surcharge",
        },
        {
          price: {
            currency: "CAD",
            amount: 465,
          },
          code: "RESIDENTIAL",
          name: "Residential Delivery",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 587,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 5102,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 4515,
      },
      exchangeRate: 0.0,
      carrierId: "26",
      carrierName: "Purolator",
      serviceId: "PurolatorGround",
      serviceName: "Purolator Ground",
      transitDays: 2,
      transitUnit: "Days",
      cutoffTime: "17:30",
      accessTimeInterval: "2:00",
      quoteId: "5738b71baff1b8469729048eafcf33d9",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 6445,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 951,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 961,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 8357,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 7396,
      },
      exchangeRate: 0.0,
      carrierId: "203",
      carrierName: "Fedex",
      serviceId: "FEDEX_EXPRESS_SAVER",
      serviceName: "FedEx Economy",
      transitDaysMax: 7,
      transitUnit: "Days",
      cutoffTime: "17:00",
      accessTimeInterval: "1:30",
      quoteId: "e46eb289c4a8ac08d93011954618fa77",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 6445,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 951,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 961,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 8357,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 7396,
      },
      exchangeRate: 0.0,
      carrierId: "203",
      carrierName: "Fedex",
      serviceId: "FEDEX_2_DAY",
      serviceName: "FedEx 2Day\u00AE",
      transitDaysMax: 7,
      transitUnit: "Days",
      cutoffTime: "17:00",
      accessTimeInterval: "1:30",
      quoteId: "1c224af2309032cd26bb7f8104cd74ee",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 12976,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 1913,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 1936,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 16825,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 14889,
      },
      exchangeRate: 0.0,
      carrierId: "203",
      carrierName: "Fedex",
      serviceId: "FIRST_OVERNIGHT",
      serviceName: "FedEx First Overnight\u00AE",
      transitDaysMax: 7,
      transitUnit: "Days",
      cutoffTime: "17:00",
      accessTimeInterval: "1:30",
      quoteId: "5b6035a70d64c608e3a9181430af845c",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 7331,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 1082,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 1094,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 9507,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 8413,
      },
      exchangeRate: 0.0,
      carrierId: "203",
      carrierName: "Fedex",
      serviceId: "PRIORITY_OVERNIGHT",
      serviceName: "FedEx Priority Overnight\u00AE",
      transitDaysMax: 7,
      transitUnit: "Days",
      cutoffTime: "17:00",
      accessTimeInterval: "1:30",
      quoteId: "811850168a711a400b95cc4e0cbd052e",
    },
    {
      baseCharge: {
        currency: "CAD",
        amount: 6445,
      },
      surcharges: [
        {
          price: {
            currency: "CAD",
            amount: 951,
          },
          code: "FUEL",
          name: "Fuel",
        },
      ],
      taxes: [
        {
          price: {
            currency: "CAD",
            amount: 961,
          },
          code: "TAX",
          name: "HST",
        },
      ],
      totalCharge: {
        currency: "CAD",
        amount: 8357,
      },
      totalBeforeTaxes: {
        currency: "CAD",
        amount: 7396,
      },
      exchangeRate: 0.0,
      carrierId: "203",
      carrierName: "Fedex",
      serviceId: "STANDARD_OVERNIGHT",
      serviceName: "FedEx Standard Overnight\u00AE",
      transitDaysMax: 7,
      transitUnit: "Days",
      cutoffTime: "17:00",
      accessTimeInterval: "1:30",
      quoteId: "764cd65acac675f5a92832321473a38b",
    },
  ],
};

export default mockShippingRates;
