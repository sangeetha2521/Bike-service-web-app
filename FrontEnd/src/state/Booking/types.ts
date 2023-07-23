export interface booking {
  id: string;
  name: string;
  userId: string;
  phoneNumber: number;
  serviceIds?: [];
  totalCost: number;
  location: string;
  deliveryDate: string;
  status?: string;
}
export interface InitialState {
  bookingDetails: booking[];
  apiStatus: string;
}
export interface RoleType {
  Admin: "admin";
  User: "user";
}
