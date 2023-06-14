export const selectionMap = {
  direction: {
    getApiString: ({ routeId }: { routeId?: string }) => {
      return `https://svc.metrotransit.org/nextripv2/directions/${routeId}`;
    },
    idKey: "direction_id",
    labelKey: "direction_name",
  },
  stop: {
    getApiString: ({
      routeId,
      directionId,
    }: {
      routeId?: string;
      directionId?: string;
    }) => {
      return `https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`;
    },
    idKey: "place_code",
    labelKey: "description",
  },
};
