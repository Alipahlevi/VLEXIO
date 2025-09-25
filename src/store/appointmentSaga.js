import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
} from "./appointmentSlice";

// Mock API data
const mockAppointments = [
  {
    appointmentId: "APKDY250920-00001",
    appDate: "02 Sep 2025, 18:00",
    channel: "Call Center",
    patientName: "An. FERNANDO RIYO JUN. (31)",
    patientGender: "M",
    patientDOB: "17/07/1994",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "02 Sep 2025 09:06",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567890",
    status: "Confirmed",
    note: "",
  },
  {
    appointmentId: "APKDY250827-00003",
    appDate: "28 Aug 2025, 08:00",
    channel: "Call Center",
    patientName: "Tn. Lina Mirana (6)",
    patientGender: "M",
    patientDOB: "14/01/2019",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "27 Aug 2025 04:29",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567891",
    status: "Confirmed",
    note: "Follow up prev visit",
  },
  {
    appointmentId: "APKDY250827-00002",
    appDate: "27 Aug 2025, 08:20",
    channel: "Call Center",
    patientName: "Ibu. Lina (30)",
    patientGender: "F",
    patientDOB: "27/01/1995",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "27 Aug 2025 03:58",
    lastUpdateBy: "Rama Edwinda P",
    phoneNo: "081234567892",
    status: "Waiting",
    note: "Need insurance approval",
  },
  {
    appointmentId: "APKDY250827-00001",
    appDate: "27 Aug 2025, 08:00",
    channel: "Call Center",
    patientName: "Tn. Bot 1 (0)",
    patientGender: "F",
    patientDOB: "22/07/2025",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "27 Aug 2025 12:42",
    lastUpdateBy: "Muhammad Raihan",
    phoneNo: "081234567893",
    status: "Cancelled",
    note: "Rescheduled to next week",
  },
  {
    appointmentId: "APKDY250825-00001",
    appDate: "25 Aug 2025, 08:20",
    channel: "Call Center",
    patientName: "Mr. Andi Permana (34)",
    patientGender: "F",
    patientDOB: "07/10/1990",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "25 Aug 2025 04:13",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567894",
    status: "Confirmed",
    note: "",
  },
  {
    appointmentId: "APKDY250722-00005",
    appDate: "22 Jul 2025, 10:00",
    channel: "Call Center",
    patientName: "An. Dina Sasmitra (28)",
    patientGender: "F",
    patientDOB: "17/07/1997",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "CDC",
    lastUpdate: "25 Aug 2025 04:08",
    lastUpdateBy: "Muhammad Raihan",
    phoneNo: "081234567895",
    status: "Confirmed",
    note: "Lab result pending",
  },
  {
    appointmentId: "APKDY250722-00004",
    appDate: "22 Jul 2025, 08:30",
    channel: "Call Center",
    patientName: "An. FERNANDO RIYO JUN. (31)",
    patientGender: "M",
    patientDOB: "17/07/1994",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "22 Jul 2025 10:41",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567896",
    status: "Confirmed",
    note: "",
  },
  {
    appointmentId: "APKDY250722-00003",
    appDate: "22 Jul 2025, 08:20",
    channel: "Call Center",
    patientName: "suryagao adhi wasikito (25)",
    patientGender: "M",
    patientDOB: "26/02/2000",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "22 Jul 2025 05:39",
    lastUpdateBy: "Muhammad Raihan",
    phoneNo: "081234567897",
    status: "Confirmed",
    note: "",
  },
  {
    appointmentId: "APKDY250722-00002",
    appDate: "22 Jul 2025, 08:10",
    channel: "Whatsapp",
    patientName: "Mr. Rudi Sudarman (31)",
    patientGender: "M",
    patientDOB: "19/12/1993",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "22 Jul 2025 10:10",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567898",
    status: "Confirmed",
    note: "",
  },
  {
    appointmentId: "APKDY250722-00001",
    appDate: "22 Jul 2025, 08:00",
    channel: "Call Center",
    patientName: "Mr. Andi Permana (34)",
    patientGender: "F",
    patientDOB: "07/10/1990",
    doctorName: "DR. Dr. Johan A. Hutaruk, SpM(K)",
    doctorSpecialist: "Ophthalmologist",
    serviceUnit: "EYE CLINIC",
    lastUpdate: "22 Jul 2025 10:18",
    lastUpdateBy: "Fernando Riyo J Simbolon",
    phoneNo: "081234567899",
    status: "Confirmed",
    note: "Review medication",
  },
];

// Mock API call
function* fetchAppointmentsApi() {
  // Simulate API delay
  yield delay(1000);
  return {
    data: mockAppointments,
    total: mockAppointments.length,
  };
}

function* fetchAppointmentsSaga() {
  try {
    const response = yield call(fetchAppointmentsApi);
    yield put(fetchAppointmentsSuccess(response));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error.message));
  }
}

export function* appointmentSaga() {
  yield takeEvery(fetchAppointmentsRequest.type, fetchAppointmentsSaga);
}
