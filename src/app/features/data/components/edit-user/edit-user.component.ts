import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/features/services/service.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userForm: any = FormGroup;
  submitted = false;
  reqBody: any;
  id: any;
  getData: any;

  constructor(private formBuilder: FormBuilder, private ServiceService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      role: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?(?!0{10})[0-9]{10}$")]],
    });


    this.activatedRoute.paramMap.subscribe(x => {
      this.id = x.get('id');
      console.log(this.id);
    });

    this.ServiceService.getByIDUser(this.id).subscribe((data: any) => {
      this.getData = data[0];
      console.log(data)
      this.userForm.patchValue({
        'id': this.id,
        'name': this.getData.name,
        'email': this.getData.email,
        'role': this.getData.role,
        'mobile': this.getData.mobile,
      });
    });
  }

  get f() { return this.userForm.controls; }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;
    return true;
  }

  Update() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return alert('Invalid Details');
    }

    if (this.userForm.valid) {

      // this.userForm.reset();
    }

    if (this.submitted) {
      const { value, valid } =
        this.userForm;

      if (valid) {
        this.reqBody = {
          ...this.userForm.value,
        };

        this.ServiceService.updateUser(this.id, this.reqBody).subscribe((data) => {
          console.log("getProject", this.reqBody);
          alert("User Successfully Updated.");
          this.router.navigate(['getdata']);
        });

      }
      else {

        return this.userForm.reset({});
      }
    }
  }
}


