import moment from "moment";
export function timeFromNow(data) {
	return moment(data).fromNow();
}
