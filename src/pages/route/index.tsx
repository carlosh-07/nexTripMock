import { SelectWithFetch } from "@/components/SelectWithFetch";
import { StopTable } from "@/components/StopTable";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import RouteTemplate from "../templates/RouteTemplate";

export const metadata = {
  title: "Routes - Mock NexTrip",
  description: "Mock NexTrip",
};

const Route = ({ routes }) => {
  return <RouteTemplate routes={routes} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`https://svc.metrotransit.org/nextripv2/routes`);
  const routes = await response.json();

  return { props: { routes } };
};

export default Route;
