import { SSTConfig } from "sst";
import { PublicSite} from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "backend",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(PublicSite);
  }
} satisfies SSTConfig;
