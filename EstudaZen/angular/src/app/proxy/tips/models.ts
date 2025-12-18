// Tips Proxy Models

export enum TipCategory {
    DicaDoDia = 0,
    Novidade = 1,
    Estudos = 2,
    Evento = 3
}

export enum TipType {
    Normal = 0,
    Highlight = 1
}

export interface TipDto {
    id?: string;
    title?: string;
    description?: string;
    category?: TipCategory;
    type?: TipType;
    icon?: string;
    iconColor?: string;
    iconBgColor?: string;
    imageUrl?: string;
    linkUrl?: string;
    isActive?: boolean;
    order?: number;
    startDate?: string;
    endDate?: string;
}

export interface CreateUpdateTipDto {
    title: string;
    description: string;
    category: TipCategory;
    type: TipType;
    icon: string;
    iconColor?: string;
    iconBgColor?: string;
    imageUrl?: string;
    linkUrl?: string;
    isActive: boolean;
    order: number;
    startDate?: string;
    endDate?: string;
}

export interface GetTipListDto {
    skipCount?: number;
    maxResultCount?: number;
    sorting?: string;
    category?: TipCategory;
    isActive?: boolean;
    filter?: string;
}
