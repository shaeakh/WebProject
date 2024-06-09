"use client";

import React, { useState } from 'react';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";

interface Member {
  name: string;
  regNo: string;
  role: string;
}

const initialMembers: Member[] = [
  { name: 'Farzine', regNo: '12345', role: 'Manager' },
  { name: 'Farzine', regNo: '12345', role: 'Manager' },
  { name: 'Farzine', regNo: '12345', role: 'Manager' },
  { name: 'Farzine', regNo: '12345', role: 'Manager' },
  { name: 'Farzine', regNo: '12345', role: 'Manager' },
];

const MemberRequest: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const handleAccept = (index: number) => {
    console.log('Accepted:', members[index]);
    // Add logic to handle accept action, e.g., update the database
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleReject = (index: number) => {
    console.log('Rejected:', members[index]);
    // Add logic to handle reject action, e.g., update the database
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-center items-center pt-5">
        <MoviingBorderButton borderRadius="1rem"
        className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
        >Member Request
        </MoviingBorderButton>
    </div>
      <div className="bg-gray-100 p-5 rounded-lg shadow-lg mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Accept</th>
              <th className="px-4 py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 px-4 py-2">{member.name}</td>
                <td className="border-2 px-4 py-2">{member.regNo}</td>
                <td className="border-2 px-4 py-2">{member.role}</td>
                <td className="border-2 px-4 py-2">
                  <button
                    className="text-green-500"
                    onClick={() => handleAccept(index)}
                  >
                    ✓
                  </button>
                </td>
                <td className="border-2 px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleReject(index)}
                  >
                    ✗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberRequest
