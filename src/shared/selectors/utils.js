import { get, map } from 'lodash-es'

export const convertDataToSelectOptions = (data, valueProp, labelProp) => {
  return map(data, item => ({
    value: get(item, valueProp),
    label: get(item, labelProp),
  }))
}

export const convertDataToPriorityOptions = data => {
  return map(data, (item, index) => ({
    value: index + 1,
    label: item,
  }))
}

export const convertDataToJobOptions = data => {
  return map(data, (item, index) => ({
    value: index,
    label: item,
  }))
}

export const convertDataToStatusOptions = data => {
  return map(data, (item, index) => ({
    value: index,
    label: item,
  }))
}

export const convertDataToReasonOptions = data => {
  return map(data, (item, index) => ({
    value: index,
    label: item,
  }))
}

export const convertDataToEmployeeOptions = data => {
  return map(data, item => ({
    value: item.id,
    label: item.fullName,
  }))
}
