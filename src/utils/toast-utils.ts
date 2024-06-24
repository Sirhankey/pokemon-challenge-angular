import Swal, { SweetAlertIcon } from "sweetalert2";

export enum TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export function toast(typeIcon: TYPE | SweetAlertIcon, timerProgressBar: boolean = false, text: string) {
  let icon: SweetAlertIcon | undefined;

  if (typeof typeIcon === 'string' && Object.values(TYPE).includes(typeIcon as TYPE)) {
    icon = typeIcon as SweetAlertIcon;
  } else if (typeIcon in TYPE) {
    icon = typeIcon as SweetAlertIcon;
  }

  Swal.fire({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    icon,
    timerProgressBar,
    timer: 2000,
    title: text
  });
}
