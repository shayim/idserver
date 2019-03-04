import { model } from "mongoose";

const grantable = new Set([
  "AccessToken",
  "AuthorizationCode",
  "RefreshToken",
  "DeviceCode",
]);

export class Adapter {
  constructor(public name: string) {}

  async upsert(id: string, payload: string, expiresIn: number): Promise<any> {
    const key = this.key(id);
  }

  async find(id: string): Promise<any> {
    const doc = await model(this.name).findOne({ _id: id });
    return doc;
  }

  findByUserCode: (userCode: string) => Promise<void>;
  consume: (id: string) => Promise<void>;

  async destroy(id: string): Promise<void> {
    const found = (await model(this.name).findOneAndDelete({ _id: id })).toJSON();

    if (found.value && found.value.grantId) {
      const promises = [];
    }
  }

  key(id: string) {
    return `${this.name}:${id}`;
  }
}
