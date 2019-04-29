import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ConfirmPasswordValidatot{

    confirmPwd(control:AbstractControl):ValidationErrors|null{

        if((control.value as String).indexOf('')>=0){
            return {minlength:{
                requiredLength:10,
                actualLength:control.value.length
            }}
        }
        return null;
    }
}