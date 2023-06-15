import React from "react";

interface StopTableProps {
  stopData?: StopData;
}

const StopTable: React.FC<StopTableProps> = ({ stopData }) => {
  if (!stopData) {
    return null;
  }

  const { departures } = stopData;

  return (
    <table data-testid="stopTable">
      <thead data-testid="tableHeader">
        <tr>
          <th>Route</th>
          <th>Destination</th>
          <th>Departure Time</th>
        </tr>
      </thead>
      <tbody>
        {departures?.map((departure, index) => {
          return (
            <tr data-testid={`tableRow`} key={index}>
              <td data-testid="routeCol">{departure.route_short_name}</td>
              <td data-testid="destinationCol">{departure.description}</td>
              <td data-testid="departureTimeCol">
                {departure.actual && (
                  <img
                    data-testid="actualTimeIcon"
                    src="https://www.metrotransit.org/img/svg/broadcast-blue.svg"
                  />
                )}
                {departure.departure_text}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { StopTable };
