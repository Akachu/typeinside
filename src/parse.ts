import { User } from "./interface";

export function parseTimeString(data: string) {
  let yearRegexp = /\d+\.\d+\.\d+/;
  let timeRegexp = /\d+:\d+/;

  let year = data.match(yearRegexp);
  let time = data.match(timeRegexp);

  let date: Date;
  if (year && time) {
    date = new Date(data);
  } else if (year) {
    date = new Date(year[0]);
  } else if (time) {
    date = new Date();
    let timeArr = data.split(":").map(num => parseInt(num));
    date.setHours(timeArr[0], timeArr[1]);
  } else {
    date = new Date();
  }

  return date;
}

export function parseUser(data: any): User {
  let ip = data.ip || data.ipData || "";
  let user: User = {
    name: data.name,
    userId: data.user_id || null,
    ip: ip !== "" ? ip : null,
    memberIcon: parseInt(data.member_icon)
  };

  return user;
}
