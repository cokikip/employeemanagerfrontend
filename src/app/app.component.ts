import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees!: Employee[];
  public editEmployee: Employee | undefined;
  public deleteEmployee!: Employee;


  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (res: Employee[]) => {
        this.employees = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (res: Employee) => {
        console.log(res);
        this.getAllEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (res: Employee) => {
        console.log(res);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmployee(employeeId: number): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (res: void) => {
        console.log(res);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string):void{
    const result:Employee[] = []
    for (const emp of this.employees) {
      if (
        emp.name.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.email.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.phone.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1
      ) {
        result.push(emp);
      }
    }
    this.employees=result;
    if (result.length===0 || !key) {
      this.getAllEmployees();
    }
  }

  public onOpenModal(employee: any, mode: String): void {
    const container = document.getElementById('main');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee=employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee=employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
