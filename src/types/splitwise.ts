export interface SplitwiseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  registration_status: string;
  picture: {
    small: string;
    medium: string;
    large: string;
  };
  custom_picture: boolean;
  notifications: {
    email: boolean;
    push: boolean;
  };
  default_currency: string;
  locale: string;
  date_format: string;
  default_group_id: number;
  notifications_read: string;
  notifications_count: number;
  trusted_device: boolean;
  created_at: string;
  updated_at: string;
}

export interface SplitwiseApiResponse<T> {
  success: boolean;
  user?: T;
  error?: string;
}

export interface Group {
  id: string;
  name: string;
  avatar?: {
    small?: string;
    medium?: string;
    large?: string;
  };
}
