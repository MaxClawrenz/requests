import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx"

 class formObject {
    myForm: Record<string, string | boolean | number | null> = {};
    iRequestTypeID: string = '';
    imageLoading: boolean = false;
    loading: boolean = false;
    successSubmit: boolean = false;

    constructor(){
        makeAutoObservable(this)
    }

    updateMyForm(name: string, value: string | boolean | number | null){
        runInAction(()=>{
            this.myForm[name] = value;
        })
    }
    
    sendMyForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        runInAction(()=>{
            event.preventDefault();
            const mask = document.getElementById("get_report_mask");
            if(mask) mask.style.display = "block";
            this.loading = true;
            axios.post("/custom_web_template.html?object_code=request_create_react", {params: {sFormFields: JSON.stringify(this.myForm), iRequestTypeID: this.iRequestTypeID}})
            .then(data => {
                this.loading = false;
                this.successSubmit = true;
            })
        })
    }
    
 }

 export default new formObject()