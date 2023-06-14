import React, { useEffect, useState } from "react";
import { selectionMap } from "./constants";

interface SelectWithFetchProps {
  routeId?: string;
  onChange: any;
  selectionField: "stop" | "direction";
  directionId?: string;
}

const SelectWithFetch: React.FC<SelectWithFetchProps> = ({
  routeId,
  onChange,
  selectionField,
  directionId,
}) => {
  const [selections, setSelections] = useState([]);

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
      <div>
        <label htmlFor={selectionField}>Choose a direction:</label>
        <select name={selectionField} id={selectionField} onChange={onChange}>
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
      </div>
    );
  } else return null;
};

export { SelectWithFetch };
