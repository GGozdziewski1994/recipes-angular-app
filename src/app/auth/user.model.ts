export class User {
  constructor(
    public email: string,
    public id: number,
    public role: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
