/**
 * Ranked matcha visits. Cover photos live in public/matcha/{id}.jpg.
 * Write the blog in `body`. Extra visit photos go in public/matcha/{id}/.
 */
export type MatchaShop = {
  id: string;
  rank: number;
  name: string;
  location: string;
  mark: string;
  accent: "meadow" | "sage" | "denim" | "pollen" | "split";
  image: string | null;
  website: string | null;
  body: readonly string[];
  photos: readonly string[];
};

export const matcha: readonly MatchaShop[] = [
  {
    id: "12matcha",
    rank: 1,
    name: "12matcha",
    location: "New York City",
    mark: "12",
    accent: "split",
    image: "/matcha/12matcha.jpg",
    website: "https://www.12matcha.com/",
    body: [],
    photos: [],
  },
  {
    id: "rok",
    rank: 2,
    name: "rōk",
    location: "Los Angeles",
    mark: "rō",
    accent: "pollen",
    image: "/matcha/rok.jpg",
    website: "https://www.rok-coffee.com/",
    body: [],
    photos: [],
  },
  {
    id: "labora",
    rank: 3,
    name: "Labora",
    location: "San Diego",
    mark: "La",
    accent: "meadow",
    image: "/matcha/labora.jpg",
    website: "https://laboracafe.com/",
    body: [],
    photos: [],
  },
  {
    id: "rikka-fika",
    rank: 4,
    name: "Rikka Fika",
    location: "San Diego",
    mark: "Rf",
    accent: "sage",
    image: "/matcha/rikka-fika.jpg",
    website: "https://rikkafika.com/",
    body: [],
    photos: [],
  },
  {
    id: "hinar",
    rank: 5,
    name: "Hinar",
    location: "San Diego",
    mark: "Hi",
    accent: "denim",
    image: "/matcha/hinar.jpg",
    website: "https://www.instagram.com/hinar.cafe/",
    body: [],
    photos: [],
  },
  {
    id: "archives-of-us",
    rank: 6,
    name: "ARCHIVES OF US",
    location: "Los Angeles",
    mark: "Au",
    accent: "split",
    image: "/matcha/archives-of-us.jpg",
    website: "https://archivesofus.com/",
    body: [],
    photos: [],
  },
  {
    id: "blank-street",
    rank: 7,
    name: "Blank Street",
    location: "Washington DC",
    mark: "Bs",
    accent: "pollen",
    image: "/matcha/blank-street.jpg",
    website: "https://www.blankstreet.com/",
    body: [],
    photos: [],
  },
  {
    id: "omomo",
    rank: 8,
    name: "Omomo",
    location: "San Diego",
    mark: "Om",
    accent: "meadow",
    image: "/matcha/omomo.jpg",
    website: "https://www.omomoteashoppe.com/",
    body: [],
    photos: [],
  },
  {
    id: "cha-no-ma",
    rank: 9,
    name: "Cha No Ma",
    location: "Vienna, AT",
    mark: "Cm",
    accent: "sage",
    image: "/matcha/cha-no-ma.jpg",
    website: "https://www.chanomavienna.at/",
    body: [],
    photos: [],
  },
  {
    id: "easy-does-it",
    rank: 10,
    name: "Easy Does It",
    location: "San Diego",
    mark: "Ed",
    accent: "denim",
    image: "/matcha/easy-does-it.jpg",
    website: "https://www.easydoesit-sd.com/",
    body: [],
    photos: [],
  },
  {
    id: "matcha-ya",
    rank: 11,
    name: "Matcha Ya",
    location: "Stockholm, SE",
    mark: "Ya",
    accent: "pollen",
    image: "/matcha/matcha-ya.jpg",
    website: "https://www.matchaya.se/",
    body: [],
    photos: [],
  },
];

export function getMatcha(id: string) {
  return matcha.find((shop) => shop.id === id);
}
