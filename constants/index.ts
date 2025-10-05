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

export const API_URL = `${process.env.NEXT_PUBLIC_APP_URL!}/api`;
