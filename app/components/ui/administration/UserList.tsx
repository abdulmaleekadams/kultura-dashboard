'use client';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomAvatar from '../../CustomAvatar';
import { Text } from '../../Text';

type InputRef = GetRef<typeof Input>;

interface DataType {
  key: string;
  name: string;
  title: string;
  role: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    title: 'Forward Solutions Planner',
    role: 'Sales Manager',
  },
  {
    key: '2',
    name: 'Joe Black',
    title: 'Chief Assurance Facilitator',
    role: 'Sales Person',
  },
  {
    key: '3',
    name: 'Abdulmaleek Adams',
    title: 'Legacy Marketing Coordinator',
    role: 'Admin',
  },
  {
    key: '4',
    name: 'Jim Red',
    title: 'Lead Data Strategist',
    role: 'Sales Intern',
  },
];

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className='p-2' onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('name'),
      render: (name, record) => (
        <Space>
          <CustomAvatar name={name} size='small' />
          <Text size='xs' className='!whitespace-nowrap' ellipsis={{ tooltip: name }}>
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width:'10%',
      ...getColumnSearchProps('title'),
      render: (value) => <Text size='xs' className='pb-1' ellipsis={{ tooltip: value }}>{value}</Text>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      render: (value) => (
        <Text size='xs' className='bg-red-200 w-[max-content] px-1 rounded !text-red-500 whitespace-nowrap border border-red-500'>
          {value}
        </Text>
      ),
      filters: data.map((user) => ({ text: user.role, value: user.role })),
      onFilter: (value: string, record): Boolean =>
        record.role.indexOf(value) === 0,
    },
    {
      title: 'Action',
      className: 'py-4',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (_, record) => (
        <div className='flex gap-x-2'>
          <Button
            className='flex items-center justify-center !px-2 !w-[auto]'
            id={record.key}
          >
            <EyeOutlined />
          </Button>
          <Button
            className='flex items-center justify-center !px-2 !w-[auto] !border-red-400 !text-red-400 hover:!border-red-600 hover:!text-red-600'
            id={record.key}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowClassName={'text-[0.85rem]'}
      size='small'
      className='px-3'
      scroll={{ x: true }}
    />
  );
};

export default UserList;
