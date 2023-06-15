import React from "react";
import { GetServerSideProps } from "next";
import RouteTemplate from "../templates/RouteTemplate";

interface RouteProps {
  routes: RouteSelection[];
}

const Route: React.FC<RouteProps> = ({ routes }) => {
  return <RouteTemplate routes={routes} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`https://svc.metrotransit.org/nextripv2/routes`);
  const routes: RouteSelection[] = await response.json();

  return { props: { routes } };
};

export default Route;
