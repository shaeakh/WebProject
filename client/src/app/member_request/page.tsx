// pages/member_request.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Member {
  name: string;
  reg_no: string;
  role: string;
  tournament_name: string;
  request_id: number;
}

interface MemberRequestProps {
  searchParams: {
    tournament: any;
  };
}


const MemberRequest: React.FC<MemberRequestProps> = ({searchParams} : {
  searchParams: {
    tournament : any;
  }
}) => { 
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMemberRequests = async () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/authpage'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/home/member-requests/${searchParams.tournament}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch member requests');
        }

        const data = await response.json();
        console.log(data);
        setMembers(data);
      } catch (error) {
        console.error('Error fetching member requests:', error);
      }
    };

    fetchMemberRequests();
  }, [router]);

  const handleAccept = async (request_id: number) => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/authpage'); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/home/member-requests/${searchParams.tournament}/${request_id}/accept`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      setMembers(members.filter(member => member.request_id !== request_id));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (request_id: number) => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/authpage'); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/home/member-requests/${request_id}/reject`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      setMembers(members.filter(member => member.request_id !== request_id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1>this is tournament no {searchParams.tournament}</h1>
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
              <th className="px-4 py-2">Tournament Name</th>
              <th className="px-4 py-2">Accept</th>
              <th className="px-4 py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 px-4 py-2">{member.name}</td>
                <td className="border-2 px-4 py-2">{member.reg_no}</td>
                <td className="border-2 px-4 py-2">{member.role}</td>
                <td className="border-2 px-4 py-2">{member.tournament_name}</td>
                <td className="border-2 px-4 py-2">
                  <button
                    className="text-green-500"
                    onClick={() => handleAccept(member.request_id)}
                  >
                    ✓
                  </button>
                </td>
                <td className="border-2 px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleReject(member.request_id)}
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

export default MemberRequest;
