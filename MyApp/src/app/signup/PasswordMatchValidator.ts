import { AbstractControl, ValidationErrors } from "@angular/forms";


export class PasswordMatchValidators{

    static matchPassword(control:AbstractControl){
        let password=control.get('password').value;
        let confirmPassword=control.get('confirmPassword').value;
        //console.log('PasswordMatcher:'+password+","+confirmPassword);
        //console.log("matching::"+password===confirmPassword);
        if(password!=confirmPassword){
            control.get('confirmPassword').setErrors({matchPassword:true});
        }else{
            return null;
        }


    }
}