import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipService } from '../../../proxy/tips/tip.service';
import { TipDto, TipCategory, TipType, CreateUpdateTipDto } from '../../../proxy/tips/models';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-tip-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './tip-form.component.html',
    styleUrls: ['./tip-form.component.scss']
})
export class TipFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private tipService = inject(TipService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private toaster = inject(ToasterService);

    form: FormGroup;
    loading = false;
    saving = false;
    isEditMode = false;
    tipId?: string;

    categories = [
        { value: TipCategory.DicaDoDia, label: 'Dica do Dia' },
        { value: TipCategory.Novidade, label: 'Novidade' },
        { value: TipCategory.Estudos, label: 'Estudos' },
        { value: TipCategory.Evento, label: 'Evento' }
    ];

    types = [
        { value: TipType.Normal, label: 'Normal' },
        { value: TipType.Highlight, label: 'Destaque' }
    ];

    // Common Material Community Icons for tips
    suggestedIcons = [
        'lightbulb-on', 'newspaper-variant-outline', 'school', 'calendar-star',
        'pen', 'book-open-variant', 'trophy', 'rocket', 'star', 'heart',
        'bell', 'fire', 'flash', 'information', 'check-circle'
    ];

    constructor() {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            category: [TipCategory.DicaDoDia, Validators.required],
            type: [TipType.Normal, Validators.required],
            icon: ['lightbulb-on', Validators.required],
            iconColor: ['#ffffff'],
            iconBgColor: [''],
            imageUrl: [''],
            linkUrl: [''],
            isActive: [true],
            order: [1, [Validators.required, Validators.min(0)]],
            startDate: [null],
            endDate: [null]
        });
    }

    ngOnInit() {
        this.tipId = this.route.snapshot.params['id'];
        this.isEditMode = !!this.tipId;

        if (this.isEditMode && this.tipId) {
            this.loadTip(this.tipId);
        }
    }

    loadTip(id: string) {
        this.loading = true;
        this.tipService.get(id).subscribe({
            next: (tip) => {
                this.form.patchValue({
                    title: tip.title,
                    description: tip.description,
                    category: tip.category,
                    type: tip.type,
                    icon: tip.icon || 'lightbulb-on',
                    iconColor: tip.iconColor,
                    iconBgColor: tip.iconBgColor,
                    imageUrl: tip.imageUrl,
                    linkUrl: tip.linkUrl,
                    isActive: tip.isActive,
                    order: tip.order,
                    startDate: tip.startDate ? tip.startDate.split('T')[0] : null,
                    endDate: tip.endDate ? tip.endDate.split('T')[0] : null
                });
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao carregar dica', 'Erro');
                this.loading = false;
                this.router.navigate(['/admin/tips']);
            }
        });
    }

    selectIcon(icon: string) {
        this.form.patchValue({ icon });
    }

    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toaster.error('Por favor, preencha todos os campos obrigatórios.', 'Formulário Inválido');
            return;
        }

        this.saving = true;
        const formValue = this.form.value;

        const dto: CreateUpdateTipDto = {
            title: formValue.title,
            description: formValue.description,
            category: Number(formValue.category),
            type: Number(formValue.type),
            icon: formValue.icon,
            iconColor: formValue.iconColor || undefined,
            iconBgColor: formValue.iconBgColor || undefined,
            imageUrl: formValue.imageUrl || undefined,
            linkUrl: formValue.linkUrl || undefined,
            isActive: formValue.isActive,
            order: Number(formValue.order),
            startDate: formValue.startDate || undefined,
            endDate: formValue.endDate || undefined
        };

        const request = this.isEditMode && this.tipId
            ? this.tipService.update(this.tipId, dto)
            : this.tipService.create(dto);

        request.subscribe({
            next: () => {
                this.saving = false;
                this.toaster.success('Dica salva com sucesso!', 'Sucesso');
                this.router.navigate(['/admin/tips']);
            },
            error: (err) => {
                console.error('Error saving tip:', err);
                this.toaster.error(err.error?.message || 'Ocorreu um erro ao salvar.', 'Erro');
                this.saving = false;
            }
        });
    }

    cancel() {
        this.router.navigate(['/admin/tips']);
    }
}
