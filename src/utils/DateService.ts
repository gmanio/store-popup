import moment from "moment";

export default class DateService {
  static getMoment = (date: Date) => moment(date);
}
