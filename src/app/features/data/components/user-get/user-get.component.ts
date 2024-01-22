import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/features/services/service.service';

@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent {
  id: any;
  all_user: any = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 50, 100];

  filterObj = {
    "limits": 2,
    "pages": 1,
  }

  all_postEach: any[] = []; // Assuming you have data here
  filteredUsers: any[] = [];
  searchTerm: string = '';
  sortField: string = '';
  sortOrder: string = 'asc';

 

  constructor(private formBuilder: FormBuilder, private ServiceService: ServiceService, private router: Router) {

   
    // this.ServiceService.getAllJobs().subscribe((data: any) => {

    //   this.all_post = data;
    //   console.log(this.all_post);

    // });

  }

  ngOnInit(): void {

    this.postList();

  }


  postList(): void {

    this.id = {
      "RowId": 0
    }

    console.log('id', this.id);

    this.ServiceService.getAll().subscribe((data: any[]) => {

      this.all_user = data;
      this.filteredUsers = data;
      console.log(this.all_user);
    });

  }

  onTabledataChange(event: any) {
    this.page = event;
    this.postList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  deletePost(id: any, userRole: string): void {
    if (userRole === 'User') {
      if (confirm("Are you sure to delete this Data?")) {
        this.ServiceService.deleteUser(id).subscribe(() => {
          alert("User Successfully Deleted!");
          this.router.navigate(['getdata']);
          window.location.reload();
        });
      }
    } else {
      alert("You do not have permission to delete users.");
    }
  }



  onPrevious() {
    this.filterObj.pages--;
    this.filetrCandidates();
  }

  onNext() {
    this.filterObj.pages++;
    this.filetrCandidates();
  }

  filetrCandidates() {

    console.log("abc", this.filterObj)

    // this.ServiceService.PagebyGet(this.filterObj).subscribe((result: any) => {
    //   this.all_post = result;
    //   console.log(this.all_post);
    // })

  }

  // Sorting logic
  sortBy(key: string): void {
    if (this.sortField === key) {
      // Toggle sorting direction if the same field is clicked
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new field and default to ascending direction
      this.sortField = key;
      this.sortOrder = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    this.filteredUsers = this.filteredUsers.slice().sort((a, b) => {
      const isAsc = this.sortOrder === 'asc';
      return (a[this.sortField] < b[this.sortField] ? -1 : 1) * (isAsc ? 1 : -1);
    });
  }

  applySearch(): void {
    this.filteredUsers = this.all_user.filter((user: any) =>
      Object.values(user).some((columnValue: any) =>
        columnValue.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.applySorting(); // Apply sorting after applying search
  }



}