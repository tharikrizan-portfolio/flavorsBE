import ImgDashboard from './menuItemsImages/dashboard.png';
import ImgTemplate from './menuItemsImages/template.png';
import ImgUser from './menuItemsImages/user.png';
export default {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard/default',
          icon: ImgDashboard,
        },
        {
          id: 'templates',
          title: 'Templates',
          type: 'item',
          url: '/survey-management/templates',
          icon: ImgTemplate,
        },
      ],
    },
    {
      id: 'profileManagement',
      title: 'Profile Overview',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: '/profile-management/profile',
          icon: ImgUser,
        },
      ],
    },
  ],
};
