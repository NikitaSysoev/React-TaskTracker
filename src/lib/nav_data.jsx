import * as URL from '../router/url';

export const NAV_HOME = "MAIN";
export const NAV_MAIN = "TASK_FORM";
export const NAV_DND = "NAV_DND";

export const NAV_ITEMS = [
	{
		title: "Home",
		name: NAV_HOME,
		url: URL.URL_HOME
	},{
		title: "Task Form",
		name: NAV_MAIN,
		url: URL.URL_TASK_FORM
	},{
		title: "Drag & Drop",
		name: NAV_DND,
		url: URL.URL_TASK_DND
	},
];