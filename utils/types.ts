export type Profile = {
  id: string;
  name: string;
  email: string;
  users: User[];
  companies: Company[];
  tasks: Task[];
  deals: Deal[];
};

enum CompanySize {
  Enterprise,
  Large,
  Medium,
  Small,
}

enum DealStage {
  NEW,
  FOLLOW_UP,
  UNDER_REVIEW,
  UNASSIGNED,
  DEMO,
  WON,
  LOST,
}

enum BusinessType {
  B2B,
  B2C,
  B2G,
}

enum ROLE {
  ADMIN,
  USER,
}

export type User = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  role: ROLE;
  tasks: Task[];
  deals: Deal[];
  profileId: string;
  profile: Profile;
};

export type Company = {
  id: string;
  name: string;
  size: CompanySize;
  type: BusinessType;
  industryId: string;
  industry: Industry;
  revenue: number;
  website: string;
  country: string;
  dealAmount: number;
  salesOwnerId: string;
  salesOwner: SalesOwner;
  contactsId: string[];
  contacts: Contact;
  deals: Deal[];
  profileId: string;
  profile: Profile;
};

export type Industry = {
  id: string;
  title: string;
  company: Company[];
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  company: Company[];
  deals: Deal[];
};

export type SalesOwner = {
  id: string;
  name: string;
  email: string;
  company: Company[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  taskStage: TaskStage;
  taskStageId: string;
  assignedUsers: User;
  assignedUsersId: string[];
  profileId: string;
  profile: Profile;
};

export type TaskStage = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Deal = {
  id: string;
  title: string;
  companyId: string;
  company: Company;
  amount: number;
  stage: DealStage;
  ownerId: string;
  owner: User;
  contactId: string;
  contact: Contact;
  profileId: string;
  profile: Profile;
};
