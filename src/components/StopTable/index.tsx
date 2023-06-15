import React from "react";
import styles from "../../app/page.module.css";

interface StopTableProps {
  stopData?: StopData;
}

const StopTable: React.FC<StopTableProps> = ({ stopData }) => {
  if (!stopData) {
    return null;
  }

  const { departures } = stopData;

  return (
    <table className={styles.table} data-testid="stopTable">
      <thead data-testid="tableHeader">
        <tr>
          <th className={styles.tableHeader}>Route</th>
          <th className={styles.tableHeader}>Destination</th>
          <th className={styles.tableHeader}>Departure Time</th>
        </tr>
      </thead>
      <tbody>
        {departures?.map((departure, index) => {
          return (
            <tr data-testid={`tableRow`} key={index}>
              <td className={styles.tableData} data-testid="routeCol">
                {departure.route_short_name}
              </td>
              <td className={styles.tableData} data-testid="destinationCol">
                {departure.description}
              </td>
              <td className={styles.tableData} data-testid="departureTimeCol">
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
