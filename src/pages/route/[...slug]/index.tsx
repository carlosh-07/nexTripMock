import RouteTemplate from "@/pages/templates/RouteTemplate";
import { GetServerSideProps } from "next";
import React from "react";

interface RouteWithParamsProps {
  routes: RouteSelection[];
  initialStopData: StopData;
}

const RouteWithParams: React.FC<RouteWithParamsProps> = ({
  routes,
  initialStopData,
}) => {
  return <RouteTemplate routes={routes} initialStopData={initialStopData} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apisToFetch = ["https://svc.metrotransit.org/nextripv2/routes"];

  //@ts-ignore
  const [routeId, directionId, stopId] = ctx.query?.slug ?? [];

  if (routeId && directionId && stopId) {
    apisToFetch.push(
      `https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${stopId}`
    );
  }

  // Could add try catch and throw error if a call fails
  const responses = await Promise.all(apisToFetch.map((api) => fetch(api)));
  const data = await Promise.all(responses.map((response) => response.json()));

  const [routes, initialStopData] = data;

  return { props: { routes, initialStopData } };
};

export default RouteWithParams;
