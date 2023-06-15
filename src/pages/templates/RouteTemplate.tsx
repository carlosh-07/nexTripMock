import { SelectWithFetch } from "@/components/SelectWithFetch";
import { StopTable } from "@/components/StopTable";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import styles from "../../app/page.module.css";

interface RouteTemplateProps {
  routes: RouteSelection[];
  initialStopData?: StopData;
}

const RouteTemplate: React.FC<RouteTemplateProps> = ({
  routes,
  initialStopData,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>();
  const [selectedDirectionId, setSelectedDirectionId] = useState<string>();
  const [selectedStopId, setSelectedStopId] = useState<string>();

  const [stopData, setStopData] = useState<StopData | undefined>(
    initialStopData
  );

  const handleSelectedRoute = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedRouteId(event.target.value);
    },
    []
  );

  const handleSelectedDirection = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedDirectionId(event.target.value);
    },
    []
  );

  const handleSelectedStop = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedStopId(event.target.value);
    },
    []
  );

  const router = useRouter();

  useEffect(() => {
    const fetchStopData = async () => {
      try {
        const response = await fetch(
          `https://svc.metrotransit.org/nextripv2/${selectedRouteId}/${selectedDirectionId}/${selectedStopId}`
        );
        const data = await response.json();
        setStopData(data);
        router.push(
          {
            query: {
              route: selectedRouteId,
              dir: selectedDirectionId,
              stop: selectedStopId,
            },
          },
          `/route/${selectedRouteId}/${selectedDirectionId}/${selectedStopId}`
        );
      } catch (e) {
        console.error(e);
      }
    };
    if (selectedStopId) {
      fetchStopData();
    }
  }, [selectedStopId]);

  return (
    <div>
      <div className={styles.inputSelect}>
        <label className={styles.inputFont} htmlFor="routes">
          Choose a route:
        </label>
        <select
          className={styles.inputFont}
          onChange={handleSelectedRoute}
          name="routes"
          id="routes"
        >
          <option value="">Select route</option>
          {routes.map((route) => {
            return (
              <option value={route.route_id} key={route.route_id}>
                {route.route_label}
              </option>
            );
          })}
        </select>
        <SelectWithFetch
          routeId={selectedRouteId}
          onChange={handleSelectedDirection}
          selectionField="direction"
        />
        <SelectWithFetch
          routeId={selectedRouteId}
          directionId={selectedDirectionId}
          onChange={handleSelectedStop}
          selectionField="stop"
        />
      </div>
      {stopData && <StopTable stopData={stopData} />}
    </div>
  );
};

export default RouteTemplate;
