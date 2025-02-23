import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AuthValidators {
  /**
   * Valida que el campo contenga un email válido o un username que cumpla:
   * - Mínimo 2 caracteres
   * - Máximo 25 caracteres
   */
  static emailOrUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Si no se proporciona ningún valor, se delega al validador 'required' del formulario.
      if (!value) {
        return { required: true };
      }

      // Si el valor tiene un @, se asume que es un email
      if (value.includes('@')) {
        // Expresión regular para validar emails básicos
        const emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/
        // Si cumple con el formato de email, se acepta
        if (emailRegex.test(value))
          return null;
        else
          return { emailFormat: 'El email no tiene un formato válido' };
      }

      // Si se trata de un username, debe tener entre 2 y 25 caracteres
      if (value.length < 3 || value.length > 25) {
        return { usernameLength: 'El username debe tener entre 3 y 25 caracteres' };
      }

      return null;
    };
  }

  /**
   * Valida que el password:
   * - No esté vacío
   * - Tenga al menos 4 caracteres
   */
  static password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return { required: true };
      }

      if (value.length < 4) {
        return { passwordLength: 'El password debe tener al menos 4 caracteres' };
      }

      return null;
    };
  }

  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // No contar espacion en blanco
      if (value && value.includes(' ')) {
        return { passwordSpaces: 'El password no puede contener espacios en blanco' };
      }

      if (!value) {
        return { required: true };
      }

      if (value.length < 4) {
        return { passwordLength: 'El password debe tener al menos 4 caracteres' };
      }

      return null;
    };
  }


}
