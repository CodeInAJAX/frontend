import { X, Calendar, CreditCard, User, FileText, Receipt, CheckCircle, Clock, XCircle } from "lucide-react";

export default function PaymentDetailModal({ show, onClose, payment }) {
  if (!show) return null;

  // Sample data for demonstration
  const samplePayment = payment || {
    nama: "John Doe",
    metode: "Transfer Bank",
    status: "Berhasil",
    tanggal: "24 Mei 2025",
    nominal: 250000,
    catatan: "Pembayaran untuk paket premium bulan ini",
    buktiBayar: "https://via.placeholder.com/400x300?text=Bukti+Transfer"
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'berhasil':
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
      case 'menunggu':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'gagal':
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'berhasil':
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'gagal':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Detail Pembayaran</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(samplePayment.status)}`}>
              {getStatusIcon(samplePayment.status)}
              <span className="font-semibold text-sm">{samplePayment.status}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            {/* Nama */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">Nama Pembayar</p>
                <p className="text-base font-semibold text-gray-900 break-words">{samplePayment.nama}</p>
              </div>
            </div>

            {/* Metode */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">Metode Pembayaran</p>
                <p className="text-base font-semibold text-gray-900">{samplePayment.metode}</p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">Tanggal Pembayaran</p>
                <p className="text-base font-semibold text-gray-900">{samplePayment.tanggal}</p>
              </div>
            </div>

            {/* Nominal */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <p className="text-sm font-medium text-orange-600 mb-2">Nominal Pembayaran</p>
              <p className="text-2xl font-bold text-orange-700">
                Rp {samplePayment.nominal?.toLocaleString('id-ID') || '0'}
              </p>
            </div>

            {/* Catatan */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">Catatan</p>
                <p className="text-base text-gray-900 break-words">
                  {samplePayment.catatan || "Tidak ada catatan"}
                </p>
              </div>
            </div>

            {/* Bukti Bayar */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Bukti Pembayaran</p>
              {samplePayment.buktiBayar ? (
                <div className="relative group">
                  <img
                    src={samplePayment.buktiBayar}
                    alt="Bukti Pembayaran"
                    className="w-full h-48 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                      Klik untuk memperbesar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <Receipt className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Tidak ada bukti pembayaran</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}