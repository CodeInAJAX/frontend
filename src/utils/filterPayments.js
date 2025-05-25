export function filterPayments(payments, searchTerm) {
  if (!Array.isArray(payments)) return [];

  const term = searchTerm?.toLowerCase() || "";

  return payments.filter((payment) => {
    const nama = payment?.nama?.toLowerCase() || "";
    const metode = payment?.metode?.toLowerCase() || "";
    const status = payment?.status?.toLowerCase() || "";
    const tanggal = payment?.tanggal?.toLowerCase() || "";

    return (
      nama.includes(term) ||
      metode.includes(term) ||
      status.includes(term) ||
      tanggal.includes(term)
    );
  });
}