import React, { useState, useEffect } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import TimeRangeSelector from "../common/TimeRangeSelector";
import { useQuery } from "@tanstack/react-query";
import { getNewUsersStats } from "@/src/services/users";

type BarOptionsProps = ChartOptions<"bar">;
type BarDataProps = ChartData<"bar">;

type ChartDayProps = {
  length: 7;
} & number[];
type ChartWeekProps = {
  length: 4 | 5;
} & number[];
type ChartMonthProps = {
  length: 12;
} & number[];

const generateDailyReport = (values: ChartDayProps | []): BarDataProps => {
  return {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Daily New Users",
        data: values,
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderSkipped: true,
      },
    ],
  };
};
const generateWeeklyReport = (values: ChartWeekProps | []): BarDataProps => {
  return {
    labels: ["1º week", "2º week", "3º week", "4º week", "5º week"],
    datasets: [
      {
        label: "Weekly New Users",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderWidth: 0,
      },
    ],
  };
};
const generateMonthlyReport = (values: ChartMonthProps | []): BarDataProps => {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly New Users",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 0,
      },
    ],
  };
};

interface DataProps {
  title: string;
  report: BarDataProps;
}

const NewUsersChart = () => {
  const intervals = ["Day", "Week", "Month"];
  const [interval, setInterval] = useState<string>("day");
  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: ["new_users_stats", interval],
    queryFn: () => getNewUsersStats(interval),
  });

  // Use react-query to manage loading states when loading and refetchs
  const chartData: Record<string, DataProps> = {
    day: {
      title: isPending ? "Loading..." : "Daily New Users",
      report: isRefetching
        ? generateDailyReport([])
        : generateDailyReport(data),
    },
    week: {
      title: isPending ? "Loading..." : "Weekly New Users",
      report: isRefetching
        ? generateWeeklyReport([])
        : generateWeeklyReport(data),
    },
    month: {
      title: isPending ? "Loading..." : "Monthly New Users",
      report: isRefetching
        ? generateMonthlyReport([])
        : generateMonthlyReport(data),
    },
  };
  const chartOptions: BarOptionsProps = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 30,
        suggestedMax: 50,
        grid: {
          tickColor: "transparent",
        },
        ticks: {
          color: "gray",
        },
      },
      x: {
        grid: {
          color: "transparent",
          tickColor: "transparent",
        },
        ticks: {
          color: "gray",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartData[interval].title,
      },
    },
  };

  useEffect(() => {
    ChartJS.register(...registerables);
  }, []);
  useEffect(() => {
    refetch();
  }, [interval]);

  return (
    <div className="card-base h-min w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#344767] font-semibold py-2">Data Users</h2>
        <TimeRangeSelector
          onChange={setInterval}
          intervals={intervals}
          currentInterval={interval}
        />
      </div>
      <Bar data={chartData[interval].report} options={chartOptions} />
    </div>
  );
};

export default NewUsersChart;
