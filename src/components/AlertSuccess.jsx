import Swal from 'sweetalert2'

export const alertSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: message,
    confirmButtonColor: '#3085d6',
  });
};