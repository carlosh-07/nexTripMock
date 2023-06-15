interface DirectionSelections {
  direction_id: number;
  direction_name: string;
}

interface StopSelections {
  place_code: string;
  description: string;
}

type SelectionMapIdKey = "direction_id" | "place_code";
