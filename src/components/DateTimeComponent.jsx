import { useState, useEffect } from "react";

function DateTimeComponent() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Function to update the date and time
  const showDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    setCurrentDateTime(formattedDateTime);
  };

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(showDateTime, 1000); // update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h6 id="datetime">ວ/ທ : {currentDateTime}</h6>
    </div>
  );
}

export default DateTimeComponent;
