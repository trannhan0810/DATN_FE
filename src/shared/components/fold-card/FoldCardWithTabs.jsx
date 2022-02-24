import { Tabs } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ClassInfoLayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px 24px 0px 24px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .fold-card-with-tabs-header {
    flex: 0 0 50px;
    width: 100%;
  }

  .fold-card-with-tabs-content {
    flex: 1 1 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid lightgray;
    padding: 0px;

    > .ant-tabs .ant-tabs-content-holder .ant-tabs-content {
      flex: 1;
      height: 100%;
    }
  }

  .class-content {
    flex: 1 1 0px;
    height: 100%;
    width: 100%;
  }
`

function FoldCardWithTabs(props) {
  const { tabs, FoldCardHeader } = props

  return (
    <ClassInfoLayoutWrapper>
      <div className="fold-card-with-tabs-header">{FoldCardHeader}</div>
      <div className="fold-card-with-tabs-content">
        <Tabs
          defaultActiveKey={1}
          tabPosition="top"
          tabBarStyle={{ height: '40px', width: '100%', margin: 0, borderBottom: '2px solid lightgray' }}
          style={{ height: '100%', width: '100%' }}
        >
          {tabs.map((_ele, i) => (
            <Tabs.TabPane
              className="class-content"
              tab={tabs[i].displayText}
              key={Number(i)}
              style={{ flex: '1 1 0px' }}
            >
              {tabs[i].component}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </ClassInfoLayoutWrapper>
  )
}

FoldCardWithTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      displayText: PropTypes.string,
      component: PropTypes.node,
    }),
  ),
  FoldCardHeader: PropTypes.node,
}

export default FoldCardWithTabs
