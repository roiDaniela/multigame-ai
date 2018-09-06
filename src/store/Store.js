import { observable } from "mobx";

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
    @action dataSet = ( data ) => {
        this.data = {...this.data ,  ...data  }
    }
}

const store = new Store(); 
export default store;