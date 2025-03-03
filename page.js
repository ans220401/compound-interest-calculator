"use client";

import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/* ------------------------------------------------------------------------- */
/*                MilestonesInput Component (Dynamic Milestone Entries)      */
/* ------------------------------------------------------------------------- */
function MilestonesInput({ milestones, setMilestones, startingAge }) {
  const addMilestone = () => {
    // Add a new milestone with default values. Here we use startingAge for age,
    // zero salary and contribution so the user can fill them in.
    const newMilestone = {
      age: startingAge,
      salary: 0,
      monthlyContribution: 0,
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (index, field, value) => {
    const updated = milestones.map((ms, i) =>
      i === index ? { ...ms, [field]: value } : ms
    );
    setMilestones(updated);
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <fieldset className="border-2 border-gray-200 rounded-lg p-4 mt-4">
      <legend className="text-xl font-semibold text-gray-700 px-2">
        Financial Milestones
      </legend>
      {milestones.map((ms, index) => (
        <div key={index} className="flex flex-wrap space-x-4 items-end mt-2">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-1">Age</label>
            <input
              type="number"
              value={ms.age}
              onChange={(e) =>
                updateMilestone(index, "age", parseFloat(e.target.value))
              }
              className="w-20 p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-1">Salary</label>
            <input
              type="number"
              value={ms.salary}
              onChange={(e) =>
                updateMilestone(index, "salary", parseFloat(e.target.value))
              }
              className="w-32 p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-1">
              Monthly Contribution
            </label>
            <input
              type="number"
              value={ms.monthlyContribution}
              onChange={(e) =>
                updateMilestone(
                  index,
                  "monthlyContribution",
                  parseFloat(e.target.value)
                )
              }
              className="w-32 p-2 border rounded"
            />
          </div>
          {milestones.length > 1 && (
            <div className="mb-2">
              <button
                type="button"
                onClick={() => removeMilestone(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addMilestone}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Milestone
      </button>
    </fieldset>
  );
}

/* ------------------------------------------------------------------------- */
/*              DataInput Component with Updated Inputs                      */
/* ------------------------------------------------------------------------- */
function DataInput({
  startingAmount,
  setStartingAmount,
  durationYears,
  setDurationYears,
  annualRate,
  setAnnualRate,
  compoundingFrequency,
  setCompoundingFrequency,
  startingAge,
  setStartingAge,
  milestones,
  setMilestones,
  contributionTiming,
  setContributionTiming,
  calculateInvestment,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl transform transition hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Investment Details
      </h2>
      <div className="space-y-6">
        {/* Starting Amount */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Starting Amount (£/$/€):
          </label>
          <input
            type="number"
            value={startingAmount}
            onChange={(e) => setStartingAmount(parseFloat(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        {/* Investment Duration */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Investment Duration (Years):
          </label>
          <input
            type="number"
            value={durationYears}
            onChange={(e) => setDurationYears(parseFloat(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        {/* Annual Return Rate */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Return Rate (Annual %):
          </label>
          <input
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        {/* Compounding Frequency */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Compounding Frequency:
          </label>
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          >
            <option>Annually</option>
            <option>Semi-Annually</option>
            <option>Quarterly</option>
            <option>Monthly</option>
            <option>Daily</option>
          </select>
        </div>

        {/* Starting Age */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Starting Age:
          </label>
          <input
            type="number"
            value={startingAge}
            onChange={(e) => setStartingAge(parseFloat(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
          />
        </div>

        {/* Milestones */}
        <MilestonesInput
          milestones={milestones}
          setMilestones={setMilestones}
          startingAge={startingAge}
        />

        {/* Contribution Timing */}
        <div>
          <label className="block text-gray-700 text-lg mb-2">
            Contribution Timing:
          </label>
          <select
            value={contributionTiming}
            onChange={(e) => setContributionTiming(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
          >
            <option>Beginning</option>
            <option>End</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          type="button"
          onClick={calculateInvestment}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*           ResultsDisplay Component (Unchanged from before)                */
/* ------------------------------------------------------------------------- */
function ResultsDisplay({
  finalBalance,
  totalContributions,
  totalInterest,
  schedule,
  durationYears,
  startingAmount,
}) {
  // Chart.js data setup
  const lineChartData = {
    labels: schedule.map((item) => `M${item.month}`),
    datasets: [
      {
        label: "Investment Balance",
        data: schedule.map((item) => parseFloat(item.balance.toFixed(2))),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.5)",
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ["Starting Amount", "Additional Contributions", "Interest Earned"],
    datasets: [
      {
        data: [
          startingAmount,
          totalContributions !== null ? totalContributions - startingAmount : 0,
          totalInterest !== null ? totalInterest : 0,
        ],
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B"],
      },
    ],
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl mt-8 md:mt-0 transform transition hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Results
      </h2>
      {finalBalance !== null ? (
        <>
          {/* Summary Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-xl text-center">
              <p className="text-xl font-bold">Total Contributions</p>
              <p className="text-2xl mt-2">{totalContributions.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-xl text-center">
              <p className="text-xl font-bold">Total Interest Earned</p>
              <p className="text-2xl mt-2">{totalInterest.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl text-center">
              <p className="text-xl font-bold">Final Investment Value</p>
              <p className="text-2xl mt-2">{finalBalance.toFixed(2)}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Growth Over Time
              </h3>
              <Line data={lineChartData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Breakdown
              </h3>
              <Pie data={pieChartData} />
            </div>
          </div>

          {/* Yearly Accumulation Schedule */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Accumulation Schedule (Yearly)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 border">Year</th>
                    <th className="py-3 px-4 border">End Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: durationYears }, (_, i) => {
                    const yearData = schedule.filter(
                      (item) => item.year === i + 1
                    );
                    const lastMonth = yearData[yearData.length - 1];
                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border text-center">
                          {i + 1}
                        </td>
                        <td className="py-3 px-4 border text-center">
                          {lastMonth.balance.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Monthly Schedule */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Detailed Monthly Schedule
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 border">Month</th>
                    <th className="py-3 px-4 border">Year</th>
                    <th className="py-3 px-4 border">Contribution</th>
                    <th className="py-3 px-4 border">Interest</th>
                    <th className="py-3 px-4 border">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border text-center">
                        {item.month}
                      </td>
                      <td className="py-3 px-4 border text-center">
                        {item.year}
                      </td>
                      <td className="py-3 px-4 border text-center">
                        {item.contribution.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 border text-center">
                        {item.interest.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 border text-center">
                        {item.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">
          Enter your data and click "Calculate" to view results.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*                        Main Component (Home)                              */
/* ------------------------------------------------------------------------- */
export default function Home() {
  // Input state variables
  const [startingAmount, setStartingAmount] = useState(1000);
  const [durationYears, setDurationYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(5);
  const [compoundingFrequency, setCompoundingFrequency] =
    useState("Annually");
  const [startingAge, setStartingAge] = useState(25);

  // Instead of a single contributionAmount, we now have milestones.
  // We start with one milestone that matches the starting age.
  const [milestones, setMilestones] = useState([
    { age: 25, salary: 40000, monthlyContribution: 500 },
  ]);

  // We keep contributionTiming (Beginning/End) as a global setting.
  const [contributionTiming, setContributionTiming] = useState("Beginning");

  // Calculation result state variables
  const [finalBalance, setFinalBalance] = useState(null);
  const [totalContributions, setTotalContributions] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [schedule, setSchedule] = useState([]);

  // Utility functions for calculations
  const getCompoundingPeriodsPerYear = () => {
    switch (compoundingFrequency) {
      case "Daily":
        return 365;
      case "Monthly":
        return 12;
      case "Quarterly":
        return 4;
      case "Semi-Annually":
        return 2;
      case "Annually":
      default:
        return 1;
    }
  };

  const getEffectivePeriodRate = (periodsPerYear) => {
    if (
      compoundingFrequency === "Daily" &&
      contributionTiming === "Monthly"
    ) {
      return Math.pow(1 + annualRate / 100 / 365, 30.44) - 1;
    } else if (compoundingFrequency === "Monthly") {
      return annualRate / 100 / 12;
    } else if (compoundingFrequency === "Quarterly") {
      return Math.pow(1 + annualRate / 100, 1 / 4) - 1;
    } else if (compoundingFrequency === "Semi-Annually") {
      return Math.pow(1 + annualRate / 100, 1 / 2) - 1;
    } else {
      return annualRate / 100;
    }
  };

  // Main calculation function with dynamic milestones
  const calculateInvestment = () => {
    const totalMonths = durationYears * 12;
    let balance = startingAmount;
    let totalContributionSum = startingAmount;
    const scheduleData = [];

    const periodsPerYear = getCompoundingPeriodsPerYear();
    const compoundingInterval = 12 / periodsPerYear;
    const effectivePeriodRate = getEffectivePeriodRate(periodsPerYear);

    // Sort milestones by age (in case the user entered them out of order)
    const sortedMilestones = [...milestones].sort((a, b) => a.age - b.age);

    for (let m = 1; m <= totalMonths; m++) {
      const monthRecord = {
        month: m,
        year: Math.ceil(m / 12),
        contribution: 0,
        interest: 0,
        balance: 0,
      };

      // Calculate current age (using (m-1) so that the contribution timing aligns)
      const currentAge = startingAge + (m - 1) / 12;

      // Determine the active milestone for the current age.
      // We pick the milestone with the highest age that is <= currentAge.
      let activeMilestone = sortedMilestones[0];
      for (let i = 0; i < sortedMilestones.length; i++) {
        if (sortedMilestones[i].age <= currentAge) {
          activeMilestone = sortedMilestones[i];
        } else {
          break;
        }
      }
      const monthlyContribution = activeMilestone.monthlyContribution;

      // If contribution is made at the beginning of the period...
      if (
        monthlyContribution > 0 &&
        contributionTiming === "Beginning"
      ) {
        balance += monthlyContribution;
        totalContributionSum += monthlyContribution;
        monthRecord.contribution += monthlyContribution;
      }

      // Apply interest on compounding intervals
      if (m % compoundingInterval === 0) {
        const interestEarned = balance * effectivePeriodRate;
        balance += interestEarned;
        monthRecord.interest = interestEarned;
      }

      // If contribution is made at the end of the period...
      if (
        monthlyContribution > 0 &&
        contributionTiming === "End"
      ) {
        balance += monthlyContribution;
        totalContributionSum += monthlyContribution;
        monthRecord.contribution += monthlyContribution;
      }

      monthRecord.balance = balance;
      scheduleData.push(monthRecord);
    }

    setFinalBalance(balance);
    setTotalContributions(totalContributionSum);
    setTotalInterest(balance - totalContributionSum);
    setSchedule(scheduleData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-10 rounded-2xl shadow-2xl mb-10 text-center">
          <h1 className="text-5xl font-bold">Investment Calculator</h1>
          <p className="mt-4 text-lg">
            Plan your investment growth effortlessly.
          </p>
        </header>
        <div className="md:flex md:space-x-10">
          <div className="md:w-1/2">
            <DataInput
              startingAmount={startingAmount}
              setStartingAmount={setStartingAmount}
              durationYears={durationYears}
              setDurationYears={setDurationYears}
              annualRate={annualRate}
              setAnnualRate={setAnnualRate}
              compoundingFrequency={compoundingFrequency}
              setCompoundingFrequency={setCompoundingFrequency}
              startingAge={startingAge}
              setStartingAge={setStartingAge}
              milestones={milestones}
              setMilestones={setMilestones}
              contributionTiming={contributionTiming}
              setContributionTiming={setContributionTiming}
              calculateInvestment={calculateInvestment}
            />
          </div>
          <div className="md:w-1/2">
            <ResultsDisplay
              finalBalance={finalBalance}
              totalContributions={totalContributions}
              totalInterest={totalInterest}
              schedule={schedule}
              durationYears={durationYears}
              startingAmount={startingAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
