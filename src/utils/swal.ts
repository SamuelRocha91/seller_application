import Swal from "sweetalert2";


const swalError = (title: string, text: string) => {
  Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: 'error',
    confirmButtonText: 'Ok'
  });
};

const swalSuccess = (text: string) => {
  Swal.fire(`${text}`);
};

const swalWithRedirect = () => {
  // @ts-ignore
  let timerInterval: NodeJS.Timeout | undefined;
  Swal.fire({
    title: 'Cadastro efetuado com sucesso!',
    text: 'Você será redirecionado para a página de login.',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector('b');
      if (timer) {
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      }
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer');
    }
  });
};

export { swalError, swalSuccess, swalWithRedirect};