import { render, screen, within } from "@testing-library/react";
import { StopTable } from "..";
import { mockStopData } from "./mockStopData";

describe("StopTable", () => {
  describe("without stopData", () => {
    it("should not render if no stopData is passed", () => {
      render(<StopTable />);

      expect(screen.queryByTestId("stopTable")).not.toBeInTheDocument();
    });
  });

  describe("with stopData", () => {
    beforeEach(() => {
      render(<StopTable stopData={mockStopData} />);
    });

    it("should render correct headers", () => {
      const tableHeader = screen.getByTestId("tableHeader");

      const thNodes = tableHeader.querySelectorAll("th");
      const headerText = Array.from(thNodes).map((node) => node.textContent);

      expect(headerText[0]).toEqual("Route");
      expect(headerText[1]).toEqual("Destination");
      expect(headerText[2]).toEqual("Departure Time");
    });

    it("should render each row of data correctly", () => {
      const rows = screen.getAllByTestId("tableRow");

      const [firstRow, secondRow] = rows;

      const firstRowDepartureCol =
        within(firstRow).getByTestId("departureTimeCol");

      expect(within(firstRow).getByTestId("routeCol").textContent).toEqual(
        "Orange"
      );
      expect(
        within(firstRow).getByTestId("destinationCol").textContent
      ).toEqual("Minneapolis / Rapid");

      expect(firstRowDepartureCol.textContent).toEqual("18 Min");

      expect(
        within(firstRowDepartureCol).getByTestId("actualTimeIcon")
      ).toBeInTheDocument();

      // Second Row

      const secondRowDepartureCol =
        within(secondRow).getByTestId("departureTimeCol");

      expect(within(secondRow).getByTestId("routeCol").textContent).toEqual(
        "Orange"
      );
      expect(
        within(secondRow).getByTestId("destinationCol").textContent
      ).toEqual("Minneapolis / Rapid");

      expect(secondRowDepartureCol.textContent).toEqual("7:56");

      expect(
        within(secondRowDepartureCol).queryByTestId("actualTimeIcon")
      ).not.toBeInTheDocument();
    });
  });
});
