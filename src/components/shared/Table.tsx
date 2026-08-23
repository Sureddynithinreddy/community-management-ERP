import React from 'react';
import { Card } from './Card';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function Table<T extends Record<string, any>>({ 
  data, 
  columns,
  onRowClick,
  emptyMessage = 'No data available',
  isLoading = false
}: TableProps<T>) {
  if (isLoading) {
    return (
      <Card variant="organic" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#738743] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#698a7f]">Loading data...</p>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card variant="organic" className="p-8">
        <div className="text-center text-sm text-[#698a7f]">
          {emptyMessage}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="organic" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#DED8C8]/50 border-b border-[#DED8C8]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-xs font-bold text-[#1E372E] uppercase tracking-wider ${
                    column.align === 'right' ? 'text-right' : 
                    column.align === 'center' ? 'text-center' : 
                    'text-left'
                  }`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DED8C8]">
            {data.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  onRowClick 
                    ? 'hover:bg-[#F8F5EE] cursor-pointer' 
                    : ''
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-sm text-[#254238] ${
                      column.align === 'right' ? 'text-right' : 
                      column.align === 'center' ? 'text-center' : 
                      'text-left'
                    }`}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
