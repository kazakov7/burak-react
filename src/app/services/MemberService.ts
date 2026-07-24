import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers", result.data);

      return result.data.result;
    } catch (err) {
      console.log("Error, getTopUsers", err);
      throw err;
    }
  }
  public async getrestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getrestaurant", result.data);

      return result.data;
    } catch (err) {
      console.log("Error, getrestaurant", err);
      throw err;
    }
  }
}

export default MemberService;
