export interface Service {
  id: string;
  name: string;
}

export interface AdminState {
  status: { [id: string]: string };
  activeItem: string;
  service: Service[];
  selectedService: any;
  apiStatus: string;
}
