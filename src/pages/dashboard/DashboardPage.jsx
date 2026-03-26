import React, { useState, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import progressService from "../../services/progressService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  FileText,
  BookOpen,
  Clock,
  TrendingUp,
  BrainCircuit,
  ListChecks,
  Layers,
  TimerReset,
  BrainIcon,
  Activity,
  LayoutDashboard,
} from "lucide-react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardProgress();
        setDashboardData(data.data);
        console.log("dash data",  data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className="text-center mt-10">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <div>
            <TrendingUp className="mx-auto text-gray-400 w-12 h-12" />
          </div>
          <p className="text-gray-500"> No Dashboard data is available </p>
        </div>
      </div>
    );
  }
  const stats = [
    {
      label: "Total Documents",
      value: dashboardData.overview.totalDocuments,
      icon: <FileText className="text-emerald-500" />,
      gradient: "from-emerald-100 to-emerald-300",
      shadowColor: "shadow-emerald-200",
    },
    {
      label: "Total Flashcard Set",
      value: dashboardData.overview.totalFlashcardSets,
      icon: <BookOpen className="text-blue-500" />,
      gradient: "from-blue-100 to-blue-300",
      shadowColor: "shadow-blue-200",
    },
    
    {
      label: "No. Of Doc that have Quiz",
      value: dashboardData.overview.totalQuizzesPerDoc,
      icon: <BrainCircuit className="text-purple-500" />,
      gradient: "from-purple-100 to-purple-300",
      shadowColor: "shadow-purple-200",
    },
    {
      label: "Total Count Of All Quizzes",
      value: dashboardData.overview.totalQuizzes,
      icon: <BrainIcon className="text-purple-500" />,
      gradient: "from-purple-100 to-purple-300",
      shadowColor: "shadow-purple-200",
    },
  ];

  return (
    <div className="lg:p-4 p-6 bg-white/60 h-screen">
      <div></div>
      {/* {header} */}
      <div className=" text-gray-600  ">
        <div className="flex items-center gap-2">
          <span className="bg-gray-300 p-2 rounded-lg">
            <LayoutDashboard size={18} />
          </span>
          <p className="text-xl font-semibold">Dashboard Overview</p>
        </div>
        <p>
          Track your learning progress and achievements across all your courses.
        </p>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 bg-white p-4 rounded-lg shadow-md">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-xl shadow-lg ${stat.shadowColor}`}
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col max-w-[80%]">
                <p className="text-sm font-medium text-gray-700">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* recent activity section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex gap-2">
          <span className="bg-gray-300 p-2 rounded-lg">
            <Clock size={18} />
          </span>
          <p className=" text-gray-800">Recent Activity</p>
        </h2>
        <p className="text-gray-600">
          View your most recent documents, quizzes, and flashcard sets.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Documents */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Recent Documents
            </h3>
            {dashboardData.recentActivity.documents.length === 0 ? (
              <p className="text-gray-500">No recent documents found.</p>
            ) : (
              <ul className="space-y-3">
                {dashboardData.recentActivity.documents.map((doc) => (
                  <li
                    key={doc._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      to={`/documents/${doc._id}`}
                      className="flex text- align-center gap-2 cursor-pointer"
                    >
                      <span className="hover:text-green-700">view</span>
                      <FileText className="text-emerald-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Recent Quizzes */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Recent Quizzes
            </h3>
            {dashboardData.recentActivity.quizzes.length === 0 ? (
              <p className="text-gray-500">No recent quizzes found.</p>
            ) : (
              <ul className="space-y-3">
                {dashboardData.recentActivity.quizzes.map((quiz) => (
                  <li
                    key={quiz._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {quiz.documentId?.title || "Untitled Quiz"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Score: {quiz.score} / {quiz.totalQuestions} -{" "}
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/quiz/${quiz._id}`}
                      className="flex text- align-center gap-2 cursor-pointer"
                    >
                      <span className="hover:text-green-700">view</span>
                      <BrainIcon className="text-emerald-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
