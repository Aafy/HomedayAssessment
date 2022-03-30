export interface IUserInfo {
  firstName: string;
  lastName: string;
  githubUserName: string;
}

export interface IUserTerms {
  userEmail: string;
  termsAndCondition: boolean;
}

export interface IUser {
  userDetails: IUserInfo;
  userAgreement: IUserTerms;
}

export interface IUserGitDetails {
  avatar_url: string;
  login: string;
  name: string;
  blog: string;
  followers: number;
  created_at: string;
}
