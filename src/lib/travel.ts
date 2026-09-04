export type TravelPlace = {
  id: string;
  name: string;
  region: string;
  body: readonly string[];
};

export type TravelRegion = {
  id: string;
  label: string;
  places: readonly TravelPlace[];
};

function places(
  region: string,
  entries: readonly [id: string, name: string][],
): readonly TravelPlace[] {
  return entries.map(([id, name]) => ({
    id,
    name,
    region,
    body: [],
  }));
}

export const travelRegions: readonly TravelRegion[] = [
  {
    id: "north-america",
    label: "North America",
    places: places("North America", [
      ["mexico", "Mexico"],
      ["canada", "Canada"],
      ["usa", "USA"],
      ["guatemala", "Guatemala"],
    ]),
  },
  {
    id: "europe",
    label: "Europe",
    places: places("Europe", [
      ["france", "France"],
      ["italy", "Italy"],
      ["switzerland", "Switzerland"],
      ["iceland", "Iceland"],
      ["germany", "Germany"],
      ["austria", "Austria"],
      ["sweden", "Sweden"],
      ["finland", "Finland"],
      ["norway", "Norway"],
      ["denmark", "Denmark"],
      ["belgium", "Belgium"],
      ["netherlands", "Netherlands"],
      ["england", "England"],
    ]),
  },
  {
    id: "asia",
    label: "Asia",
    places: places("Asia", [
      ["hong-kong", "Hong Kong"],
      ["taiwan", "Taiwan"],
      ["philippines", "Philippines"],
      ["japan", "Japan"],
      ["south-korea", "South Korea"],
      ["malaysia", "Malaysia"],
      ["singapore", "Singapore"],
      ["thailand", "Thailand"],
      ["china", "China"],
    ]),
  },
  {
    id: "oceania",
    label: "Oceania",
    places: places("Oceania", [
      ["australia", "Australia"],
      ["new-zealand", "New Zealand"],
    ]),
  },
];

export const travel = travelRegions.flatMap((region) => region.places);

export function getTravel(id: string) {
  return travel.find((place) => place.id === id);
}
