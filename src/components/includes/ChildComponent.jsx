import React, { useState, useEffect } from "react";
import axios from "axios"; // To make the API call

function ChildComponent() {
  const [userDetails, setUserDetails] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { first_name, last_name } = userDetails || {};
  console.log(userRole);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details (first_name, last_name, role)
        const responseDetails = await axios.get(
          "http://192.168.100.134:3001/api/user/details", // Make sure this is the correct endpoint for user details
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setUserDetails(responseDetails.data); // Set the user details

        // Fetch user role
        const responseRole = await axios.get(
          "http://192.168.100.134:3001/api/user/role", // Endpoint to get user role
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserRole(responseRole.data.role); // Set the user role
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details or role:", err);
        setError("Failed to fetch user details or role.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
       {first_name && last_name
                      ? `${first_name} ${last_name}`
                      : "User"}
      {/* other components */}
    </div>
  );
}

export default ChildComponent;
