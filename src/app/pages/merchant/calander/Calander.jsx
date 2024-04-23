import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import React, { useRef, useState, useEffect } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import _ from "lodash";
import { getAllInvoiceApi } from "../../../services/merchant.service";
import MainLoader from "../../../loaders/MainLoader";

const getAllDatesInMonth = () => {
  const currentDate = moment(); // Get the current date
  const startDate = currentDate.clone().startOf("month"); // Start date of current month
  const endDate = currentDate.clone().endOf("month"); // End date of current month
  const datesArray = [];

  while (startDate.isSameOrBefore(endDate)) {
    datesArray.push(startDate.format("YYYY-MM-DD"));
    startDate.add(1, "day");
  }

  return datesArray;
};
const Calander = () => {
  const calendarRef = useRef(null);
  const [datesArray, setDatesArray] = useState(getAllDatesInMonth());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllInvoices(
      moment(datesArray[0]).format("DD/MM/YYYY"),
      moment(datesArray[datesArray.length - 1]).format("DD/MM/YYYY")
    );
  }, []);

  const getAllInvoices = async (fromDate, toDate) => {
    setLoading(true);
    try {
      let payload = {
        fromDate: fromDate,
        toDate: toDate,
      };
      const invoices = await getAllInvoiceApi(payload);
      if (invoices?.data) {
        const groupedData = _.groupBy(
          invoices?.data?.getBillTemplateData,
          (obj) => moment(obj.createdAt).format("YYYY-MM-DD")
        );
        let customers = [];

        for (const date in groupedData) {
          if (Object.prototype.hasOwnProperty.call(groupedData, date)) {
            groupedData[date].forEach((el) => {
              customers.push({
                start: date,
                title:
                  el.customerName.charAt(0).toUpperCase() +
                  el.customerName.slice(1),
                borderColor: "#50cd89",
                backgroundColor: "#50cd89",
              });
            });
          }
        }

        setEvents(customers);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCustomButtonClick = (buttonName) => {
    const calendarApi = calendarRef.current.getApi();
    const events = calendarApi.getEvents();
    if (buttonName === "listMonth" && events.length === 0) {
      calendarApi.setOption("noEventsContent", "No customers found");
    } else {
      calendarApi.setOption("noEventsContent", "");
    }
    switch (buttonName) {
      case "customPrev":
        calendarApi.prev();
        break;
      case "customNext":
        calendarApi.next();
        break;
      case "customToday":
        calendarApi.today();
        break;
      case "dayGridMonth":
        calendarApi.changeView(buttonName);
        break;
      case "timeGridWeek":
        calendarApi.changeView(buttonName);
        break;
      case "timeGridDay":
        calendarApi.changeView(buttonName);
        break;
      case "listMonth":
        calendarApi.changeView(buttonName);
        break;
      default:
        break;
    }

    const currentView = calendarApi.view;
    const startDate = moment(currentView.currentStart);
    const endDate = moment(currentView.currentEnd);
    const datesArray = [];

    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      datesArray.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }
    setDatesArray(datesArray);
    getAllInvoices(
      moment(datesArray[0]).format("DD/MM/YYYY"),
      moment(datesArray[datesArray.length - 1]).format("DD/MM/YYYY")
    );
  };

  const customButtons = {
    customPrev: {
      text: "Prev",
      click: () => handleCustomButtonClick("customPrev"),
    },
    customNext: {
      text: "Next",
      click: () => handleCustomButtonClick("customNext"),
    },
    customToday: {
      text: "Today",
      click: () => handleCustomButtonClick("customToday"),
    },
    customDayGridMonth: {
      text: "Month",
      click: () => handleCustomButtonClick("dayGridMonth"),
    },
    customTimeGridWeek: {
      text: "Week",
      click: () => handleCustomButtonClick("timeGridWeek"),
    },
    customTimeGridDay: {
      text: "Day",
      click: () => handleCustomButtonClick("timeGridDay"),
    },
    customListMonth: {
      text: "List",
      click: () => handleCustomButtonClick("listMonth"),
    },
  };

  return (
    <>
      <div
        className="card card-custom card-stretch gutter-b mb-10 p-7"
        style={{ minHeight: "calc(100vh - 120px)", width: "100%" }}
      >
        <FullCalendar
          ref={calendarRef}
          aspectRatio={1}
          height="auto"
          dayMaxEventRows={3}
          eventLimit={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          events={events}
          selectable={true}
          customButtons={customButtons}
          headerToolbar={{
            start: "customPrev,customNext,customToday",
            center: "title",
            end: "customDayGridMonth,customTimeGridWeek,customTimeGridDay,customListMonth",
          }}
        />
      </div>
      {loading && <MainLoader />}
    </>
  );
};

export default Calander;
