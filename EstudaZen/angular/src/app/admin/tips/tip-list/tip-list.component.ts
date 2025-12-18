import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipService } from '../../../proxy/tips/tip.service';
import { TipDto, TipCategory, TipType } from '../../../proxy/tips/models';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-tip-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tip-list.component.html',
    styleUrls: ['./tip-list.component.scss']
})
export class TipListComponent implements OnInit {
    private tipService = inject(TipService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    tips: PagedResultDto<TipDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    // Filters
    filterCategory = '';
    filterActive = '';

    categoryLabels = {
        [TipCategory.DicaDoDia]: 'Dica do Dia',
        [TipCategory.Novidade]: 'Novidade',
        [TipCategory.Estudos]: 'Estudos',
        [TipCategory.Evento]: 'Evento'
    };

    categoryColors = {
        [TipCategory.DicaDoDia]: 'primary',
        [TipCategory.Novidade]: 'info',
        [TipCategory.Estudos]: 'success',
        [TipCategory.Evento]: 'warning'
    };

    typeLabels = {
        [TipType.Normal]: 'Normal',
        [TipType.Highlight]: 'Destaque'
    };

    ngOnInit() {
        this.loadTips();
    }

    loadTips() {
        this.loading = true;
        this.tipService.getList({
            maxResultCount: 100,
            skipCount: 0,
            filter: this.searchTerm || undefined,
            category: this.filterCategory ? parseInt(this.filterCategory) : undefined,
            isActive: this.filterActive !== '' ? this.filterActive === 'true' : undefined
        }).subscribe({
            next: (res) => {
                this.tips = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    createTip() {
        this.router.navigate(['/admin/tips/new']);
    }

    editTip(id: string) {
        this.router.navigate(['/admin/tips/edit', id]);
    }

    deleteTip(tip: TipDto) {
        this.confirmation.warn('Deseja realmente excluir esta dica?', 'Confirmar Exclusão').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.tipService.delete(tip.id!).subscribe(() => {
                    this.loadTips();
                });
            }
        });
    }

    getCategoryLabel(category: TipCategory | undefined): string {
        return category !== undefined ? this.categoryLabels[category] || 'Desconhecido' : '-';
    }

    getCategoryColor(category: TipCategory | undefined): string {
        return category !== undefined ? this.categoryColors[category] || 'primary' : 'primary';
    }

    getTypeLabel(type: TipType | undefined): string {
        return type !== undefined ? this.typeLabels[type] || 'Normal' : 'Normal';
    }

    toggleActive(tip: TipDto) {
        this.tipService.update(tip.id!, {
            title: tip.title!,
            description: tip.description!,
            category: tip.category!,
            type: tip.type!,
            icon: tip.icon || 'lightbulb-on',
            iconColor: tip.iconColor,
            iconBgColor: tip.iconBgColor,
            imageUrl: tip.imageUrl,
            linkUrl: tip.linkUrl,
            isActive: !tip.isActive,
            order: tip.order || 0,
            startDate: tip.startDate,
            endDate: tip.endDate
        }).subscribe(() => this.loadTips());
    }
}
