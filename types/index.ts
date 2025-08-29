import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { JwtPayload } from "jwt-decode";


import React from "react";

export type TInputProps = {
  name: string;
  label: string;
  placeholder: string;
  control: any;
} & HTMLInputElement;

export type TFormField = {
  name: string;
  nameLabel?: string;
  description?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
};

export type TButtonProps = {
  name: string;
  type: string;
  loading: boolean;
  className?: string;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export type TTypography = {
  label?: string;
  className?: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TJwtPayload = {
  userId: number
} & JwtPayload

export interface TUser {
  accessToken: string;
  email: string;
}

export type LoginPayload = {
  username: string;
  password: string;
};

export interface IUser {
  name: string;
  email: string;
  avatar: string;
}

export interface ITeam {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export interface IBaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

export type TNovel = {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type TTypeNovel = {
  title: string;
  genre: string;
  description: string;
  type_novel: string;
  main_character: string;
  world_setting: string;
  liu_faction: string;
  terms: boolean;
};

type TTData = {
  label: string;
  value: string;
};

export type TTableProps = {
  data: TTData[];
  children: React.ReactNode;
  isLoading: boolean;
};

export interface INovel {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  type_novel: string;
  main_character: string;
  world_setting: string;
  liu_faction: string;
  terms: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export interface IChapter {
  title: string;
  content: string;
  slug: string;
}

export interface IToken {
  user: TUser;
}

export interface ISession {
  user: TUser;
}

