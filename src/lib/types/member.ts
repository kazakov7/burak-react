import { MemberType, MemberStatus } from "../enums/member.enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddres?: string;
  memberDesc?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberImage: string;
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddres?: string;
  memberDesc?: string;
  memberPoints?: Number;
}
export interface MemberUpdateInput {
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddres?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}
