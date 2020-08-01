export type UserModelParam = {
  kakaoId?: number;
  profile?: string;
  name?: string;
  email?: string;
};

export default class UserModel {
  readonly kakaoId: number = 0;
  readonly profile: string = "";
  readonly name: string = "";
  readonly email: string = "";

  constructor(param?: UserModelParam) {
    Object.assign(this, param);
  }

  public isLogin = () => this.kakaoId !== 0;
}
