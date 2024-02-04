import React from "react";
import axios from "axios";

const useAddCustomer = () => {
    const [customer, setCustomer] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        street: "",
    });
    const [error, setError] = React.useState("");

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e, id = null) => {
        e.preventDefault();
        try {
            if (!id){
                axios
                .post("http://localhost:8080/customers/create", customer)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    setError(error);
                });
            }else{
                axios
                .put(`http://localhost:8080/customers/${id}`, customer)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    setError(error);
                });
            
            }
        } catch (error) {
            setError(error);
        }
    };

    return { customer, handleChange, handleSubmit, error, setCustomer };
}

export default useAddCustomer;