"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUserById, User } from "../service/service";
import { useState } from "react";

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Query for all users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  // Query for selected user
  const { data: selectedUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => (selectedUserId ? fetchUserById(selectedUserId) : null),
    enabled: !!selectedUserId,
  });

  if (usersLoading) {
    return <div className="p-4">Loading users...</div>;
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        TanStack Query Background Fetching Demo
      </h1>

      <div className="mb-8">
        <h2 className="text-gray-600 mb-4">
          Demo of TanStack Query with background fetching.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Users List */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <div className="space-y-2">
            {users?.map((user: User) => (
              <div
                key={user.id}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  selectedUserId === user.id
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected User Details */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          {selectedUserId ? (
            userLoading ? (
              <div>Loading user details...</div>
            ) : selectedUser ? (
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span> {selectedUser.name}
                </div>
                <div>
                  <span className="font-medium">Username:</span>{" "}
                  {selectedUser.username}
                </div>
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedUser.email}
                </div>
              </div>
            ) : null
          ) : (
            <div className="text-gray-500">Select a user to view details</div>
          )}
        </div>
      </div>
    </main>
  );
}
