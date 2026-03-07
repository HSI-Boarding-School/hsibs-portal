import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ICONS = {
  link: <Iconify icon="solar:link-bold" />,
};

// ----------------------------------------------------------------------

/**
 * Input nav data is an array of navigation section items used to define the structure and content of a navigation bar.
 * Each section contains a subheader and an array of items, which can include nested children items.
 *
 * Each item can have the following properties:
 * - `title`: The title of the navigation item.
 * - `path`: The URL path the item links to.
 * - `icon`: An optional icon component to display alongside the title.
 * - `info`: Optional additional information to display, such as a label.
 * - `allowedRoles`: An optional array of roles that are allowed to see the item.
 * - `caption`: An optional caption to display below the title.
 * - `children`: An optional array of nested navigation items.
 * - `disabled`: An optional boolean to disable the item.
 */
export const navData = [
  /**
   * Link Management
   */
  {
    subheader: 'Link Management',
    items: [
      {
        title: 'Link Management',
        path: paths.dashboard.linkManagement.root,
        icon: ICONS.link,
        children: [
          { title: 'Home', path: paths.dashboard.linkManagement.root },
          { title: 'Portal', path: paths.dashboard.linkManagement.management },
        ],
      },
    ],
  },
];
