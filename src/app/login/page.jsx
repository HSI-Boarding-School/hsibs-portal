import { CONFIG } from 'src/global-config';

import { LoginView } from 'src/sections/auth/login-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Login | ${CONFIG.appName}` };

export default function Page() {
  return <LoginView />;
}
