import { StopTable } from "@/components/StopTable";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import styles from "../../app/page.module.css";

interface StopTemplateProps {
  stopNumber?: string;
  initialStopData?: StopData;
}

const StopTemplate: React.FC<StopTemplateProps> = ({
  stopNumber,
  initialStopData,
}) => {
  const [stopData, setStopData] = useState<StopData | undefined>(
    initialStopData
  );
  const [userInputForStop, setUserInputForStop] = useState("");

  const handleStopInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      router.push(`/stop/${userInputForStop}`);
    } catch (e) {
      console.error(e);
    }
  }, [userInputForStop]);

  return (
    <div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={userInputForStop}
          onChange={handleStopInputChange}
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="Enter stop number"
          className={styles.inputFont}
        />
        <button className={styles.inputFont} onClick={onStopInfoSubmit}>
          Get Stop Info
        </button>
      </div>
      {stopNumber && (
        <div className={styles.header}>
          <h1>{stopData?.stops[0].description}</h1>
          <h2>Stop # {stopNumber}</h2>
        </div>
      )}
      <StopTable stopData={stopData} />
    </div>
  );
};

export default StopTemplate;
