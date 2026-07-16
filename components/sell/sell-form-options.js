export const SELL_FORM_OPTIONS = {
  category: [
    "Bike",
    "Scooty",
    "Car",
    "SUV",
    "Pickup",
    "Truck",
    "Van",
    "Auto",
    "Other",
  ],

  registration: [
    "MZ01",
    "MZ02",
    "MZ03",
    "MZ04",
    "MZ05",
    "MZ06",
    "MZ07",
    "MZ08",
    "MZ09",
    "MZ10",
    "MZ11",
    "Other",
  ],

  fuel: ["Petrol", "Diesel", "EV", "Other"],

  transmission: ["Manual", "Automatic"],

  city: [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Serchhip",
    "Kolasib",
    "Mamit",
    "Siaha",
    "Lawngtlai",
    "Hnahthial",
    "Saitual",
    "Khawzawl",
  ],
};

export const DEFAULT_SELL_FORM_VALUES = {
  brand: "",
  model: "",
  category: "",
  registration: "",
  locality: "",
  year: "",
  fuel: "",
  transmission: "",
  price: "",
  city: "",
  description: "",
  phone: "",
  whatsapp: "",
  seller: "",
};
