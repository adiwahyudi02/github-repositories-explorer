export interface IGetUsersReq {
  q: string;
  page?: number;
  per_page?: number;
}

export interface IGetUsersRes {
  total_count: number;
  incomplete_results: boolean;
  items: IUser[];
}

export interface IUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  score?: number;
}
