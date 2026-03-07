import { CONFIG } from 'src/global-config';
import { LinkManagementView } from 'src/sections/link-management';

// ----------------------------------------------------------------------

export const metadata = { title: `Link Management - ${CONFIG.appName}` };

export default function Page() {
  return <LinkManagementView />;
}
