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
import { getUsers } from '@/app/server/actions';

type InputRef = GetRef<typeof Input>;

type DataType = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  prefix: string;
  role: string;
  profileId: string;
  tasksId: string[];
};

type DataIndex = keyof DataType;
type Props = {
  data: DataType[];
  usersCount: number;
};

const UserList = ({ data, usersCount }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [userData, setUserData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
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
        setTimeout(() => searchInput.current, 100);
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
          <Text
            size='xs'
            className='!whitespace-nowrap'
            ellipsis={{ tooltip: name }}
          >
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ...getColumnSearchProps('jobTitle'),
      render: (value) => (
        <Text size='xs' className='pb-1' ellipsis={{ tooltip: value }}>
          {value}
        </Text>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      render: (value) => (
        <Text
          size='xs'
          className='bg-red-200 w-[max-content] px-1 rounded !text-red-500 whitespace-nowrap border border-red-500'
        >
          {value}
        </Text>
      ),
      filters: userData?.map((user) => ({ text: user.role, value: user.role })),
      // @ts-ignore
      onFilter: (value: string, record: DataType) =>
        record.role.toString().indexOf(value as string) === 0,
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
            id={record.id}
            title='View'
          >
            <EyeOutlined />
          </Button>
          <Button
            className='flex items-center justify-center !px-2 !w-[auto] !border-red-400 !text-red-400 hover:!border-red-600 hover:!text-red-600'
            title='Delete'
            id={record.id}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = async (page: number, pageSize: number) => {
    const newData = await getUsers((page - 1) * pageSize, pageSize);
    setUserData(newData);
    setCurrentPage(page);
  };

  return (
    userData && (
      <Table
        columns={columns}
        dataSource={userData}
        rowClassName={'text-[0.85rem]'}
        size='small'
        className='px-3 cursor-context-menu'
        scroll={{ x: true }}
        pagination={{
          total: usersCount,
          current: currentPage,
          pageSize: 10,
          onChange: async (page, pageSize) => {
            await handlePageChange(page, pageSize);
          },
        }}
      />
    )
  );
};

export default UserList;
