export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Vehicle {
    id: number;
    title: string;
    brand: string;
    price: number;
    description: string;
    images?: string[];
    thumbnail: string;
    rating: number;
    stock: number;
    reviews?: Review[];
}

export interface FilterParams {
    search: string;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
}

export interface NewReviewInput {
    reviewerName: string;
    comment: string;
    rating: number;
}