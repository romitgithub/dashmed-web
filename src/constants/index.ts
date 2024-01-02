export const REDIRECT_URI = "redirectUri";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const PLAN_SELECTED = "PLAN_SELECTED";
export const IMAGES_POST_DATA = "IMAGES_POST_DATA";
export const PAYMENT_REQUIRED_ERR_MESSAGE = "payment_required";
import { State } from "country-state-city";

// all indian states
const allSIndianStates = State.getStatesOfCountry("IN");
export const states = allSIndianStates.map((el) => {
     return { "value": el.isoCode, "label": el.name };
});


export const districts = [
     { code: 'AG', name: 'Agar Malwa' },
     { code: 'AL', name: 'Alirajpur' },
     { code: 'AN', name: 'Anuppur' },
     { code: 'AK', name: 'Ashoknagar' },
     { code: 'BG', name: 'Balaghat' },
     { code: 'BW', name: 'Barwani' },
     { code: 'BT', name: 'Betul' },
     { code: 'BD', name: 'Bhind' },
     { code: 'BP', name: 'Bhopal' },
     { code: 'BH', name: 'Burhanpur' },
     { code: 'CT', name: 'Chhatarpur' },
     { code: 'CN', name: 'Chhindwara' },
     { code: 'DM', name: 'Damoh' },
     { code: 'DT', name: 'Datia' },
     { code: 'DW', name: 'Dewas' },
     { code: 'DH', name: 'Dhar' },
     { code: 'DI', name: 'Dindori' },
     { code: 'GN', name: 'Guna' },
     { code: 'GW', name: 'Gwalior' },
     { code: 'HD', name: 'Harda' },
     { code: 'HB', name: 'Hoshangabad' },
     { code: 'ID', name: 'Indore' },
     { code: 'JB', name: 'Jabalpur' },
     { code: 'JH', name: 'Jhabua' },
     { code: 'KT', name: 'Katni' },
     { code: 'KW', name: 'Khandwa' },
     { code: 'KG', name: 'Khargone' },
     { code: 'MD', name: 'Mandla' },
     { code: 'MS', name: 'Mandsaur' },
     { code: 'MR', name: 'Morena' },
     { code: 'NP', name: 'Narsinghpur' },
     { code: 'NH', name: 'Neemuch' },
     { code: 'PN', name: 'Panna' },
     { code: 'RS', name: 'Raisen' },
     { code: 'RG', name: 'Rajgarh' },
     { code: 'RL', name: 'Ratlam' },
     { code: 'RW', name: 'Rewa' },
     { code: 'SG', name: 'Sagar' },
     { code: 'SN', name: 'Satna' },
     { code: 'SH', name: 'Sehore' },
     { code: 'SE', name: 'Seoni' },
     { code: 'SD', name: 'Shahdol' },
     { code: 'SP', name: 'Shajapur' },
     { code: 'SO', name: 'Sheopur' },
     { code: 'SV', name: 'Shivpuri' },
     { code: 'SI', name: 'Sidhi' },
     { code: 'SR', name: 'Singrauli' },
     { code: 'TK', name: 'Tikamgarh' },
     { code: 'UJ', name: 'Ujjain' },
     { code: 'UM', name: 'Umaria' },
     { code: 'VD', name: 'Vidisha' },
];

interface YearObject {
     value: number;
     label: number;
};

const years: YearObject[] = [];
const currentYear: number = new Date().getFullYear();
const startYear: number = 1900;

for (let year = startYear; year <= currentYear; year++) years.push({ value: year, label: year });
export { years };
export type { YearObject };


export const days = [
     { value: 1, label: 1 },
     { value: 2, label: 2 },
     { value: 3, label: 3 },
     { value: 4, label: 4 },
     { value: 5, label: 5 },
     { value: 6, label: 6 },
     { value: 7, label: 7 },
     { value: 8, label: 8 },
     { value: 9, label: 9 },
     { value: 10, label: 10 },
     { value: 11, label: 11 },
     { value: 12, label: 12 },
     { value: 13, label: 13 },
     { value: 14, label: 14 },
     { value: 15, label: 15 },
     { value: 16, label: 16 },
     { value: 17, label: 17 },
     { value: 18, label: 18 },
     { value: 19, label: 19 },
     { value: 20, label: 20 },
     { value: 21, label: 21 },
     { value: 22, label: 22 },
     { value: 23, label: 23 },
     { value: 24, label: 24 },
     { value: 25, label: 25 },
     { value: 26, label: 26 },
     { value: 27, label: 27 },
     { value: 28, label: 28 },
     { value: 29, label: 29 },
     { value: 30, label: 30 },
     { value: 31, label: 31 }
];


export const months = [
     { value: 1, label: 1 },
     { value: 2, label: 2 },
     { value: 3, label: 3 },
     { value: 4, label: 4 },
     { value: 5, label: 5 },
     { value: 6, label: 6 },
     { value: 7, label: 7 },
     { value: 8, label: 8 },
     { value: 9, label: 9 },
     { value: 10, label: 10 },
     { value: 11, label: 11 },
     { value: 12, label: 12 }
];


export const gender = [
     { value: "M", label: "Male" },
     { value: "F", label: "Female" },
];
