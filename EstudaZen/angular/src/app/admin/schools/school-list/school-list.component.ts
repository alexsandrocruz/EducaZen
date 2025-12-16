import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService, SchoolDto, GetSchoolListDto } from '@proxy/schools';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-school-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './school-list.component.html',
    styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
    private schoolService = inject(SchoolService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    schools: PagedResultDto<SchoolDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    ngOnInit() {
        this.loadSchools();
    }

    loadSchools() {
        this.loading = true;
        this.schoolService.getList({
            maxResultCount: 100,
            skipCount: 0,
            filter: this.searchTerm
        } as GetSchoolListDto).subscribe({
            next: (res) => {
                this.schools = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    createSchool() {
        this.router.navigate(['/admin/schools/new']);
    }

    editSchool(id: string) {
        this.router.navigate(['/admin/schools/edit', id]);
    }

    deleteSchool(school: SchoolDto) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.schoolService.delete(school.id!).subscribe(() => {
                    this.loadSchools();
                });
            }
        });
    }
}
