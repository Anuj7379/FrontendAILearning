import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Layers3,
  LayoutDashboard,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import progressService from "../../services/progressService";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const response = await progressService.getDashboardProgress();
      setDashboardData(response.data);
    } catch (error) {
      setLoadError(true);
      toast.error(
        error.response?.data?.error || "Could not load your dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!dashboardData?.overview) {
    return (
      <div className="mx-auto max-w-3xl p-6 pt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            {loadError ? <BrainCircuit size={26} /> : <Target size={26} />}
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {loadError
              ? "We couldn't load your dashboard"
              : "Dashboard data is unavailable"}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            {loadError
              ? "Check your connection and try again."
              : "Try refreshing the page or come back a little later."}
          </p>
          {loadError ? (
            <button
              type="button"
              onClick={fetchDashboardData}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Try again <ArrowRight size={18} />
            </button>
          ) : (
            <Link
              to="/documents"
              state={{ openUpload: true }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Plus size={18} /> Open documents
            </Link>
          )}
        </div>
      </div>
    );
  }

  const { overview, recentActivity } = dashboardData;
  const stats = [
    {
      label: "Documents",
      value: overview.totalDocuments,
      icon: FileText,
      color: "bg-emerald-50 text-emerald-700",
      description: "In your library",
    },
    {
      label: "Flashcard sets",
      value: overview.totalFlashcardSets,
      icon: Layers3,
      color: "bg-sky-50 text-sky-700",
      description: `${overview.totalFlashCards} cards to review`,
    },
    {
      label: "Quizzes",
      value: overview.totalQuizzes,
      icon: BrainCircuit,
      color: "bg-violet-50 text-violet-700",
      description: `${overview.totalQuizzesCompleted} completed`,
    },
    {
      label: "Average score",
      value: `${overview.averageScore}%`,
      icon: Target,
      color: "bg-amber-50 text-amber-700",
      description: "Across completed quizzes",
    },
  ];

  const documents = recentActivity?.documents || [];
  const quizzes = recentActivity?.quizzes || [];

  return (
    <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-900 px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9">
          <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <Sparkles size={14} /> Your learning space
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Dashboard overview
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Keep your study materials organized and see how far you have
                come.
              </p>
            </div>
            <Link
              to="/documents"
              state={{ openUpload: true }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              <Plus size={18} /> Add document
            </Link>
          </div>
          <LayoutDashboard
            className="absolute -bottom-8 right-8 hidden text-white/5 sm:block"
            size={150}
            strokeWidth={1}
          />
        </section>

        <section
          aria-label="Learning statistics"
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map(({ label, value, icon: Icon, color, description }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>
                </div>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
                >
                  {React.createElement(Icon, { size: 21 })}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest documents and quiz results.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ActivityCard
              title="Recent documents"
              icon={FileText}
              actionLabel="All documents"
              actionTo="/documents"
            >
              {documents.length === 0 ? (
                <EmptyActivity
                  icon={BookOpen}
                  message="Your uploaded documents will appear here."
                />
              ) : (
                <ul className="divide-y divide-slate-100">
                  {documents.map((document) => (
                    <li
                      key={document._id}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <FileText size={18} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {document.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(document.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/documents/${document._id}`}
                        aria-label={`Open ${document.title}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </ActivityCard>

            <ActivityCard
              title="Recent quizzes"
              icon={BrainCircuit}
              actionLabel="Browse documents"
              actionTo="/documents"
            >
              {quizzes.length === 0 ? (
                <EmptyActivity
                  icon={BrainCircuit}
                  message="Complete a quiz to see your results here."
                />
              ) : (
                <ul className="divide-y divide-slate-100">
                  {quizzes.map((quiz) => (
                    <li
                      key={quiz._id}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                          <BrainCircuit size={18} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {quiz.documentId?.title || "Practice quiz"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Score: {quiz.score} / {quiz.totalQuestions}
                            {quiz.completedAt &&
                              ` · ${new Date(quiz.completedAt).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/quiz/${quiz._id}`}
                        aria-label={`Open quiz for ${quiz.documentId?.title || "this document"}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </ActivityCard>
          </div>
        </section>
      </div>
    </div>
  );
};

const ActivityCard = ({ title, icon: Icon, actionLabel, actionTo, children }) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-5 flex items-center justify-between gap-3">
      <h3 className="flex items-center gap-2 font-semibold text-slate-900">
        {React.createElement(Icon, {
          size: 19,
          className: "text-emerald-700",
        })}
        {title}
      </h3>
      <Link
        to={actionTo}
        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
      >
        {actionLabel} <ArrowRight size={14} />
      </Link>
    </div>
    {children}
  </article>
);

const EmptyActivity = ({ icon: Icon, message }) => (
  <div className="flex min-h-32 flex-col items-center justify-center rounded-xl bg-slate-50 px-4 py-6 text-center">
    {React.createElement(Icon, { size: 24, className: "text-slate-400" })}
    <p className="mt-2 text-sm text-slate-500">{message}</p>
  </div>
);

export default DashboardPage;
