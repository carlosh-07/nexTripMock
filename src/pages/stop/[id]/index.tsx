import StopTemplate from "@/pages/templates/StopTemplate";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface StopProps {
  stopData: StopData;
}

const Stop: React.FC<StopProps> = ({ stopData }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return <StopTemplate initialStopData={stopData} stopNumber={id as string} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(
    `https://svc.metrotransit.org/nextripv2/${ctx.params.id}`
  );

  const stopData: StopData = await response.json();

  return { props: { stopData } };
};

export default Stop;
