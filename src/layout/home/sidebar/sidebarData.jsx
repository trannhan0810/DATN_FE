import { GroupOutlined } from '@ant-design/icons'
import { ClassOutlined, ForumOutlined, VoiceChatOutlined } from '@mui/icons-material'
import React from 'react'

export const SidebarData = [
  {
    id: 1,
    name: 'Chat',
    path: '/chat',
    icon: <ForumOutlined />,
  },
  {
    id: 2,
    name: 'Meeting',
    path: '/meetingHome',
    icon: <VoiceChatOutlined />,
  },
  {
    id: 3,
    name: 'Class',
    path: '/classes',
    icon: <ClassOutlined />,
  },
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
