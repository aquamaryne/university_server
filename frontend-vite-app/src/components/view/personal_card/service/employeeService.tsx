import type { EmployeeData } from "../types/cardTypes";

class EmployeeService {
    private url = `http://localhost:3001/employees`;

    async getEmployee(id: string): Promise<EmployeeData>{
        const responce = await fetch(`${this.url}/${id}`);
        if(!responce.ok){
            throw new Error('Error fetching data');
        }
        return responce.json();
    }

    async createEmployee(data: EmployeeData): Promise<EmployeeData>{
        const responce = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(!responce.ok){
            throw new Error('Failed to update');
        }
        return responce.json();
    }

    async updateEmployee(id: string, data: EmployeeData): Promise<EmployeeData>{
        const responce = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(!responce.ok){
            throw new Error ('Failed to update');
        }
        return responce.json();
    }

    async deleteEmployee(id: string): Promise<void>{
        const responce = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        if(!responce.ok){
            throw new Error ('Failed to delete');
        }
    }
}

export const employeeService = new EmployeeService();