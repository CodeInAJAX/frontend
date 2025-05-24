import Swal from 'sweetalert2'

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    title: 'Yakin?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, lanjutkan!',
    cancelButtonText: 'Batal'
  });

  return result.isConfirmed;
};