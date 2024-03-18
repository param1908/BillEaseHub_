export interface CustomerUser {
  _id: string;
  role: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  customerData: CustomerData;
}

export interface CustomerData {
  _id: string;
  dob: any;
  gender: any;
  profilePic: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CustomerUserData {
  imageUrl: string;
  user: CustomerUser;
}
