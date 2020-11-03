import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MsgService {
    constructor(private toastr: ToastrService) {

    }

    showSuccess(str: string) {
        this.toastr.success(str);
    }
    showInfo(str: string) {
        this.toastr.info(str);
    }
    showWarning(str: string) {
        this.toastr.warning(str);
    }
    showError(err: any) {
        debugger;
        // jati pani application ma error aauch yeta pass garne and handle garne
        // step1  check error 
        // step 2 parse error message
        // step 3 show them in UI
        // ....to be continued
        let error = err.error;
        let default_msg = 'something went wrong';
        if (error) {
            console.log('type of >>', typeof (error.msg));
            if (typeof error.msg == 'string') {
                this._error(error.msg);
            }
            else if (typeof (error.msg) == 'object') {
                this._error(error.msg.errmsg || default_msg);
            }
            else {
                this._error(default_msg)
            }
        }
    }

    private _error(errMsg) {
        this.toastr.error(errMsg)
    }
}