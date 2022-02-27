import React from 'react'
import { Tooltip } from 'antd'
import styled from '@emotion/styled'

const DrawerContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 22px;

  justify-content: space-around;

  .drawer-inner {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .input-holder {
      background-color: #ececec;
      border-radius: 8px;
      padding: 4px;
      input {
        border: none;
        outline: none;
        background-color: transparent;
        width: 90%;
      }
    }

    .btn-add {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      color: white;
      padding: 4px;
      border-radius: 4px;
      background-color: #464775;
      min-width: 100px;

      cursor: pointer;
    }
  }
`

const CreateClass = () => {
  return (
    <DrawerContentWrapper>
      <div className="drawer-inner">
        <div> Enter invite code </div>
        <div className="input-holder">
          <input />
        </div>
        <Tooltip>
          <div className="btn-add">Join</div>
        </Tooltip>
      </div>
    </DrawerContentWrapper>
  )
}

export default CreateClass
