import React, { useEffect, useState } from "react";
import { selectionMap } from "./constants";
import styles from "../../app/page.module.css";

interface SelectWithFetchProps {
  routeId?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectionField: "stop" | "direction";
  directionId?: string;
}

const SelectWithFetch: React.FC<SelectWithFetchProps> = ({
  routeId,
  onChange,
  selectionField,
  directionId,
}) => {
  const [selections, setSelections] = useState<
    DirectionSelections[] | StopSelections[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          selectionMap[selectionField].getApiString({ routeId, directionId })
        );

        const data = await response.json();
        setSelections(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (routeId) {
      fetchData();
    }
  }, [routeId, directionId]);

  if (selections.length) {
    return (
      <>
        <label className={styles.inputFont} htmlFor={selectionField}>
          Choose a {selectionField}:
        </label>
        <select
          data-testid="selectionInput"
          name={selectionField}
          id={selectionField}
          onChange={onChange}
          className={styles.inputFont}
        >
          <option value="">Select {selectionField}</option>
          {selections.map((selection) => {
            return (
              <option
                value={selection[selectionMap[selectionField].idKey]}
                key={selection[selectionMap[selectionField].idKey]}
              >
                {selection[selectionMap[selectionField].labelKey]}
              </option>
            );
          })}
        </select>
      </>
    );
  } else return null;
};

export { SelectWithFetch };
