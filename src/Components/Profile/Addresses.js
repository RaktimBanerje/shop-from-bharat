import React, { useState, useEffect } from "react";
import styles from "./Addresses.module.css";
import PinSVG from "../../assets/pin.svg";
import PencilSVG from "../../assets/pencil.svg";
import TrashSVG from "../../assets/trash.svg";
import AdressStep from "../PlaceOrder/AdressStep/AdressStep";
import apiServiceHandler from "../../service/apiService";
import Spinner from "../Spinner/Spinner";
import AddressForm from "../PlaceOrder/AdressStep/AddressForm";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Image from "next/image"; // Import Image component

const Addresses = () => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]); // State to store the list of addresses
  const [loading, setLoading] = useState(true); // State to track loading status
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [open, setOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = React.useState(null);

  const handleClickOpen = (addressId) => {
    setAddressToDelete(addressId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddressToDelete(null);
  };

  const toggleModal = (address = null) => {
    setSelectedAddress(address);
    setOpenAddressModal(!openAddressModal);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await apiServiceHandler(
        "POST",
        `api/address/${addressToDelete}`,
        { status: 2 }
      );
      if (response.status) {
        setAddresses(
          addresses.filter((address) => address._id !== addressToDelete)
        );
        toast.success("Address deleted successfully");
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("An error occurred while deleting the address");
    }
    handleClose();
  };

  // Fetch addresses from the API on component mount
  // Method to fetch the updated list of addresses
  const fetchAddresses = async () => {
    try {
      const response = await apiServiceHandler("GET", "api/address/list");
      if (response.status) {
        setAddresses(response.address);
      } else {
        toast.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

    // Fetch addresses on component mount
    useEffect(() => {
      fetchAddresses();
    }, []);

  if (loading) {
    return <Spinner />; // Show a loading state while the API request is in progress
  }

  return (
    <React.Fragment>
      <div className={styles.addresses}>
        <div className={styles.addresses_container}>
          <div className={styles.addresses_info}>
            <div className={styles.addresses_header}>
              <div className={styles.header_left}>
                <h4>Saved Address</h4>
                <p>Manage all of your saved addresses</p>
              </div>
              <div className={styles.header_right}>
                <button onClick={() => toggleModal()}>ADD ADDRESS</button>
              </div>
            </div>
            <div className={styles.addresses_list}>
              {addresses.map((address) => (
                <div className={styles.address_info} key={address._id}>
                  <div className={styles.select_address}>
                    {/* <input type="radio" /> */}
                    <div className={styles.address_type}>
                      <h5>{address.address_type}</h5>
                      <p>Courier Delivery</p>
                    </div>
                  </div>
                  <div className={styles.user_address}>
                    <Image src={PinSVG} alt="Pin Icon" width={24} height={24} />
                    <span>{`${address.address}, ${address.zip_code}`}</span>
                  </div>
                  {/* <div className={styles.user_details}>
                    <p>
                      {address.name} - {address.contact_number}
                    </p>
                    <p>{address.email}</p>
                  </div> */}
                  <div className={styles.address_actions}>
                    <Image
                      src={PencilSVG}
                      alt="Edit Icon"
                      width={24}
                      height={24}
                      onClick={() => toggleModal(address)}
                    />
                    <Image
                      src={TrashSVG}
                      alt="Delete Icon"
                      width={24}
                      height={24}
                      onClick={() => handleClickOpen(address._id)}
                    />
                  </div>
                </div>
              ))}
              {/* Confirmation Dialog */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
              >
                <DialogTitle id="confirm-dialog-title">
                  {"Delete Address"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="confirm-dialog-description">
                    Are you sure you want to delete this address?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    color="secondary"
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      {openAddressModal && (
        <>
          <div className={styles.modal_container}>
            <div className={styles.modal_overlay}>
              <div className={styles.modal}>
                <AddressForm
                  onClose={toggleModal}
                  address_obj={selectedAddress}
                  onSave={fetchAddresses}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Addresses;
