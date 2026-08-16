"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ShieldAlert, Users } from "lucide-react";
// TODO: replace with real API call — see GET /admin/kyc once backend is ready
const mockUsers: any[] = [];
import type { KycStatus } from "@/lib/mock-types";

function KycStatusBadge({ status }: { status: KycStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${
      status === "verified" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" :
      status === "pending" ? "bg-amber-500/10 text-amber-300 border-amber-500/30" :
      status === "rejected" ? "bg-red-500/10 text-red-300 border-red-500/30" :
      "bg-white/5 text-white/50 border-white/20"
    }`}>
      {status}
    </span>
  );
}

export default function KycReviewPage() {
  const [users, setUsers] = useState(mockUsers.filter(u => u.role !== "admin"));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateClientKycStatus = (id: string, kycStatus: KycStatus) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, kycStatus } : user
      )
    );
  };

  const pendingCount = users.filter(u => u.kycStatus === "pending").length;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            Client KYC Review
          </h1>
          <p className="mt-1 text-sm text-white/50">Verify identity documents for clients</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            <Users className="h-4 w-4" />
            {pendingCount} pending requests
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">KYC Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => {
                const isExpanded = expandedId === user.id;

                return (
                  <React.Fragment key={user.id}>
                    <tr
                      className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                      onClick={() => setExpandedId(isExpanded ? null : user.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                            {user.firstName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{user.phone || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-white/70">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }) : user.memberSince}
                      </td>
                      <td className="px-6 py-4">
                        <KycStatusBadge status={user.kycStatus as KycStatus} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.kycStatus === "pending" && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedId(isExpanded ? null : user.id);
                            }}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
                          >
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && user.kycStatus === "pending" && (
                      <tr className="bg-white/[0.02]">
                        <td colSpan={6} className="px-6 py-5">
                          <div className="rounded-xl border border-white/10 bg-[#111214] p-4">
                            <div className="mb-4">
                              <p className="text-xs uppercase tracking-[0.2em] text-white/50">KYC Review</p>
                              <p className="mt-1 text-sm text-white/70">Verify identity documents for {user.firstName} {user.lastName}</p>
                            </div>
                            <div className="flex flex-col gap-6 md:flex-row">
                              <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-white/40 mb-1 text-xs">Full Name</p>
                                    <p className="text-white">{user.firstName} {user.lastName}</p>
                                  </div>
                                  <div>
                                    <p className="text-white/40 mb-1 text-xs">Date of Birth</p>
                                    <p className="text-white">1992-08-21</p>
                                  </div>
                                  <div>
                                    <p className="text-white/40 mb-1 text-xs">ID Type</p>
                                    <p className="text-white">Passport</p>
                                  </div>
                                  <div>
                                    <p className="text-white/40 mb-1 text-xs">ID Number</p>
                                    <p className="text-white">GHA-987654321</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-center min-h-[120px]">
                                <div className="text-center">
                                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                    <CheckCircle2 className="h-5 w-5 text-white/50" />
                                  </div>
                                  <p className="text-xs text-white/50">Document scan provided</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateClientKycStatus(user.id, "rejected");
                                }}
                                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                              >
                                Reject KYC
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateClientKycStatus(user.id, "verified");
                                }}
                                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                              >
                                Approve KYC
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
