import {StackContext, StaticSite} from 'sst/constructs';
import {RemovalPolicy} from 'aws-cdk-lib';

export function PublicSite({ stack }: StackContext) {
  const zoneName = `satoshilira.${stack.stage === 'prd' ? 'io' : 'xyz'}`;

  const site = new StaticSite(stack, 'PublicSite', {
    path: '../public-site',
    buildOutput: 'build',
    buildCommand: `pnpm build`,
    errorPage: 'redirect_to_index_page',
    customDomain: zoneName,
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
    fileOptions: [
      {
        exclude: '*',
        include: '*.html',
        cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
      },
      {
        exclude: '*',
        include: ['*.js', '*.css'],
        cacheControl: 'max-age=31536000,public,immutable',
      },
    ],
  });

  // Show the endpoint in the output
  stack.addOutputs({
    'PublicSiteUrl': site.url,
  });
}
