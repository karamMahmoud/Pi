import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  searchTerm: string;
  switchTerm = true;
  employees: Employee[];
  showEmployees: Employee[] = [];
  sub1: any;
  pageNumber: number[] = [];
  currentPage = 1;
  recordsPerPage = 10;

  constructor(private _service: EmployeesService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.sub1 = this._service.getEmployees().subscribe(data => {
      this.employees = data;
      this.changePage(1);
      this.pageNumbers();
    }, (err) => {
      return;
    }
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }


  changePage(page) {
    if (page < 1) {
      page = 1;
    }
    if (page > (this.numPages() - 1)) {
      page = this.numPages();
    }

    this.showEmployees = [];
    for (let i = (page - 1) * this.recordsPerPage; i < (page * this.recordsPerPage) && i < this.employees.length; i++) {
      this.showEmployees.push(this.employees[i]);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  clickPage(page) {
    this.currentPage = page;
    this.changePage(page);
  }

  pageNumbers() {
    for (let i = 1; i < this.numPages() + 1; i++) {
      this.pageNumber.push(i);
    }
  }

  numPages() {
    return Math.ceil(this.employees.length / this.recordsPerPage);
  }
}


