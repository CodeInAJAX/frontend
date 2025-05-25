import { useState, useEffect } from "react";
import {mockPayments} from "../utils/content";
import {filterPayments} from "../utils/filterPayments";
import { alertConfirm } from "../components/AlertConfirm"; 
import { alertSuccess} from "../components/AlertSuccess"; 
export default function usePaymentActions() {
  const [allPayments, setAllPayments] = useState(mockPayments);
  const [searchTermPayment, setSearchTermPayment] = useState("");
  const [payments, setPayments] = useState(mockPayments); 
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const filtered = filterPayments(allPayments, searchTermPayment);
    setPayments(filtered);
  }, [searchTermPayment, allPayments]);

  const handleDetailPembayaran = (payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const handleEditPembayaran = (payment) => {
    setSelectedPayment(payment);
    setShowEditModal(true);
  };

 const handleDeletePembayaran = async (payment) => {
  const confirmed = await alertConfirm("Yakin mau hapus pembayaran ini?");
  if (confirmed) {
    const updated = allPayments.filter((p) => p.id !== payment.id);
    setAllPayments(updated);
    alertSuccess("Pembayaran berhasil dihapus!");
  }
};

  return {
    payments,
    searchTermPayment,
    setSearchTermPayment,
    selectedPayment,
    showDetailModal,
    showEditModal,
    handleDetailPembayaran,
    handleEditPembayaran,
    handleDeletePembayaran,
    setShowDetailModal,
    setShowEditModal,
    setAllPayments
  };
}
