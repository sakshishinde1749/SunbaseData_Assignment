import React, { useEffect, useState } from "react";
import useGetCustomers from "../hooks/useGetCustomers";
import useAddCustomer from "../hooks/useAddCustomer";
import useDeleteCustomer from "../hooks/useDeleteCustomer";
import useSyncCustomers from "../hooks/useSyncCustomers";

const Customers = () => {

    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }

    const { handleSync } = useSyncCustomers();
    const { customers, onAction, setOnAction } = useGetCustomers();
    const [isAddCustomerDialogOpen, setAddCustomerDialogOpen] = useState(false);
    const [isUpdateCustomerDialogOpen, setUpdateCustomerDialogOpen] = useState(false);
    const [customerToUpdateId, setCustomerToUpdateId] = useState(null);

    const { handleDelete } = useDeleteCustomer();

    const { customer, handleChange, handleSubmit, error, setCustomer } = useAddCustomer();

    const openAddCustomerDialog = (add=true, id) => {
        if (add) {
            setAddCustomerDialogOpen(true);
        }else{
            setCustomerToUpdateId(id);
            const tempCustomer = customers.find(customer => customer.id === id);
            console.log("Customer to update:", tempCustomer);
            setCustomer({
                firstName: tempCustomer.firstName,
                lastName: tempCustomer.lastName,
                phone: tempCustomer.phone,
                email: tempCustomer.email,
                address: tempCustomer.address,
                city: tempCustomer.city,
                state: tempCustomer.state,
                street: tempCustomer.street
            });
            setUpdateCustomerDialogOpen(true);
        }
    };

    const closeAddCustomerDialog = (add=true) => {
        if (add) {
            setAddCustomerDialogOpen(false);
        }else{
            setCustomerToUpdateId(null);
            setUpdateCustomerDialogOpen(false);
        }
    };

    useEffect(() => {
        
    }, []);

    const handleAddCustomer = (e, id = null) => {
        console.log("Adding customer:", customer);
        handleSubmit(e, id);
        setOnAction(!onAction);
        closeAddCustomerDialog();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", padding: "20px", backgroundColor: "#f2f2f2" }}>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "10px" }}>
                <div>
                    <button style={{ marginRight: "10px", backgroundColor: "#4caf50", color: "#ffffff", border: "none", padding: "10px", cursor: "pointer" }} onClick={openAddCustomerDialog}>Add Customer</button>
                    <select style={{ marginRight: "10px", padding: "8px" }}>
                        <option>Search by</option>
                        {/* Add search options here */}
                    </select>
                    <input type="text" placeholder="Search..." style={{ padding: "8px" }} />
                    <button style={{ marginLeft: "10px", backgroundColor: "orange", color: "#ffffff", border: "none", padding: "10px", cursor: "pointer" }} onClick={handleSync}>Sync</button>
                </div>
            </div>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Customers</h1>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Customer ID</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>First Name</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Last Name</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Phone</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Email</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Address</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>City</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>State</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Street</th>
                        <th style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.map((customer, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.id}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.firstName}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.lastName}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.phone}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.email}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.address}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.city}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.state}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{customer.street}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                {/* Add your update and delete icons or buttons here */}
                                <span onClick={() => {openAddCustomerDialog(false, customer.id)}} style={{ marginRight: "5px", backgroundColor: "#2196f3", color: "#ffffff", padding: "8px", cursor: "pointer", borderRadius: "5px" }}>Update</span>
                                <span onClick={() => {handleDelete(customer.id)}} style={{ backgroundColor: "#f44336", color: "#ffffff", padding: "8px", cursor: "pointer", borderRadius: "5px" }}>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Customer Dialog */}
            {(isAddCustomerDialogOpen || isUpdateCustomerDialogOpen) && (
                <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", width: "400px" }}>
                        {customerToUpdateId ===null ? <h2>Add Customer</h2>: <h2>Update Customer</h2>}
                        <form onSubmit={(e) => { if(customerToUpdateId === null){
                            handleAddCustomer(e);

                        }else{
                            handleAddCustomer(e, customerToUpdateId);
                        } }}>
                            <label htmlFor="firstName">First Name:</label>
                            <input value={customer.firstName} onChange={handleChange} type="text" id="firstName" name="firstName" required />
                            <br />
                            <label htmlFor="lastName">Last Name:</label>
                            <input value={customer.lastName} onChange={handleChange} type="text" id="lastName" name="lastName" required />
                            <br />
                            <label htmlFor="phone">Phone:</label>
                            <input value={customer.phone} onChange={handleChange} type="text" id="phone" name="phone" required />
                            <br />
                            <label htmlFor="email">Email:</label>
                            <input value={customer.email} onChange={handleChange} type="email" id="email" name="email" required />
                            <br />
                            <label htmlFor="address">Address:</label>
                            <input value={customer.address} onChange={handleChange} type="text" id="address" name="address" required />
                            <br />
                            <label htmlFor="city">City:</label>
                            <input value={customer.city} onChange={handleChange} type="text" id="city" name="city" required />
                            <br />
                            <label htmlFor="state">State:</label>
                            <input value={customer.state} onChange={handleChange} type="text" id="state" name="state" required />
                            <br />
                            <label htmlFor="street">Street:</label>
                            <input value={customer.street} onChange={handleChange} type="text" id="street" name="street" required />
                            <br />
                            <br />
                            <button type="submit" style={{ backgroundColor: "#4caf50", color: "#ffffff", border: "none", padding: "10px", cursor: "pointer", borderRadius: "5px" }}>Submit</button>
                        </form>
                        <button style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "20px" }} onClick={handleAddCustomer}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customers;
