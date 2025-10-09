export const ONE_WEEK = 60 * 60 * 24 * 7;

export const DEFAULT_OCCASSION_OPTIONS = [
  {
    label: "Birthday",
    value: "birthday",
  },
  {
    label: "Christmas",
    value: "christmas",
  },
  {
    label: "Wedding",
    value: "wedding",
  },
  {
    label: "Baby Shower",
    value: "baby shower",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const DEFAULT_GIFT_OPTIONS = [
  {
    label: "Money",
    value: "money",
  },
  {
    label: "PS5",
    value: "ps5",
  },
  {
    label: "New Tires",
    value: "new tires",
  },
  {
    label: "Jersey",
    value: "jersey",
  },
  {
    label: "Cake",
    value: "cake",
  },
];

export const API_URL = `${process.env.NEXT_PUBLIC_APP_URL!}/api`;
export const BASE_URL = `${process.env.NEXT_PUBLIC_APP_URL!}`;

export const PASSWORD_REGEX_STRING =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^&()])[A-Za-z\d@$!%*?&_#^&()]{8,}$/;
