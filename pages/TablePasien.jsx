import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointmentsRequest,
  setCurrentPage,
  setItemsPerPage,
} from "../src/store/appointmentSlice";

export default function TablePasien() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    appointments,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
  } = useSelector((state) => state.appointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  // Filter data based on search terms
  const filteredData = appointments.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.note || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService =
      selectedService === "" || item.serviceUnit === selectedService;
    const matchesDoctor =
      selectedDoctor === "" || item.doctorName === selectedDoctor;

    return matchesSearch && matchesService && matchesDoctor;
  });

  // Get unique services and doctors for filter options
  const uniqueServices = [
    ...new Set(appointments.map((item) => item.serviceUnit)),
  ];
  const uniqueDoctors = [
    ...new Set(appointments.map((item) => item.doctorName)),
  ];

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case "Call Center":
        return "bg-blue-100 text-blue-800";
      case "Whatsapp":
        return "bg-green-100 text-green-800";
      case "Online":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatInitials = (name) => {
    const parts = name.split(" ");
    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("");
  };

  const roundIconForStatus = (status) => {
    switch (status) {
      case "Cancelled":
        return "/RedRound.png";
      case "Waiting":
        return "/OrangeRound.png";
      default:
        return "/PurpleRound.png";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Title & Breadcrumbs */}
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto px-6 pt-2 pb-1">
          <h1 className="text-lg font-semibold leading-tight mb-1">
            Outpatient
          </h1>
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span className="hover:text-gray-700 cursor-pointer">
              Admission
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Appointment
            </span>
            <span className="text-blue-600 font-medium">Outpatient</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-2 pb-2">
        {/* Action Bar */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/form-pasien"
              state={{ from: "new" }}
              className="h-9 flex items-center"
            >
              <img
                src="/NewAppointment.png"
                alt="New Appointment"
                className="h-9 w-auto"
              />
            </Link>
          </div>
          <div className="flex flex-nowrap items-center gap-2 bg-[#f6f7f9] rounded-md p-2 border border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="h-8 w-[130px] rounded border border-gray-300 bg-white px-3 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-1 bg-white text-[11px] px-3 h-8 rounded border border-gray-300">
              <span className="font-medium text-gray-700">JEC @ KEDOYA</span>
              <button
                onClick={() => {}}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                ×
              </button>
            </div>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="h-8 w-[200px] px-3 text-[11px] border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Service Unit</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="h-8 w-[200px] px-3 text-[11px] border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {uniqueDoctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 w-[200px] pl-7 pr-3 text-[11px] border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <img
                src="/LogoSearchNav.png"
                className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 opacity-60"
              />
            </div>
            <button className="ml-auto h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50">
              <span className="text-lg -mt-1">⋯</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-6 pb-10">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto custom-scroll">
              <table className="min-w-full table-fixed text-[11px]">
                <colgroup>
                  <col className="w-[180px]" />
                  <col className="w-[110px]" />
                  <col className="w-[190px]" />
                  <col className="w-[120px]" />
                  <col className="w-[200px]" />
                  <col className="w-[110px]" />
                  <col className="w-[110px]" />
                  <col className="w-[170px]" />
                  <col className="w-[48px]" />
                </colgroup>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item.appointmentId}
                      className="hover:bg-gray-50 border-b border-gray-200"
                    >
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to="/form-pasien"
                              state={{ from: "table", data: item }}
                              className="text-[11px] font-semibold text-blue-600 leading-snug hover:underline cursor-pointer"
                            >
                              {item.appointmentId}
                            </Link>
                            <div className="text-[10px] text-gray-500 mt-1">
                              {item.appDate}
                            </div>
                          </div>
                          <img
                            src={roundIconForStatus(item.status)}
                            alt={item.status}
                            className="h-3.5 w-3.5 mt-0.5"
                          />
                        </div>
                      </td>
                      {/* Channel */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">
                          Channel
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${getChannelColor(
                              item.channel
                            )}`}
                          >
                            {item.channel}
                          </span>
                        </div>
                      </td>
                      {/* Patient */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="flex items-start gap-2">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-semibold">
                            {formatInitials(item.patientName)}
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-[11px] font-medium text-gray-800 leading-tight line-clamp-2">
                              {item.patientName}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              {item.patientGender} · {item.patientDOB}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Phone - numbers represented by LogoNumber icons next to phone */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">
                          Phone No :
                        </div>
                        <div className="space-y-1">
                          {/* First row: Call icon (left) + eye (right) */}
                          <div className="flex items-center gap-1">
                            <img
                              src="/LogoCall.png"
                              alt="Call"
                              className="h-3.5 w-3.5"
                            />
                            <span className="flex-1" />
                            <img
                              src="/LogoEye.png"
                              alt="View"
                              className="h-3 w-3 opacity-70"
                            />
                          </div>
                          {/* Second row: Phone icon + masked digits text */}
                          <div className="flex items-center gap-1">
                            <img
                              src="/LogoPhone.png"
                              alt="Phone"
                              className="h-3.5 w-3.5"
                            />
                            <span className="tracking-widest text-[10px] font-medium text-gray-800 select-none">
                              **********
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* Doctor */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="flex items-start gap-2">
                          <img
                            src="/DoctorLogo.png"
                            className="h-9 w-9 rounded-full ring-1 ring-gray-200"
                          />
                          <div className="space-y-0.5">
                            <div className="text-[11px] font-medium text-gray-800 leading-tight line-clamp-2">
                              {item.doctorName}
                            </div>
                            <div className="text-[10px] text-amber-600 font-medium">
                              {item.doctorSpecialist}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Service Unit */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">
                          Service Unit :
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.serviceUnit === "EYE CLINIC"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {item.serviceUnit}
                          </span>
                        </div>
                      </td>
                      {/* Notes */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">
                          Notes :
                        </div>
                      </td>
                      {/* Last Update */}
                      <td className="align-top border-r border-gray-200 p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">
                          Last update :
                        </div>
                        <div className="text-[10px] text-gray-800 leading-snug line-clamp-3">
                          <span className="font-medium text-gray-700">
                            {item.lastUpdateBy}
                          </span>
                          <br />
                          {item.lastUpdate}
                        </div>
                      </td>
                      {/* Menu */}
                      <td className="align-top p-3 text-center">
                        <button className="ml-auto h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400">
                          <span className="text-lg -mt-1 leading-none">⋯</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mobile list (cards) */}
          <div className="lg:hidden p-3 space-y-3">
            {paginatedData.map((item) => (
              <div
                key={item.appointmentId}
                className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
              >
                {/* Header: Appointment + status dot + date */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      to="/form-pasien"
                      state={{ from: "table", data: item }}
                      className="text-[12px] font-semibold text-blue-600 hover:underline"
                    >
                      {item.appointmentId}
                    </Link>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {item.appDate}
                    </div>
                  </div>
                  <img
                    src={roundIconForStatus(item.status)}
                    alt={item.status}
                    className="h-3.5 w-3.5 mt-0.5"
                  />
                </div>

                {/* Patient + Doctor */}
                <div className="mt-2 flex items-start gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-semibold">
                    {formatInitials(item.patientName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-gray-800 truncate">
                      {item.patientName}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {item.patientGender} · {item.patientDOB}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <img
                        src="/DoctorLogo.png"
                        className="h-6 w-6 rounded-full ring-1 ring-gray-200"
                      />
                      <div className="text-[11px] text-gray-700 truncate">
                        <span className="font-medium text-gray-800">
                          {item.doctorName}
                        </span>
                        {item.doctorSpecialist && (
                          <span className="ml-1 text-amber-600">
                            · {item.doctorSpecialist}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Channel / Service / Phone */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${getChannelColor(
                      item.channel
                    )}`}
                  >
                    {item.channel}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.serviceUnit === "EYE CLINIC"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.serviceUnit}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-gray-700">
                    <img src="/LogoPhone.png" className="h-3.5 w-3.5" />
                    <span className="tracking-widest">**********</span>
                  </span>
                </div>

                {/* Footer row: last update + menu */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-[10px] text-gray-600 leading-snug">
                    <span className="font-medium text-gray-700">
                      {item.lastUpdateBy}
                    </span>{" "}
                    {item.lastUpdate}
                  </div>
                  <button className="ml-auto h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <span className="text-lg -mt-1 leading-none">⋯</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="bg-white px-3 py-2 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(setCurrentPage(1))}
                  disabled={currentPage === 1}
                  className="px-1.5 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                >
                  «
                </button>
                <button
                  onClick={() =>
                    dispatch(setCurrentPage(Math.max(1, currentPage - 1)))
                  }
                  disabled={currentPage === 1}
                  className="px-1.5 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                >
                  ‹
                </button>
                {/* Page Numbers with ellipsis */}
                {(() => {
                  const pages = [];
                  const showPages = [
                    1,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    totalPages,
                  ].filter((p) => p >= 1 && p <= totalPages);
                  const unique = [...new Set(showPages)];
                  unique.sort((a, b) => a - b);
                  let last = 0;
                  unique.forEach((p) => {
                    if (p - last > 1) {
                      pages.push(
                        <span key={"el" + p} className="px-1">
                          …
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={p}
                        onClick={() => dispatch(setCurrentPage(p))}
                        className={`min-w-[28px] h-7 px-1 rounded text-[11px] font-medium border ${
                          currentPage === p
                            ? "bg-white border-gray-300 text-black"
                            : "bg-white border-gray-300 text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    );
                    last = p;
                  });
                  return pages;
                })()}
                <button
                  onClick={() =>
                    dispatch(
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-1.5 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                >
                  ›
                </button>
                <button
                  onClick={() => dispatch(setCurrentPage(totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-1.5 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                >
                  »
                </button>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    dispatch(setItemsPerPage(Number(e.target.value)))
                  }
                  className="ml-2 h-7 rounded border border-gray-300 bg-white px-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-500">items per page</span>
              </div>
              <div className="text-gray-600">
                {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} items
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
