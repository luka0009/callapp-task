interface Address {
    street: string
    city: string
  }
  
export interface Data {
    id?: number
    name: string
    email: string
    gender: string
    address: Address
    phone: string
  }