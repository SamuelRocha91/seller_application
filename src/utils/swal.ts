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

const swalWithRedirect = (action: () => void) => {
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
      action();
    }
  });
};

const swallWithDelete = (handleDelete: () => void) => {
  Swal.fire({
    title: "Deseja continuar?",
    text: "Deletar essa loja acarretará numa exclusão irreversível",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, delete ela pai!",
    cancelButtonText: "Não!! Tá doido uai???"
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete();
    }
  });
};
export { swalError, swalSuccess, swalWithRedirect, swallWithDelete};