const regexEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword=/^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/;
//const regexPasswordDos=/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/







export function validate (objUser){

    const errors={}

    if(!regexEmail.test(objUser.username)) {
        errors.username = 'El usuario debe ser un email';
    }else if(!objUser.username) {
        errors.username = 'El nombre de usuario no puede estar vacío';
    }else if (objUser.username.length >35){
        errors.username ='El nombre de usuario no puede terner mas de 35 caracteres';
    }
    if(!regexPassword.test(objUser.password)){
      //  errors.password = 'La contraseña debe tener al menos un número'
        errors.password = 'La contraseña mínimo 6, máximo 10 caracteres, al menos una letra y número'
    }
    // else if(objUser.password.length > 9 || objUser.password.length < 10) {
    //     errors.password ='La contraseña debe tener una longitud entre 9 y 10 caracteres'
    // }
   console.log('Errores: ',errors)
    return errors;
}