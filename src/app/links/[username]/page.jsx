import { CONFIG } from 'src/global-config';
import { LinkPublicView } from 'src/sections/link-public';

// ----------------------------------------------------------------------

export const metadata = { title: `My Links - ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { username } = await params;
  return <LinkPublicView username={username} />;
}
