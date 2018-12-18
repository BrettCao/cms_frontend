/**
 * Created by Smile on 2018/4/24.
 */
import {observable, action} from 'mobx';


class MemberStore {
    @observable current = null;

    @action
    setItemMenu(val, call) {
        this.current = val;
        if(Object.prototype.toString.call(call) === '[object Function]')
            call();
    }
}

export const member = new MemberStore();