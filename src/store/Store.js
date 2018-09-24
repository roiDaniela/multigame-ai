import { observable, action } from "mobx";

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
export default store;