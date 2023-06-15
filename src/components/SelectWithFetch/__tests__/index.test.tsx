import { render, screen, act, fireEvent } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { SelectWithFetch } from "..";

describe("SelectWithFetch", () => {
  const mockOnChange = jest.fn();
  beforeEach(() => {
    fetchMock.enableMocks();
    mockOnChange.mockReset();
  });

  describe("when selectionField is directions", () => {
    it("should not render anything if there are no selections available", () => {
      render(
        <SelectWithFetch selectionField="direction" onChange={mockOnChange} />
      );

      expect(screen.queryByTestId("selectWithFetch")).not.toBeInTheDocument();
    });

    it("should render and fetch when routeId is given", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            direction_id: 0,
            direction_name: "Eastbound",
          },
          {
            direction_id: 1,
            direction_name: "Westbound",
          },
        ])
      );

      await act(async () =>
        render(
          <SelectWithFetch
            selectionField="direction"
            onChange={mockOnChange}
            routeId="10"
          />
        )
      );

      expect(screen.queryByTestId("selectWithFetch")).toBeInTheDocument();
    });

    it("should call onChange when selecting different direction", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            direction_id: 0,
            direction_name: "Eastbound",
          },
          {
            direction_id: 1,
            direction_name: "Westbound",
          },
        ])
      );

      await act(async () =>
        render(
          <SelectWithFetch
            selectionField="direction"
            onChange={mockOnChange}
            routeId="10"
          />
        )
      );

      const directionSelection = await screen.findByTestId("selectionInput");
      fireEvent.change(directionSelection, { target: { value: 1 } });

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("when selectionField is stop", () => {
    it("should not render anything if there are no selections available", () => {
      render(<SelectWithFetch selectionField="stop" onChange={mockOnChange} />);

      expect(screen.queryByTestId("selectWithFetch")).not.toBeInTheDocument();
    });

    it("should render and fetch when routeId and directionId are given", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            place_code: "WA10",
            description: "Washington Ave and 10th Ave N",
          },
          {
            place_code: "MAWA",
            description: "Washington Ave and Marquette Ave",
          },
          {
            place_code: "ANHA",
            description: "Anderson Hall",
          },
        ])
      );

      await act(async () =>
        render(
          <SelectWithFetch
            selectionField="stop"
            onChange={mockOnChange}
            routeId="10"
            directionId="0"
          />
        )
      );

      expect(screen.queryByTestId("selectWithFetch")).toBeInTheDocument();
    });

    it("should call the onChange function when we select a new target", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            place_code: "WA10",
            description: "Washington Ave and 10th Ave N",
          },
          {
            place_code: "MAWA",
            description: "Washington Ave and Marquette Ave",
          },
          {
            place_code: "ANHA",
            description: "Anderson Hall",
          },
        ])
      );

      await act(async () =>
        render(
          <SelectWithFetch
            selectionField="stop"
            onChange={mockOnChange}
            routeId="10"
            directionId="0"
          />
        )
      );

      const stopSelection = await screen.findByTestId("selectionInput");
      fireEvent.change(stopSelection, { target: { value: "WA10" } });

      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
