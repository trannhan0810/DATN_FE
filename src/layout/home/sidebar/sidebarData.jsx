import { GroupOutlined } from '@ant-design/icons'
import React from 'react'

export const SidebarData = [
  // {
  //   id: 1,
  //   name: 'Activity',
  //   path: '/activity',
  //   icon: <i className="fi-rr-bell" />,
  // },
  {
    id: 2,
    name: 'Chat',
    path: '/chat',
    icon: <i className="fi-rr-comment" />,
  },
  {
    id: 3,
    name: 'Teams',
    path: '/team',
    icon: <GroupOutlined />,
  },
  // {
  //   id: 4,
  //   name: 'Assignments',
  //   path: '/assignments',
  //   icon: <i className="fi-rr-backpack" />,
  // },
  // {
  //   id: 5,
  //   name: 'Calender',
  //   path: '/calender',
  //   icon: <i className="fi-rr-calendar" />,
  // },
  {
    id: 6,
    name: 'Calls',
    path: '/calls',
    icon: <i className="fi-rr-headset" />,
  },
  {
    id: 7,
    name: 'Files',
    path: '/file',
    icon: <i className="fi-rr-file" />,
  },
]

export const SidebarMore = {
  icon: <i className="fi-rr-menu-dots" />,
}

export const SidebarBottom = [
  {
    id: 1,
    name: 'Apps',
    icon: <i className="fi-rr-apps-add" />,
  },
  {
    id: 2,
    name: 'Help',
    icon: <i className="fi-rr-interrogation" />,
  },
]
