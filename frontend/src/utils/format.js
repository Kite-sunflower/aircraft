import dayjs from "dayjs";

/**
 * 标准时间格式化
 */
export const formatTime = (value) => {
  if (!value) return "-";
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
};
