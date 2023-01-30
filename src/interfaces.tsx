export interface Repo {
  name: string;
  html_url: string;
  language: string;
}

export interface User {
  public_repos: number;
  avatar_url: string;
  login: string;
  html_url: string;   
}