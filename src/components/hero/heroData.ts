export type HeroState = {
  id: number;

  leftEyebrow: string;
  leftEnglish: string;
  leftGujarati: string;

  rightEyebrow: string;
  rightEnglish: string;
  rightGujarati: string;

  showCTA?: boolean;
};

export const heroStates: HeroState[] = [
  {
    id: 1,

    leftEyebrow: "Siddhi Group",
    leftEnglish: "Building spaces.",
    leftGujarati: "અમે બનાવીએ છીએ જગ્યાઓ.",

    rightEyebrow: "Our Vision",
    rightEnglish: "Creating possibilities.",
    rightGujarati: "નવી શક્યતાઓ ઊભી કરીએ છીએ.",
  },

  {
    id: 2,

    leftEyebrow: "For Living",
    leftEnglish: "More than",
    leftGujarati: "માત્ર ચાર દિવાલો નહીં.",

    rightEyebrow: "A Place",
    rightEnglish: "A place to belong.",
    rightGujarati: "પોતાનું લાગે એવી જગ્યા.",
  },

  {
    id: 3,

    leftEyebrow: "For Families",
    leftEnglish: "Where life",
    leftGujarati: "જ્યાં જીવન",

    rightEyebrow: "Comes Together",
    rightEnglish: "comes together.",
    rightGujarati: "સાથે આવે છે.",
  },

  {
    id: 4,

    leftEyebrow: "For Work",
    leftEnglish: "Spaces to",
    leftGujarati: "કામ માટેની જગ્યા.",

    rightEyebrow: "For Growth",
    rightEnglish: "think. work. grow.",
    rightGujarati: "વિચારવા. કામ કરવા. આગળ વધવા.",
  },

  {
    id: 5,

    leftEyebrow: "In Rajkot",
    leftEnglish: "Rooted here.",
    leftGujarati: "રાજકોટમાં જડેલી.",

    rightEyebrow: "For Rajkot",
    rightEnglish: "Built for its future.",
    rightGujarati: "રાજકોટના ભવિષ્ય માટે.",
  },

  {
    id: 6,

    leftEyebrow: "Beyond Apartments",
    leftEnglish: "Not just",
    leftGujarati: "માત્ર એપાર્ટમેન્ટ્સ નહીં.",

    rightEyebrow: "A Better Way",
    rightEnglish: "A better way to live.",
    rightGujarati: "જીવન જીવવાની નવી રીત.",
  },

  {
    id: 7,

    leftEyebrow: "Siddhi Group",
    leftEnglish: "Built for today.",
    leftGujarati: "આજ માટે બનાવેલું.",

    rightEyebrow: "Built for Tomorrow",
    rightEnglish: "Made for generations.",
    rightGujarati: "આવનારી પેઢીઓ માટે.",

    showCTA: true,
  },
];
