import React from "react";
import axios from "axios";

const useSyncCustomers = () => {
  const [error, setError] = React.useState("");
  const [onAction, setOnAction] = React.useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSync = async () => {
    try {
      axios
        .get(
          "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const customers = response.data;
          customers.forEach((customer) => {
            const tempCustomer = {
              firstName: customer.first_name,
              lastName: customer.last_name,
              email: customer.email,
              phone: customer.phone,
              address: customer.address,
              city: customer.city,
              state: customer.state,
              street: customer.street,
            };
            axios
              .post("http://localhost:8080/customers/create", tempCustomer, {
                headers: headers,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                setError(error);
              });
          });
          window.location.reload();
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      setError(error);
    }
  };

  return { handleSync, error, setOnAction, onAction };
};

export default useSyncCustomers;
