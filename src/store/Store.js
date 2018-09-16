import { autorun,observable, action } from "mobx";
import { setInStorage } from '../utils/storage'

class Store {
    @observable data = { 
        isLoading: false,
        token: '',
        signUpError: '',
        loginError: '',
        loginEmail: '',
        loginPassword: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: ''
    }
    @action updateData = d => {
        this.data = {...this.data ,  ...d  }
        


    }
}

const store = new Store(); 

let disposer = autorun( () => setInStorage('accountInfo',{'token': store.data.token}));


export default store;