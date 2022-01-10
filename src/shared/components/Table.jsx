import React from 'react'
import PropTypes from 'prop-types'
import { Table as TableAntd } from 'antd'

const Table = ({
  columns,
  dataSource,
  onChange,
  rowKey,
  currentPage,
  totalItems,
  loading,
  onRow,
  onHandleChange,
  onShowSizeChange,
  options,
}) => {
  return (
    <TableAntd
      size="middle"
      scroll={{ x: true }}
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onRow={onRow}
      pagination={{
        current: currentPage,
        total: totalItems,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        defaultPageSize: 10,
        showQuickJumper: true,
        onChange,
        onShowSizeChange,
        ...options,
      }}
      onChange={onHandleChange}
    />
  )
}

Table.defaultProps = {
  dataSource: [],
}

Table.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]).isRequired,
  dataSource: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  onChange: PropTypes.func,
  rowKey: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onRow: PropTypes.func,
  onHandleChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  options: PropTypes.objectOf(PropTypes.any),
}
export default Table
