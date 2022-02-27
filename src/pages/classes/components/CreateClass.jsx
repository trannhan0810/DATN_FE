import React, { useRef } from 'react'
import { Tooltip } from 'antd'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import useClasses from 'shared/hooks/useClasses'
import { showError } from 'core/tools'

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

const CreateClass = props => {
  const inputRef = useRef()
  const { onOK } = props
  const { createClass } = useClasses()

  return (
    <DrawerContentWrapper>
      <div className="drawer-inner">
        <div> Enter new class name </div>
        <div className="input-holder">
          <input ref={inputRef} />
        </div>
        <Tooltip
          onClick={async () => {
            if (inputRef.current.value?.length > 0) {
              await createClass({ name: inputRef.current.value })
              onOK()
              window.location.reload()
            } else {
              showError('Class name cant not null')
            }
          }}
        >
          <button type="button" className="btn-add">
            Add
          </button>
        </Tooltip>
      </div>
    </DrawerContentWrapper>
  )
}

CreateClass.propTypes = {
  onOK: PropTypes.func,
}

export default CreateClass
