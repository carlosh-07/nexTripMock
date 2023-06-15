interface StopData {
  stops: Stop[];
  alerts: Alert[];
  departures: Departure[];
}

interface Departure {
  actual: boolean;
  trip_id: string;
  stop_id: number;
  departure_text: string;
  departure_time: number;
  description: string;
  gate?: string;
  route_id: string;
  route_short_name: string;
  direction_id: number;
  direction_text: string;
  terminal?: string;
  schedule_relationship: string;
}

interface Alert {
  stop_closed: boolean;
  alert_text: string;
}

interface Stop {
  stop_id: number;
  latitude: number;
  longitude: number;
  description: string;
}
