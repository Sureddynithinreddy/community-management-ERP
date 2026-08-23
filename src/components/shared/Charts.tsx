import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from './Card';

const COLORS = ['#738743', '#254238', '#A3C3B7', '#698a7f', '#86A79B'];

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <Card variant="organic" className="p-6 space-y-4">
      <div>
        <h3 className="serif-title text-xl text-[#1E372E]">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#698a7f] mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </Card>
  );
};

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
}

export const SimpleLineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKey,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DED8C8" />
        <XAxis 
          dataKey={xKey} 
          stroke="#698a7f" 
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#698a7f" 
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#F1EDE2',
            border: '1px solid #DED8C8',
            borderRadius: '0.75rem',
            fontSize: '12px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey={yKey} 
          stroke="#738743" 
          strokeWidth={3}
          dot={{ fill: '#738743', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
}

export const SimpleBarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  yKey,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DED8C8" />
        <XAxis 
          dataKey={xKey} 
          stroke="#698a7f" 
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#698a7f" 
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#F1EDE2',
            border: '1px solid #DED8C8',
            borderRadius: '0.75rem',
            fontSize: '12px'
          }}
        />
        <Bar 
          dataKey={yKey} 
          fill="#738743"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface PieChartProps {
  data: any[];
  nameKey: string;
  valueKey: string;
  height?: number;
}

export const SimplePieChart: React.FC<PieChartProps> = ({
  data,
  nameKey,
  valueKey,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={valueKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#F1EDE2',
            border: '1px solid #DED8C8',
            borderRadius: '0.75rem',
            fontSize: '12px'
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
