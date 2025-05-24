import Swal from 'sweetalert2'

export const alertError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Gagal!',
    text: message,
    confirmButtonColor: '#d33',
  });
};