import { CONFIG } from 'src/global-config';
import { LinkHomeView } from 'src/sections/link-management';

// ----------------------------------------------------------------------

export const metadata = { title: `Link Management Home - ${CONFIG.appName}` };

export default function Page() {
  return <LinkHomeView />;
}
