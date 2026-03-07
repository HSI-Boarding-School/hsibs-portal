'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { LucideIcon } from 'src/components/lucide-icon';
import { Chart, useChart } from 'src/components/chart';
import { svgColorClasses } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function LinkWidgetSummary({ title, total, icon, chart, sx, ...other }) {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: [theme.palette.primary.main],
    plotOptions: { bar: { columnWidth: '68%' } },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
    },
    ...chart,
  });

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        bgcolor: 'background.paper',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2', mb: 0.5 }}>
          {title}
        </Box>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Box sx={{ typography: 'h4' }}>{total}</Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 64,
          height: 64,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'primary.lighter',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
          [`& .${svgColorClasses.root}`]: {
            width: 32,
            height: 32,
          },
        }}
      >
        <LucideIcon icon={icon} />
      </Box>

      {chart && chart.series && (
        <Box sx={{ width: 100, height: 60, ml: 2 }}>
          <Chart 
            type="bar" 
            series={chart.series} 
            options={chartOptions} 
          />
        </Box>
      )}
    </Card>
  );
}
