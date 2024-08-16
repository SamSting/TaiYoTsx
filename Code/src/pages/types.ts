export interface Contact {
	id: string; // or number
	name: string;
	email: string;
	phone: string;
	profilePic?: string;
  }
  
  export interface ContactsState {
	contacts: Contact[];
  }
  