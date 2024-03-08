import { SSTConfig } from 'sst';
import { PublicSite } from './stacks/PublicSite';
import { WhitepaperSiteStack } from './stacks/WhitepaperSiteStack';

export default {
  config(_input) {
    return {
      name: 'satoshilira-public-site',
      region: 'eu-central-1',
    };
  },
  stacks(app) {
    app.stack(PublicSite);
    app.stack(WhitepaperSiteStack);
  },
} satisfies SSTConfig;
