import React from "react";
import axios from "axios";

const useDeleteCustomer = () => {
    const [error, setError] = React.useState("");
    const [onAction, setOnAction] = React.useState(false);
    
    const handleDelete = async (id) => {
        try {
            axios
            .delete(`http://localhost:8080/customers/${id}`)
            .then((response) => {
                console.log(response);
                setOnAction(true);
                window.location.reload();
            })
            .catch((error) => {
                setError(error);
            });
        } catch (error) {
            setError(error);
        }
    };
    
    return { handleDelete, error, setOnAction, onAction };
}

export default useDeleteCustomer;