/* eslint-disable no-template-curly-in-string */
export const TimeConstants = {
  MillisecondsInOneWeek: 7 * 24 * 60 * 60 * 1000,
  MillisecondsInOneDay: 86400000,
  MillisecondsIn1Sec: 1000,
  MillisecondsIn1Min: 60000,
  MillisecondsIn30Mins: 1800000,
  MillisecondsIn1Hour: 3600000,
  MinutesInOneDay: 1440,
  MinutesInOneHour: 60,
  DaysInOneWeek: 7,
  MonthInOneYear: 12,
}

export const DayOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

export const formConfig = {
  validateMessages: {
    required: 'Hãy nhập ${label}!',
    whitespace: 'Hãy nhập ${label}!',
    string: {
      min: '${label} must be miximun ${min} characters.',
      max: '${label} must be maximum ${max} characters.',
    },
    types: {
      number: '${label} must be number.',
    },
    pattern: {
      mismatch: '${label} is not valid!',
    },
  },
  requiredMark: true,
}

export const JOB = ['TỰ DO', 'KINH DOANH CÓ ĐIỂM CỐ ĐỊNH', 'KINH DOANH KHÔNG CÓ ĐIỂM CỐ ĐỊNH', 'ĐI LÀM HƯỞNG LƯƠNG']

export const LEAD_STATUS = ['Có nhu cầu', 'Đang suy nghĩ', 'Hẹn gọi lại sau', 'Chờ hình']

export const PRIORITY = ['Ưu tiên 1', 'Ưu tiên 2', 'Ưu tiên 3', 'Ưu tiên 4', 'Ưu tiên 5']
