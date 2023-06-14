import StopTemplate from "@/pages/templates/StopTemplate";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Stop = ({ stopData }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return <StopTemplate initialStopData={stopData} stopNumber={id} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(
    `https://svc.metrotransit.org/nextripv2/${ctx.params.id}`
  );

  const stopData = await response.json();

  return { props: { stopData } };
};

export default Stop;
