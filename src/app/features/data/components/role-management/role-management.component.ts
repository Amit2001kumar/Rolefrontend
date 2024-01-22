// role-management.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  roles: string[] = ['Admin', 'User'];
  selectedRole: string = '';  // For editing
  newRole: string = '';  // For adding

  constructor() { }

  ngOnInit(): void {
  }

  // changeRole(): void {
  //   // Example function to change the role
  //   if (this.roleName === 'Admin') {
  //     this.roleName = 'User';
  //   } else {
  //     this.roleName = 'Admin';
  //   }
  // }

  addRole(): void {
    if (this.newRole && !this.roles.includes(this.newRole)) {
      this.roles.push(this.newRole);
      this.newRole = '';
    }
  }

  editRole(role: string): void {
    this.selectedRole = role;
  }

  updateRole(): void {
    if (this.selectedRole && this.newRole && !this.roles.includes(this.newRole)) {
      const index = this.roles.indexOf(this.selectedRole);
      this.roles[index] = this.newRole;
      this.selectedRole = '';
      this.newRole = '';
    }
  }

  deleteRole(role: string): void {
    const index = this.roles.indexOf(role);
    if (index !== -1) {
      this.roles.splice(index, 1);
      this.selectedRole = '';
      this.newRole = '';
    }
  }
}
