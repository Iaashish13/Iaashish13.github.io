export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  about: string;
  photo: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  core: string[];
  seniorFlutter: string[];
  additional: string[];
}
