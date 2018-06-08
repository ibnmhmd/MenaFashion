import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationStart, NavigationEnd } from '@angular/router';
import {PasswordResetService} from '../services/password-reset.service';
import {ResetPassword} from '../interfaces/reset-password.interface';
declare var $:any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  providers: [PasswordResetService]
})
export class PasswordResetComponent implements OnInit {
   public resetPassword : ResetPassword;
  constructor(private router: Router, private activitedRoute: ActivatedRoute,
    private  passwordResetServices :PasswordResetService) { }

  // ----------- variables --------
 

  userId: String = "";
  userToken: String = "";
  param:any = {};
  validToken:boolean = false;
  resetMessage:String = "";
  passwordMatch:boolean = true;
  customerPasswordData:any = {};
  resetError:boolean = false;
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
      $('#loadingSearch').show();
      this.customerPasswordData = {};
      this.validToken = false;
      this.passwordMatch = false;
      this.resetError = false;
      // ------- reset password interface -------
      this.resetPassword = {
        email: '',
        newpassword: '', 
        confirmpassword: ''
      };

    // --------- on route change ----------------
    this.activitedRoute.params.forEach(params => {

      // ----- check for undefined --------
      if( this.activitedRoute.snapshot.params['userId'] !== undefined)
      {
        this.userId =  this.activitedRoute.snapshot.params['userId'];
        this.param = {};
      }

      if(this.activitedRoute.snapshot.params['userToken'] !== undefined)
      {
        this.userToken = this.activitedRoute.snapshot.params['userToken'];
      }
      
      // ----- stting values -----------
      this.param = {
              'userId':    this.userId,
              'userToken': this.userToken
           };
      // --------- validate customer token and id -----
      this.passwordResetServices.validateCustomerToken(this.param).subscribe(data => {
       if(data)
         {
             this.validToken = true ;
         }else
         {
          this.router.navigate(['']);
         }
       $('#loadingSearch').hide();
      }, err => {
        let msg = "";
        $('#loadingSearch').hide();
        this.validToken = false ;
        if(err.message === "Invalid type for value: \"id\". Expected Type: \"int\"." || "No such entity with %fieldName = %fieldValue")
        {
          msg = "Invalid Id and or Token, please provide valid Id and or Token .";
        }else
        {
          msg = err.message ;
        }
        this.resetMessage = '<span>'+ msg + '</span>';
        $('#passwordModal').modal('show');
        const self = this;
        setTimeout(function()
        {
          $('#passwordModal').modal('hide');
          self.router.navigate(['']);
        }, 3000);   
      });

    });
  }

  // --------------- reset password ---------------
  resetCustomerPassword(model: ResetPassword, isValid: boolean) {
  
    this.passwordMatch = false;
    if(isValid) {
      $('#loadingSearch').show();
      if(model.newpassword !== model.confirmpassword) {
        this.passwordMatch = true;
        $('#loadingSearch').hide();
      } else {
               this.passwordMatch = false;
               this.customerPasswordData= {
                                          'email': model.email,
                                          'token': this.userToken,
                                          'password': model.newpassword };
              // --------- send data -------------
              this.passwordResetServices.resetCustomerPassword(this.customerPasswordData).subscribe(data =>
              {
                this.resetError = false;
                if(data)
                {
                  $('#loadingSearch').hide();
                  this.resetError = false;                    
                  this.resetMessage = '<span> Password has been successfully reset .</span>';
                  $('#passwordModal').modal('show');
                     const self = this;
                     setTimeout(function()
                   {
                     $('#passwordModal').modal('hide');
                      self.router.navigate(['']);
                   }, 3000); 
                }else
                {
                  $('#loadingSearch').hide();
                  this.resetError = false;                    
                  this.resetMessage = '<span> Password has not been reset, please try again .</span>';
                  $('#passwordModal').modal('show');
                     const self = this;
                     setTimeout(function()
                   {
                     $('#passwordModal').modal('hide');
                   }, 3000); 
                }           
              }, err => {

                           $('#loadingSearch').hide();
                          this.resetError = true;                    
                          this.resetMessage = '<span>'+ err.message + '</span>';
                          $('#passwordModal').modal('show');
                            const self = this;
                              setTimeout(function()
                            {
                              $('#passwordModal').modal('hide');
                            }, 3000); 
                   });  
             };
     } 
  };

  erase()
  {
    this.passwordMatch = false;
  }

}
