import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/features/services/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: any = FormGroup;
  submitted = false;
  reqBody: any;

  constructor(private formBuilder: FormBuilder, private ServiceService: ServiceService, private router: Router) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      role: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?(?!0{10})[0-9]{10}$")]],
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

  onSubmit() {
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

        this.ServiceService.createUser(this.reqBody).subscribe(async (result) => {
          // this.ngxService.stop();
          if (result) {

            console.log(result);

            console.log(result.data);

            if (result.data === "already exist") {


              this.router.navigate(['/adduser']);

              return alert("User already exist!");

            }

            if (result.message === "User added successfully!") {

              alert("User added successfully!");

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/getdata']));
              }, 2000);

            }

          }
        });

      }
      else {

        return this.userForm.reset({});
      }
    }
  }
}
