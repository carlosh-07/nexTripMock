import { selectionMap } from "../constants";

describe("selectionMap", () => {
  it('should return the correct api for "direction" given the correct params', () => {
    expect(selectionMap.direction.getApiString({ routeId: "2023" })).toEqual(
      "https://svc.metrotransit.org/nextripv2/directions/2023"
    );
  });
  it('should return the correct api for "stop" given the correct params', () => {
    expect(
      selectionMap.stop.getApiString({ routeId: "2023", directionId: "0" })
    ).toEqual("https://svc.metrotransit.org/nextripv2/stops/2023/0");
  });
});
