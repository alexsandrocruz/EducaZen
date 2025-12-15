import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-class-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './class-list.html',
    styleUrls: ['./class-list.scss']
})
export class ClassListComponent implements OnInit {
    private router = inject(Router);

    classes: any[] = [];
    loading = false;
    searchTerm = '';

    ngOnInit() {
        // Placeholder - will add real API call when proxies are ready
    }

    createClass() {
        this.router.navigate(['/admin/classes/new']);
    }

    editClass(id: string) {
        this.router.navigate(['/admin/classes/edit', id]);
    }

    deleteClass(classItem: any) {
        // Placeholder
    }
}
