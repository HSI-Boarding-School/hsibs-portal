# Fix: Chart Series Data Type Error

## Problem
Error `t[c].data.map is not a function` terjadi di Chart component ketika `chart.series` bukan array.

## Root Cause
Di `link-home-view.jsx`, chart prop dikirim dengan `series: 45` (number), bukan `series: [45]` (array).

```javascript
// WRONG - series adalah number
chart={{ series: 45 }}

// RIGHT - series adalah array
chart={{ series: [45] }}
```

Ketika Chart component mencoba `.map()` pada number `45`, terjadi error.

## Solution

### 1. Fixed link-home-view.jsx
Changed:
```javascript
chart={{ series: 45 }}
```

To:
```javascript
chart={{ series: [45] }}
```

Applied to both:
- Total Links card
- Total Clicks card

### 2. Added Safety Check in link-widget-summary.jsx
```javascript
{chart && (
  <Box sx={{ width: 100, height: 60, ml: 2 }}>
    <Chart 
      type="bar" 
      series={[{ data: Array.isArray(chart.series) ? chart.series : [chart.series] }]} 
      options={chartOptions} 
    />
  </Box>
)}
```

This ensures even if wrong data type is passed, it will be converted to array.

## Files Modified
1. `src/sections/link-management/link-home-view.jsx`
   - Changed `series: 45` to `series: [45]` (2 places)

2. `src/sections/link-management/link-widget-summary.jsx`
   - Added array validation in Chart series prop

## Status
✅ **FIXED** - Error should be completely resolved now

## Testing
1. Dashboard should load without errors
2. Chart should display correctly
3. No console errors about `.map is not a function`
