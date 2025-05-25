import { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  CreditCard,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  Image,
} from "lucide-react";

import {alertSuccess} from '../components/AlertSuccess';
import {alertError} from '../components/AlertError';

export default function PaymentEditModal({ show, onClose, payment, onSave }) {
  const [formData, setFormData] = useState({
    nama: "",
    metode: "",
    status: "",
    tanggal: "",
    nominal: "",
    catatan: "",
    buktiBayar: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (payment) {
      const updatedFormData = {
        nama: payment.nama || "",
        metode: payment.metode || "",
        status: payment.status || "",
        tanggal: payment.tanggal || "",
        nominal: payment.nominal || "",
        catatan: payment.catatan || "",
        buktiBayar: payment.buktiBayar || "",
      };
      setFormData(updatedFormData);
      setImagePreview(payment.buktiBayar || "");
    }
  }, [payment]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nominal") {
      // Jika field kosong, set sebagai empty string, bukan 0
      // Jika ada value, convert ke number tapi pastikan tidak ada leading zero
      const numValue = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          buktiBayar: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    try {
      alertSuccess("Data berhasil dikirim!");
      e.preventDefault();
      onSave(formData);
      onClose();
    } catch (e) {
      alertError(`${e.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "sukses":
      case "berhasil":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "gagal":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Pembayaran
              </h2>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Nama */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4" />
              <span>Nama Pembayar</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Masukkan nama pembayar"
              required
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <CreditCard className="w-4 h-4" />
              <span>Metode Pembayaran</span>
            </label>
            <select
              name="metode"
              value={formData.metode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            >
              <option value="">-- Pilih Metode Pembayaran --</option>
              <option value="Transfer Bank">🏦 Transfer Bank</option>
              <option value="E-Wallet">📱 E-Wallet</option>
              <option value="Kartu Kredit">💳 Kartu Kredit</option>
              <option value="Cash">💵 Cash</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4" />
              <span>Status Pembayaran</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${getStatusColor(
                formData.status
              )}`}
              required
            >
              <option value="">-- Pilih Status --</option>
              <option value="Sukses">✅ Sukses</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Gagal">❌ Gagal</option>
            </select>
          </div>

          {/* Tanggal */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Tanggal Pembayaran</span>
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Nominal */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <DollarSign className="w-4 h-4" />
              <span>Nominal Pembayaran</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                Rp
              </span>
              <input
                type="number"
                name="nominal"
                value={formData.nominal}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="0"
                min="0"
                step="1"
                required
              />
            </div>
            {formData.nominal && formData.nominal > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(formData.nominal)}
              </p>
            )}
          </div>

          {/* Catatan */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4" />
              <span>Catatan</span>
              <span className="text-xs text-gray-400">(Opsional)</span>
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              rows={3}
              placeholder="Tambahkan catatan atau keterangan tambahan..."
            />
          </div>

          {/* Bukti Pembayaran */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Image className="w-4 h-4" />
              <span>Bukti Pembayaran</span>
              <span className="text-xs text-gray-400">(Opsional)</span>
            </label>

            <div className="space-y-3">
              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">
                    Klik untuk upload bukti pembayaran
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Format: JPG, PNG, maksimal 5MB
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview bukti bayar"
                    className="w-full h-40 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, buktiBayar: "" }));
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
