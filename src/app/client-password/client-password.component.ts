import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import {ChangePassword} from '../interfaces/change-password.interface';
import { GlobalVar } from '../globals';
import 'rxjs/add/operator/map';
declare var $:any;


@Component({
  selector: 'app-client-password',
  templateUrl: './client-password.component.html',
  styleUrls: ['./client-password.component.css'],
  providers: [ValidationService]
})
export class ClientPasswordComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  public changePassword : ChangePassword;

  passwordMatch = false;
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private http: Http) { }

  changeCustomerPassword(model: ChangePassword, isValid: boolean) {
    if(isValid) {
      if(model.newpassword != model.confirmpassword) {
        this.passwordMatch = true;
      } else {
        this.passwordMatch = false;
        // /V1/customers/me/password
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('customerToken')
        });
    
       let body = {
         "currentPassword": model.currentpassword,
         "newPassword": model.newpassword
       }

        return this.http.put(this.baseApiUrl + '/rest/V1/customers/me/password', body, {headers: headers}).map(res => res.json()).subscribe(data => {
   
          if(data) {
            $('#passwordModal').modal('show');
          }
        }, err => {
          console.log(err)
        })

      };
      
     } 
  };

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    this.changePassword = {
          currentpassword: "",
          newpassword: "", 
          confirmpassword: ""
      };
  }

}
