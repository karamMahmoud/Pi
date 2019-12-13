import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from './employee.model';

@Pipe({
    name: 'employeesFilter'
})
export class EmployeesFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm) {
        if (!employees || !searchTerm) {
            return employees;
        }
        return employees.filter(employee =>
            employee.employee_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
