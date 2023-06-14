import { StopTable } from "@/components/StopTable";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const StopTemplate = ({ stopNumber, initialStopData }) => {
  const [stopData, setStopData] = useState(initialStopData);
  const [userInputForStop, setUserInputForStop] = useState();

  const handleStopInputChange = (event) => {
    const { value } = event.target;
    setUserInputForStop(value.replace(/\D/g, ""));
  };

  const router = useRouter();

  const onStopInfoSubmit = useCallback(async () => {
    try {
      const response = await fetch(
        `https://svc.metrotransit.org/nextrip/${userInputForStop}`
      );
      const data = await response.json();
      setStopData(data);
      router.push(`${userInputForStop}`, undefined, { shallow: true });
    } catch (e) {
      console.error(e);
    }
  }, [userInputForStop]);

  return (
    <div>
      <input
        type="text"
        value={userInputForStop}
        onChange={handleStopInputChange}
        pattern="[0-9]*"
        inputMode="numeric"
        placeholder="Enter stop number"
      />
      <button onClick={onStopInfoSubmit}>Get Stop Info</button>
      {stopNumber && (
        <>
          <h1>Stop # {stopNumber}</h1>
        </>
      )}
      <StopTable stopData={stopData} />
    </div>
  );
};

export default StopTemplate;
