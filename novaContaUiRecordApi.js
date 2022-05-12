import { LightningElement, track } from 'lwc';
import Account from '@salesforce/schema/Account';
import Name from '@salesforce/schema/Account.Name';
import Phone from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from   'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class Novaconta extends LightningElement {
    account = {
        name: "",
        phone: ""
    };


    handleInputChange(event){
        let name_ = event.target.name;
        let value_ = event.target.value;

        this.account = {...this.account, [name_]:value_};
        console.log(this.account);
    }

    createAccount(){
        const fields = {};
        fields[Name.fieldApiName] = this.account.name;
        fields[Phone.fieldApiName] = this.account.phone;
        console.log(fields);
        
        const recordInput = {apiName: Account.objectApiName, fields};
        console.log(recordInput);
        createRecord(recordInput).then(
            ()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Sucesso',
                        message: 'Conta criada'
                    })
                );
            }
        ).catch(
            (error)=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Erro',
                        message: error.body.message
                    })
                );
            }
        )
    }
}