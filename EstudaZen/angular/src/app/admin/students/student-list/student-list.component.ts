import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../proxy/students/student.service';
import { StudentDto } from '../../../proxy/students/models';
import { StudentStatus } from '../../../proxy/students/student-status.enum';
import { PagedResultDto, PermissionDirective } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-student-list',
    standalone: true,
    imports: [CommonModule, FormsModule, PermissionDirective],
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
    private studentService = inject(StudentService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    students: PagedResultDto<StudentDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    statusLabels = {
        [StudentStatus.Active]: 'Ativo',
        [StudentStatus.Inactive]: 'Inativo',
        [StudentStatus.Suspended]: 'Suspenso',
        [StudentStatus.Graduated]: 'Formado',
        [StudentStatus.Transferred]: 'Transferido'
    };

    ngOnInit() {
        this.loadStudents();
    }

    loadStudents() {
        this.loading = true;
        this.studentService.getList({
            maxResultCount: 100,
            skipCount: 0,
            filter: this.searchTerm
        }).subscribe({
            next: (res) => {
                this.students = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    createStudent() {
        this.router.navigate(['/admin/students/new']);
    }

    editStudent(id: string) {
        this.router.navigate(['/admin/students/edit', id]);
    }

    deleteStudent(student: StudentDto) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.studentService.delete(student.id).subscribe(() => {
                    this.loadStudents();
                });
            }
        });
    }

    getStatusLabel(status: StudentStatus): string {
        return this.statusLabels[status] || 'Desconhecido';
    }

    getStatusClass(status: StudentStatus): string {
        switch (status) {
            case StudentStatus.Active: return 'status-active';
            case StudentStatus.Inactive: return 'status-inactive';
            case StudentStatus.Suspended: return 'status-warning';
            case StudentStatus.Transferred: return 'status-default';
            default: return 'status-default';
        }
    }
}
