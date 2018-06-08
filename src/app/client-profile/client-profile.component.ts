import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import {CustomerDetailsService} from '../services/customer-details.service';
import {CustomerProfile} from '../interfaces/customer-profile.interface';
import 'rxjs/add/operator/map';
declare var $:any;

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  providers: [CustomerDetailsService]
})
export class ClientProfileComponent implements OnInit {
public customerProfile : CustomerProfile;

customerData;
firstname;
lastname;
email;
noGenderError = true;
yearList =[];
monthList;
disable:boolean = true;
dayList;
selectedYear;
selectedMonth;
selectedDay;
clientMonth:any = "Month";
clientDate:any = "Day";
clientYear:any = "Year";
clientDOB:any;
titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router,
    private customerDetailsService: CustomerDetailsService
  ) { }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();
    let MM, DD, YYYY;
    var minYear = new Date().getFullYear() - 80,

    maxYear = new Date().getFullYear()
    for (var i = minYear; i<=maxYear; i++){
        this.yearList.push(i);
    }
    this.monthList = [
       {month: "January", num: '01'},
       {month: "February", num: '02'},
       {month: "March", num: '03'},
       {month: "April", num: '04'},
       {month: "May", num: '05'},
       {month: "June", num: '06'},
       {month: "July", num: '07'},
       {month: "August", num: '08'},
       {month: "September", num: '09'},
       {month: "October", num: '10'},
       {month: "November", num: '11'},
       {month: "December", num: '12'},
    ];

    this.dayList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
   
    this.customerProfile = {
        firstname: "",
        lastname: "",
        email: "",
        //telephone: "",
        gender: "", 
        dob: "", 
        website_id: ""
     }

    this.customerDetailsService.getCustomerDetails().subscribe(data => {
      this.customerData = data;
    
      this.customerProfile = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
       // telephone: data.telephone,
        gender: data.gender, 
        dob: data.dob ,
        website_id: data.website_id
     }
     if(this.customerProfile.dob !== undefined && this.customerProfile.dob != null && this.customerProfile.dob != "" && this.customerProfile.dob != false)
     {
       this.clientDOB = this.customerProfile.dob.toString().split('-');
       // ------- extracting month, date, year from response ------
        MM= this.monthList.filter((month) => month.num === this.clientDOB[1])[0];       
        this.clientYear = this.clientDOB[0];
        this.clientMonth = MM.month;
        this.clientDate = this.clientDOB[2];
     }
     if(data.gender == 0) {
        $('#radio02').prop("checked", true);
      } else if(data.gender == 1) {
         $('#radio01').prop("checked", true);
      }
    
      $('#loading').hide();
    },err => { $('#loading').hide();});
  } // end ngOnInit

  getYear(year) {
    this.selectedYear = year;
    $('#year-val').text(year);
  };
  getMonth(monthId, month) {
    this.selectedMonth = monthId;
    $('#month-val').text(month);
  }
  getDay(day) {
    this.selectedDay = day;
    $('#day-val').text(day);
  }
  updateProfile(model: CustomerProfile, isValid: boolean) {
    $('#loading').show();
    if(this.selectedYear != 'Year' && this.selectedYear != null 
       && this.selectedMonth != 'Month' && this.selectedMonth != null
       && this.selectedDay != 'Day' && this.selectedDay != null) {
       

       this.customerProfile.dob = this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay; 
 
    }else
     {
      
        if(this.selectedMonth === undefined || this.selectedMonth === null || this.selectedMonth === "Month" && this.clientDOB !== undefined && this.clientDOB !== null)
        {
          this.selectedMonth = this.clientDOB[1].toString();
        }

        if(this.selectedDay === undefined || this.selectedDay === null || this.selectedDay === "Day" &&  this.clientDOB !== undefined && this.clientDOB !== null)
        {
          this.selectedDay = this.clientDOB[2].toString();
        }

        if(this.selectedYear === undefined || this.selectedYear === null || this.selectedYear === "Year" &&  this.clientDOB !== undefined && this.clientDOB !== null)
        {
          this.selectedYear = this.clientDOB[0].toString();
        }

        this.customerProfile.dob = this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay;
      }
    let profileObj = {
      customer: this.customerProfile
    };

    if(isValid) {
      if(this.customerProfile.gender == 0 || this.customerProfile.gender == 1) {
        this.customerDetailsService.updateCustomerProfile(profileObj).subscribe(data => {
 
          $('#loading').hide();

          $('.profile-msg').removeClass('hide');
          setTimeout(function() {
            $('.profile-msg').addClass('hide');
          }, 5000)
        });
      } else {
        this.noGenderError = false;
        $('#loading').hide();
      }
    }
    
  }

}
