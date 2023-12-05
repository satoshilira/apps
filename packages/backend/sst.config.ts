import { SSTConfig } from "sst";
import { PublicSite} from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "satoshilira-public-site",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(PublicSite);
  }
} satisfies SSTConfig;
