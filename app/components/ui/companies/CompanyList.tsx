'use client';
import { companiesList } from '@/utils/mockData';
import {
  Button,
  GetRef,
  Input,
  List,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/es/table/interface';
import CustomAvatar from '../../CustomAvatar';
import { Text } from '../../Text';
import { currencyNumber } from '@/utils';

type InputRef = GetRef<typeof Input>;

interface DataType {
  id: string;
  key: string;
  name: string;
  avatarUrl: string;
  dealsAggregate: { sum: { value: number } };
}

type DataIndex = keyof DataType;

const CompanyList = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
      ...getColumnSearchProps('name'),
      render: (name, record) => (
        <Space>
          <CustomAvatar shape='square' name={name} src={record.avatarUrl} />
          <Text className='!whitespace-nowrap'>{name}</Text>
        </Space>
      ),
    },
    {
      title: 'Open deals amount',
      dataIndex: 'dealsAggregate',
      key: 'dealsAggregate',
      render: (dealsAggregate) => (
        <Text>{currencyNumber(dealsAggregate?.sum?.value || 0)}</Text>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      render: (id) => (
        <Space>
          <Button
            id={id}
            size='small'
            className='flex items-center justify-center !h-8'
            aria-label='edit'
          >
            <EditOutlined />
          </Button>
          <Button
            id={id}
            size='small'
            className='flex items-center justify-center !h-8 !border-red-400 !text-red-400 hover:!border-red-500 hover:!text-red-500'
            aria-label='Delete'
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      //   ...getColumnSearchProps('dealsAggregate'),
    },
  ];

  return (
    <List>
      <Table
        columns={columns}
        dataSource={companiesList}
        pagination={{ current: 1, pageSize: 15 }}
        showSorterTooltip={true}
      />
      {children}
    </List>
  );
};

export default CompanyList;
