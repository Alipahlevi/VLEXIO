import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormPasien() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};
  const isNew = routeState.from === "new";
  const tableItem = routeState.from === "table" ? routeState.data : null;
  const [activeTab, setActiveTab] = useState("emergency");
  const emptyForm = useMemo(
    () => ({
      appointmentId: "",
      time: "",
      businessUnit: "JEC @ KEDOYA",
      shift: "",
      serviceUnit: "",
      appointmentWith: "",
      appointmentChannel: "",
      visitType: "",
      appointmentCriteria: "",
      paymentMethod: "",
      guarantor: "",
      slotNo: "",
      totalPatientAppointment: "",
      appointmentStatus: "",
      followUpPatient: "",
      followUpOfficer: "",
      followUpDateTime: "",
      createdBy: "",
      createdDateTime: "",
      note: "",

      patientId: "",
      findPatient: "",
      firstName: "",
      middleName: "",
      lastName: "",
      prefix: "",
      city: "",
      dateOfBirth: "",
      gender: "",
      nik: "",
      mobilePhoneCode: "+62",
      mobilePhone: "",
      phoneNo: "",
      email: "",
      patientCategory: "General Patient",

      parentName: "",
      contactName: "",
      contactRelation: "",
      addressStreet: "",
      addressCity: "",
      addressDistrict: "",
      addressCountry: "",
      addressState: "",
      addressZip: "",
      addressMobileCode: "+62",
      addressMobile: "",
      addressOther: "",
      addressEmail: "",
    }),
    []
  );

  const prefilled = useMemo(() => {
    if (!tableItem) return emptyForm;
    return {
      ...emptyForm,
      appointmentId: tableItem.appointmentId || "",
      time: tableItem.appDate || "",
      appointmentWith: tableItem.doctorName || "",
      appointmentChannel: tableItem.channel || "",
      serviceUnit: tableItem.serviceUnit || "",
      // Patient Category is hardcoded
      patientCategory: "General Patient",
      firstName: tableItem.patientName || "",
      gender: tableItem.patientGender || "",
      dateOfBirth: tableItem.patientDOB || "",
      email: tableItem.email || "",
      phoneNo: tableItem.phone || "",
      patientId: tableItem.patientId || "",
    };
  }, [tableItem, emptyForm]);

  const [formData, setFormData] = useState(isNew ? emptyForm : prefilled);

  const onChange = (field) => (e) =>
    setFormData((s) => ({ ...s, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto px-6 pt-2 pb-1">
          <h1 className="text-lg font-semibold leading-tight mb-1">
            Outpatient
          </h1>
          <div className="flex items-center text-xs text-gray-500 gap-3">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span className="hover:text-gray-700 cursor-pointer">
              Admission
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Appointment
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Outpatient
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Edit</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-2 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldBlock label="Appointment No." hint="" className="">
              <Input
                value={formData.appointmentId}
                onChange={onChange("appointmentId")}
              />
            </FieldBlock>
            <FieldBlock label="Time">
              <Input value={formData.time} onChange={onChange("time")} />
            </FieldBlock>

            <FieldBlock label="Appointment with">
              <Input
                value={formData.appointmentWith}
                onChange={onChange("appointmentWith")}
              />
            </FieldBlock>
            <FieldBlock label="Visit Type">
              <Select
                value={formData.visitType}
                onChange={onChange("visitType")}
              >
                <option>Konsultasi</option>
              </Select>
            </FieldBlock>

            <FieldBlock label="Appointment Channel">
              <PillSelect pills={[formData.appointmentChannel]} />
            </FieldBlock>
            <FieldBlock label="Appointment Criteria">
              <Select
                value={formData.appointmentCriteria}
                onChange={onChange("appointmentCriteria")}
              >
                <option>Konsultasi</option>
              </Select>
            </FieldBlock>

            <FieldBlock label="Guarantor">
              <Select
                value={formData.guarantor}
                onChange={onChange("guarantor")}
              >
                <option value="">Select...</option>
              </Select>
            </FieldBlock>
            <FieldBlock label="Payment Method">
              <Select
                value={formData.paymentMethod}
                onChange={onChange("paymentMethod")}
              >
                <option>Self Payment</option>
              </Select>
            </FieldBlock>
          </div>

          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            <FieldBlock label="Slot No.">
              <div className="grid grid-cols-2 gap-3">
                <BadgeBox>{formData.slotNo}</BadgeBox>
                <div className="text-[10px] text-gray-500 col-span-1 flex flex-col items-center justify-center text-center">
                  <div className="text-base leading-none font-semibold text-gray-700">
                    {formData.totalPatientAppointment}
                  </div>
                  <div className="leading-tight">
                    Total Patient Appointment on This Date
                  </div>
                </div>
              </div>
            </FieldBlock>
            <FieldBlock label="Appointment Status" className="col-span-2">
              <div className="flex items-center gap-2">
                <Select
                  value={formData.appointmentStatus}
                  onChange={onChange("appointmentStatus")}
                  className="w-40"
                >
                  <option>Open</option>
                  <option>Closed</option>
                </Select>
                <button className="ml-auto px-3 h-8 rounded-md border border-gray-300 bg-white text-[12px]">
                  Open
                </button>
              </div>
            </FieldBlock>
            <FieldBlock label="Follow Up Patient" className="col-span-2">
              <Input
                value={formData.followUpPatient}
                onChange={onChange("followUpPatient")}
              />
            </FieldBlock>
            <FieldBlock label="Follow Up Officer" className="col-span-2">
              <Input
                value={formData.followUpOfficer}
                onChange={onChange("followUpOfficer")}
              />
            </FieldBlock>
            <FieldBlock label="Follow Up Date Time" className="col-span-2">
              <Input
                value={formData.followUpDateTime}
                onChange={onChange("followUpDateTime")}
                placeholder="dd/mm/yyyy ~:~"
              />
            </FieldBlock>
            <FieldBlock label="Created By">
              <Input
                value={formData.createdBy}
                onChange={onChange("createdBy")}
              />
            </FieldBlock>
            <FieldBlock label="Created Date Time">
              <Input
                value={formData.createdDateTime}
                onChange={onChange("createdDateTime")}
              />
            </FieldBlock>
            <FieldBlock label="Note" className="col-span-2">
              <textarea
                value={formData.note}
                onChange={onChange("note")}
                rows={5}
                className="w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-[12px] outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </FieldBlock>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FieldBlock label="Business Unit">
            <PillSelect pills={[formData.businessUnit]} />
          </FieldBlock>
          <FieldBlock label="Shift">
            <Select value={formData.shift} onChange={onChange("shift")}>
              <option>-</option>
            </Select>
          </FieldBlock>
          <FieldBlock label="Service Unit">
            <PillSelect pills={[formData.serviceUnit]} />
          </FieldBlock>
          <div />
        </div>

        <SectionTitle>Patient Info :</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldBlock label="Patient ID / Medical No.">
            <Input
              value={formData.patientId}
              onChange={onChange("patientId")}
            />
          </FieldBlock>
          <FieldBlock label="Find Patient">
            <Input
              value={formData.findPatient}
              onChange={onChange("findPatient")}
            />
          </FieldBlock>

          <FieldBlock label="First Name" required>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-md border border-gray-300 bg-white text-[11px]">
                {formData.prefix}
              </span>
              <Input
                value={formData.firstName}
                onChange={onChange("firstName")}
                className="flex-1"
              />
              <button className="text-gray-500 hover:text-red-500 text-sm">
                ×
              </button>
            </div>
          </FieldBlock>
          <FieldBlock label="Middle Name">
            <Input
              value={formData.middleName}
              onChange={onChange("middleName")}
            />
          </FieldBlock>
          <FieldBlock label="Last Name">
            <Input value={formData.lastName} onChange={onChange("lastName")} />
          </FieldBlock>

          <FieldBlock label="City">
            <Input value={formData.city} onChange={onChange("city")} />
          </FieldBlock>
          <FieldBlock label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={onChange("dateOfBirth")}
            />
          </FieldBlock>
          <FieldBlock label="Gender">
            <div className="flex items-center gap-2">
              <Input
                value={formData.gender}
                onChange={onChange("gender")}
                className="flex-1"
              />
              <button className="text-gray-500 hover:text-red-500 text-sm">
                ×
              </button>
            </div>
          </FieldBlock>
          <FieldBlock label="NIK / SSN">
            <Input value={formData.nik} onChange={onChange("nik")} />
          </FieldBlock>

          <FieldBlock label="Mobile Phone No" required>
            <div className="flex items-center gap-2">
              <CountryCode
                value={formData.mobilePhoneCode}
                onChange={onChange("mobilePhoneCode")}
              />
              <Input
                value={formData.mobilePhone}
                onChange={onChange("mobilePhone")}
                className="flex-1"
                placeholder="812 1965 1411"
              />
              <Select className="w-28">
                <option>Select..</option>
              </Select>
            </div>
          </FieldBlock>
          <FieldBlock label="Phone No.">
            <Input value={formData.phoneNo} onChange={onChange("phoneNo")} />
          </FieldBlock>
          <FieldBlock label="Email">
            <Input value={formData.email} onChange={onChange("email")} />
          </FieldBlock>

          <FieldBlock label="Patient Category">
            <PillSelect pills={[formData.patientCategory]} />
          </FieldBlock>
        </div>

        <div className="mt-4 border-b border-gray-200">
          <div className="flex items-center gap-6 text-[12px]">
            <TabButton
              active={activeTab === "emergency"}
              onClick={() => setActiveTab("emergency")}
            >
              Emergency Contact
            </TabButton>
            <TabButton
              active={activeTab === "risk"}
              onClick={() => setActiveTab("risk")}
            >
              Patient Risk
            </TabButton>
            <TabButton
              active={activeTab === "bpjs"}
              onClick={() => setActiveTab("bpjs")}
            >
              BPJS
            </TabButton>
          </div>
        </div>
        <div className="py-3 text-[12px] text-gray-600">
          {activeTab === "emergency" && (
            <div>Emergency contact details can be filled here.</div>
          )}
          {activeTab === "risk" && <div>Patient risk information.</div>}
          {activeTab === "bpjs" && <div>BPJS information form.</div>}
        </div>

        <SectionTitle>Address</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FieldBlock label="Street Name">
            <Input
              value={formData.addressStreet}
              onChange={onChange("addressStreet")}
            />
          </FieldBlock>
          <FieldBlock label="County (in discuss)">
            <Select
              value={formData.addressCountry}
              onChange={onChange("addressCountry")}
            >
              <option>Select..</option>
            </Select>
          </FieldBlock>
          <FieldBlock label="District">
            <Select
              value={formData.addressDistrict}
              onChange={onChange("addressDistrict")}
            >
              <option>Select..</option>
            </Select>
          </FieldBlock>
          <FieldBlock label="City">
            <Input
              value={formData.addressCity}
              onChange={onChange("addressCity")}
            />
          </FieldBlock>
          <FieldBlock label="State">
            <Select
              value={formData.addressState}
              onChange={onChange("addressState")}
            >
              <option>Select..</option>
            </Select>
          </FieldBlock>
          <FieldBlock label="Country">
            <Select
              value={formData.addressCountry}
              onChange={onChange("addressCountry")}
            >
              <option>Select..</option>
            </Select>
          </FieldBlock>
          <FieldBlock label="Zip Code">
            <Input
              value={formData.addressZip}
              onChange={onChange("addressZip")}
            />
          </FieldBlock>
          <FieldBlock label="Mobile Phone">
            <div className="flex items-center gap-2">
              <CountryCode
                value={formData.addressMobileCode}
                onChange={onChange("addressMobileCode")}
              />
              <Input
                value={formData.addressMobile}
                onChange={onChange("addressMobile")}
                className="flex-1"
              />
            </div>
          </FieldBlock>
          <FieldBlock label="Other Number">
            <Input
              value={formData.addressOther}
              onChange={onChange("addressOther")}
            />
          </FieldBlock>
          <FieldBlock label="Email">
            <Input
              value={formData.addressEmail}
              onChange={onChange("addressEmail")}
            />
          </FieldBlock>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 h-9 rounded-full text-white text-[12px] font-semibold shadow-sm hover:bg-orange-600 border-0"
            style={{ backgroundColor: "#f97316" }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 h-9 rounded-full text-white text-[12px] font-semibold shadow-sm hover:bg-blue-700 border-0"
            style={{ backgroundColor: "#2563eb" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mt-6 mb-2 text-[12px] font-semibold text-gray-700">
      {children}
    </div>
  );
}

function FieldBlock({ label, children, required, className = "" }) {
  return (
    <div className={className}>
      <div className="text-[11px] text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-[12px] outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    />
  );
}

function Select({ className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-[12px] outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
  );
}

function PillSelect({ pills = [], closable = false }) {
  return (
    <div className="min-h-9 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 flex items-center gap-1 flex-wrap">
      {pills.map((p, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2 h-6 rounded-md bg-gray-100 text-gray-700 text-[11px] border border-gray-300"
        >
          {p}
          {closable && (
            <button className="text-gray-500 hover:text-red-500 text-xs">
              ×
            </button>
          )}
        </span>
      ))}
      {pills.length === 0 && (
        <span className="text-[12px] text-gray-400">Select...</span>
      )}
    </div>
  );
}

function BadgeBox({ children }) {
  return (
    <div className="h-12 min-w-[48px] px-3 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-lg font-semibold text-gray-800">
      {children}
    </div>
  );
}

function CountryCode({ value, onChange }) {
  return (
    <div className="h-9 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2">
      <span className="text-[13px]">🇮🇩</span>
      <input
        value={value}
        onChange={onChange}
        className="w-12 bg-transparent text-[12px] outline-none"
      />
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 -mb-[1px] px-1.5 transition border-b-2 ${
        active
          ? "text-blue-700 border-blue-600 font-medium"
          : "text-gray-600 hover:text-gray-800 border-transparent"
      }`}
    >
      {children}
    </button>
  );
}
