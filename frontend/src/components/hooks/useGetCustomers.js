import React from "react";
import axios from "axios";

const useGetCustomers = () => {
    const [customers, setCustomers] = React.useState([]);
    const [error, setError] = React.useState("");
    const [onAction, setOnAction] = React.useState(false);
    
    React.useEffect(() => {
        axios
        .get("http://localhost:8080/customers")
        .then((response) => {
            setCustomers(response.data);
        })
        .catch((error) => {
            setError(error);
        });
    }, [onAction]);
    
    return { customers, error, setOnAction, onAction };
}

export default useGetCustomers;