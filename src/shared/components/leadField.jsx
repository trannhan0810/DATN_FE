import React from 'react'
import { JOB } from '../../configs/constants'
import { formatDate, getLeadStatus } from '../utils/tool'

const getMirarLabel = isMirar => {
  switch (isMirar) {
    case true:
      return 'OK'
    case false:
      return 'NOT OK'
    default:
      return 'Chưa cung cấp'
  }
}
export const LEAD_FIELD = [
  {
    title: 'Họ và Tên',
    dataIndex: 'fullName',
    key: 'fullName',
    render: fullName => {
      return <b className="c-primary">{fullName}</b>
    },
    sorter: true,
    fixed: 'left',
    width: 150,
  },
  {
    title: 'CMND/CCCD',
    dataIndex: 'cardId',
    key: 'cardId',
    sorter: true,
  },
  {
    title: 'Di Động',
    dataIndex: 'phone',
    key: 'phone',
    sorter: true,
  },
  {
    title: 'Địa Chỉ Thường Trú',
    dataIndex: 'currentAddress',
    key: 'currentAddress',
    sorter: true,
    width: 170,
  },
  {
    title: 'Tình Trạng',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => getLeadStatus(record),
    sorter: true,
    width: 150,
  },
  {
    title: 'Công việc',
    dataIndex: 'job',
    key: 'job',
    render: job => (job ? `${JOB[parseFloat(job)]}` : 'Chưa cung cấp'),
    sorter: true,
    width: 150,
  },
  {
    title: 'Tổ chức vay tín dụng',
    dataIndex: 'creditInstitutionsLending',
    key: 'creditInstitutionsLending',
    render: creditInstitutionsLending => creditInstitutionsLending || 'Chưa cung cấp',
    sorter: true,
    width: 190,
  },
  {
    title: 'Mira',
    dataIndex: 'isMirar',
    key: 'isMirar',
    render: getMirarLabel,
    sorter: true,
    width: 100,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    sorter: true,
    width: 150,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    key: 'createdDate',
    sorter: true,
    width: 150,
    render: createdDate => {
      return `${formatDate(createdDate)}`
    },
  },
  {
    title: 'Ngày chỉnh sửa gần nhất',
    dataIndex: 'updatedDate',
    key: 'updatedDate',
    sorter: true,
    width: 150,
    render: updatedDate => {
      return updatedDate ? `${formatDate(updatedDate)}` : ''
    },
  },
  {
    title: 'Người chỉnh sửa gần nhất',
    dataIndex: 'previousHandler',
    key: 'previousHandler',
    sorter: true,
    width: 150,
    render: previousHandler => {
      return previousHandler?.fullName || ''
    },
  },
  {
    title: 'Độ ưu tiên trước đó',
    dataIndex: 'previousPriority',
    key: 'previousPriority',
    sorter: true,
    width: 150,
    render: previousPriority => {
      return previousPriority || ''
    },
  },
  {
    title: 'Ngày trả về',
    dataIndex: 'dateReturned',
    key: 'dateReturned',
    sorter: true,
    width: 150,
    render: dateReturned => {
      return dateReturned ? `${formatDate(dateReturned)}` : ''
    },
  },
]
