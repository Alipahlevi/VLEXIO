import React, { useEffect, useRef, useState } from "react";
import AppointmentSidebarIcon from "../assets/nav/AppointmentSidebar.png";
import Sidebar2Icon from "../assets/nav/Sidebar2.png";
import Sidebar3Icon from "../assets/nav/Sidebar3.png";
import Sidebar4Icon from "../assets/nav/Sidebar4.png";
import Sidebar5Icon from "../assets/nav/Sidebar5.png";
import Sidebar6Icon from "../assets/nav/Sidebar6.png";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [openAppointmentGroup, setOpenAppointmentGroup] = useState(true);
  const [openRegistration, setOpenRegistration] = useState(true);
  const [openPatient, setOpenPatient] = useState(true);
  const railRef = useRef(null);
  const flyoutRef = useRef(null);

  const menus = [
    { icon: AppointmentSidebarIcon, alt: "Appointment" },
    { icon: Sidebar2Icon, alt: "Menu 2" },
    { icon: Sidebar3Icon, alt: "Menu 3" },
    { icon: Sidebar4Icon, alt: "Menu 4" },
    { icon: Sidebar5Icon, alt: "Menu 5" },
    { icon: Sidebar6Icon, alt: "Menu 6" },
  ];

  useEffect(() => {
    function onDocClick(e) {
      if (!flyoutOpen) return;
      if (railRef.current && railRef.current.contains(e.target)) return;
      if (flyoutRef.current && flyoutRef.current.contains(e.target)) return;
      setFlyoutOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setFlyoutOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [flyoutOpen]);

  return (
    <aside
      ref={railRef}
      className="fixed top-[72px] left-0 h-[calc(100vh-72px)] w-12 bg-white border-r border-gray-200 flex flex-col items-center py-2 gap-2 z-40"
    >
      {menus.map((menu, idx) => {
        const isAppointment = idx === 0;
        return (
          <button
            key={idx}
            onClick={() => isAppointment && setFlyoutOpen((o) => !o)}
            aria-expanded={isAppointment ? flyoutOpen : undefined}
            aria-pressed={isAppointment ? flyoutOpen : undefined}
            className={`group relative h-10 w-10 flex items-center justify-center rounded-xl border transition shadow-sm hover:shadow focus:outline-none focus:ring-0 ${
              isAppointment && flyoutOpen
                ? "ring-2 ring-blue-400 border-blue-300"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: "#ffffff" }}
            title={menu.alt}
          >
            <img
              src={AppointmentSidebarIcon}
              alt=""
              className="h-5 w-5 object-contain opacity-90 group-hover:opacity-100"
              draggable="false"
            />
            {isAppointment && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-400" />
            )}
          </button>
        );
      })}

      {/* Flyout Panel */}
      {flyoutOpen && (
        <div
          ref={flyoutRef}
          className="absolute left-12 top-0 h-full w-64 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="px-4 pt-3 pb-2 text-[10px] font-semibold tracking-[.15em] text-gray-500">
            ADMISSION
          </div>

          {/* Content */}
          <div className="px-2 pb-2 overflow-y-auto">
            <button
              onClick={() => setOpenAppointmentGroup((o) => !o)}
              className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[12px]"
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-blue-200 bg-white">
                  <img
                    src={AppointmentSidebarIcon}
                    alt=""
                    className="h-3.5 w-3.5"
                  />
                </span>
                Appointment
              </span>
              <span className="text-[10px]">
                {openAppointmentGroup ? "▾" : "▸"}
              </span>
            </button>

            {openAppointmentGroup && (
              <ul className="mt-2 space-y-1 text-[12px]">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-md ${
                        isActive
                          ? "text-blue-700 font-medium"
                          : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>Outpatient</span>
                  </NavLink>
                </li>
                <li>
                  <div className="flex items-center gap-2 px-3 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>Operating Theatre</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2 px-3 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>Information</span>
                  </div>
                </li>
              </ul>
            )}

            {/* Registration */}
            <div className="mt-2">
              <button
                onClick={() => setOpenRegistration((o) => !o)}
                className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-gray-50 text-gray-700 text-[12px]"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-gray-200 bg-white">
                    <img
                      src={AppointmentSidebarIcon}
                      alt=""
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  Registration
                </span>
                <span className="text-[10px]">
                  {openRegistration ? "▾" : "▸"}
                </span>
              </button>
              {openRegistration && (
                <ul className="mt-1 space-y-1 text-[12px]">
                  <li className="flex items-center gap-2 px-7 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>List</span>
                  </li>
                  <li className="flex items-center gap-2 px-7 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>Close - Open</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Patient */}
            <div className="mt-1">
              <button
                onClick={() => setOpenPatient((o) => !o)}
                className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-gray-50 text-gray-700 text-[12px]"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-gray-200 bg-white">
                    <img
                      src={AppointmentSidebarIcon}
                      alt=""
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  Patient
                </span>
                <span className="text-[10px]">{openPatient ? "▾" : "▸"}</span>
              </button>
              {openPatient && (
                <ul className="mt-1 space-y-1 text-[12px]">
                  <li className="flex items-center gap-2 px-7 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>List</span>
                  </li>
                  <li className="flex items-center gap-2 px-7 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>Related</span>
                  </li>
                  <li className="flex items-center gap-2 px-7 py-1.5 text-gray-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span>Blacklist</span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Footer (sticky) */}
          <div className="mt-auto px-3 py-2 border-t border-gray-200 text-[11px] text-gray-700 flex items-center gap-2 bg-white">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded border border-gray-300 bg-gray-50 text-[10px]">
              🏢
            </span>
            <span>JEC @ KEDOYA</span>
          </div>
        </div>
      )}
    </aside>
  );
}
