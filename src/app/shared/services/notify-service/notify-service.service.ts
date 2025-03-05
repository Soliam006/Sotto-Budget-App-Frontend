import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  success(title: string, message?: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  error(title: string, message?: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  warning(title: string, message?: string): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  info(title: string, message?: string): void {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  confirm(
    title: string,
    message: string,
    confirmButtonText: string = 'Sí',
    cancelButtonText: string = 'No'
  ): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true,
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
