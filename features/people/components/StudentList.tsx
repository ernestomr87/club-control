'use client';

import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getLevelColor } from '@/lib/utils/levels';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  player_profiles?: {
    level: string;
    play_hand: string;
    is_affiliate: boolean;
  } | null;
}

interface StudentListProps {
  students: Student[];
}

export function StudentList({ students }: StudentListProps) {
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: Student) => (
        <span className="font-medium">{`${record.first_name} ${record.last_name}`}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Level',
      key: 'level',
      render: (_: any, record: Student) => {
        const level = record.player_profiles?.level;
        return level ? (
          <Tag color={getLevelColor(level)} style={{ color: '#555' }}>
            {level.replace(/_/g, ' ')}
          </Tag>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: Student) => (
        record.player_profiles?.is_affiliate ? (
          <Tag color="green">Affiliate</Tag>
        ) : (
          <Tag color="default">Student</Tag>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Student) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={students}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      className="shadow-sm rounded-lg overflow-hidden"
    />
  );
}
