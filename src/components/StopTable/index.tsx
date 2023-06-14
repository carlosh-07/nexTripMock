import React from "react";

const StopTable = ({ stopData }) => {
  if (!stopData) {
    return null;
  }

  const { departures } = stopData;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Destination</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {departures?.map((departure) => {
            return (
              <tr>
                <td>{departure.route_short_name}</td>
                <td>{departure.description}</td>
                <td>{departure.departure_text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { StopTable };
