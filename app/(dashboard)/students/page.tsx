import { getStudents } from '@/features/people/actions';
import { StudentList } from '@/features/people/components/StudentList';
import Link from 'next/link';

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold m-0">Students</h2>
          <p className="text-gray-500">Manage your club's students and affiliates</p>
        </div>
        <Link href="/students/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            New Student
        </Link>
      </div>

      <StudentList students={students as any} />
    </div>
  );
} 